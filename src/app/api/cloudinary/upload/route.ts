import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { requireRole, errorResponse } from '@/lib/api-auth';

export const runtime = 'nodejs';

function getCloudinaryConfig() {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  if (!cloudinaryUrl) {
    throw new Error('CLOUDINARY_URL is not configured');
  }

  const parsedUrl = new URL(cloudinaryUrl);
  const cloudName = parsedUrl.hostname;
  const apiKey = decodeURIComponent(parsedUrl.username);
  const apiSecret = decodeURIComponent(parsedUrl.password);

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('CLOUDINARY_URL is invalid');
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
  };
}

function createSignature(parameters: Record<string, string>, apiSecret: string) {
  const sortedParameters = Object.entries(parameters)
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto.createHash('sha1').update(`${sortedParameters}${apiSecret}`).digest('hex');
}

export async function POST(request: Request) {
  try {
    requireRole(request, ['ADMIN']);
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing image file' }, { status: 400 });
    }

    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const folder = 'admin/services';
    const signature = createSignature({ folder, timestamp }, apiSecret);

    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    uploadData.append('api_key', apiKey);
    uploadData.append('timestamp', timestamp);
    uploadData.append('folder', folder);
    uploadData.append('signature', signature);

    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });

    const payload = await uploadResponse.json();

    if (!uploadResponse.ok) {
      console.error('/api/cloudinary/upload error', payload);
      return NextResponse.json(
        { error: payload?.error?.message ?? 'Cloudinary upload failed' },
        { status: uploadResponse.status }
      );
    }

    return NextResponse.json(
      {
        url: payload.secure_url as string,
        publicId: payload.public_id as string,
      },
      { status: 200 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}