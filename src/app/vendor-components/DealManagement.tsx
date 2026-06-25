"use client";

import { useEffect, useState } from 'react';
import { ImagePlus, Plus, Edit, Trash2, Eye, EyeOff, Calendar, Percent, Package, DollarSign, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import VendorNavigation from './VendorNavigation';

const serviceCategories = [
  'Wedding Halls & Venues',
  'Catering Services',
  'Bridal Dressing',
  'Groom Dressing',
  'Photography & Videography',
  'Mehndi Artists',
  'Gift Tray Decoration',
  'Vehicle Rentals',
  'Nikah/Imam Services',
  'Wedding Decorations',
  'Music & Entertainment',
  'Wedding Cakes',
  'Invitation Cards',
  'Jewelry Rental',
  'Makeup Artists',
];

type Deal = {
  id: number;
  title: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  validUntil: string;
  description: string;
  isActive: boolean;
  bookings: number;
  images: string[];
};

export default function DealManagement() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [isLoadingDeals, setIsLoadingDeals] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    originalPrice: '',
    discountedPrice: '',
    validUntil: '',
    description: '',
    isActive: true,
    images: [] as string[],
  });

  const [imageUploadError, setImageUploadError] = useState('');
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const loadDeals = async () => {
    setIsLoadingDeals(true);
    setLoadError('');

    try {
      const response = await fetch('/api/deals', { cache: 'no-store' });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to load deals');
      }

      setDeals((payload.deals ?? []) as Deal[]);
    } catch (error) {
      setDeals([]);
      setLoadError(error instanceof Error ? error.message : 'Failed to load deals');
    } finally {
      setIsLoadingDeals(false);
    }
  };

  useEffect(() => {
    void loadDeals();
  }, []);

  const uploadFilesToCloudinary = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    setIsUploadingImages(true);
    setImageUploadError('');

    try {
      const selectedFiles = Array.from(files);
      const uploadResults = await Promise.allSettled(
        selectedFiles.map(async (file) => {
          const uploadData = new FormData();
          uploadData.append('file', file);

          const response = await fetch('/api/cloudinary/upload', {
            method: 'POST',
            body: uploadData,
          });

          const payload = await response.json();

          if (!response.ok) {
            throw new Error(payload.error ?? `Failed to upload ${file.name}`);
          }

          return payload.url as string;
        })
      );

      const uploadedImages = uploadResults
        .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
        .map((result) => result.value);

      if (uploadedImages.length > 0) {
        setFormData((current) => ({
          ...current,
          images: [...current.images, ...uploadedImages],
        }));
      }

      const firstFailure = uploadResults.find(
        (result): result is PromiseRejectedResult => result.status === 'rejected'
      );

      if (firstFailure) {
        const reason = firstFailure.reason;
        setImageUploadError(reason instanceof Error ? reason.message : 'One or more images could not be uploaded.');
      }
    } finally {
      setIsUploadingImages(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setIsSaving(true);

    const discount = Math.round(((Number(formData.originalPrice) - Number(formData.discountedPrice)) / Number(formData.originalPrice)) * 100);

    try {
      const response = await fetch(editingDeal ? `/api/deals/${editingDeal.id}` : '/api/deals', {
        method: editingDeal ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          originalPrice: Number(formData.originalPrice),
          discountedPrice: Number(formData.discountedPrice),
          discount,
          images: formData.images,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to save deal');
      }

      await loadDeals();
      setIsDialogOpen(false);
      setEditingDeal(null);
      setFormData({
        title: '',
        category: '',
        originalPrice: '',
        discountedPrice: '',
        validUntil: '',
        description: '',
        isActive: true,
        images: [],
      });
      setImageUploadError('');
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save deal');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (deal: Deal) => {
    setEditingDeal(deal);
    setFormData({
      title: deal.title,
      category: deal.category,
      originalPrice: deal.originalPrice.toString(),
      discountedPrice: deal.discountedPrice.toString(),
      validUntil: deal.validUntil,
      description: deal.description,
      isActive: deal.isActive,
      images: deal.images ?? [],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      try {
        const response = await fetch(`/api/deals/${id}`, { method: 'DELETE' });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error ?? 'Failed to delete deal');
        }

        await loadDeals();
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Failed to delete deal');
      }
    }
  };

  const toggleActive = async (deal: Deal) => {
    try {
      const response = await fetch(`/api/deals/${deal.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !deal.isActive }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to update deal');
      }

      await loadDeals();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to update deal');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <VendorNavigation />

      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2C5F2D] mb-2">Deals & Services</h1>
            <p className="text-gray-600">Manage your service offerings and promotional deals</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2C5F2D] hover:bg-[#1E4620] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Deal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDeal ? 'Edit Deal' : 'Create New Deal'}</DialogTitle>
                <DialogDescription>
                  {editingDeal ? 'Update your deal information' : 'Add a new service or promotional deal'}
                </DialogDescription>
              </DialogHeader>

              {saveError && <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{saveError}</p>}

              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Deal Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Premium Wedding Hall - Ramadan Special"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Service Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price (LKR)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="200000"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountedPrice">Discounted Price (LKR)</Label>
                    <Input
                      id="discountedPrice"
                      type="number"
                      value={formData.discountedPrice}
                      onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                      placeholder="150000"
                      required
                    />
                  </div>
                </div>

                {formData.originalPrice && formData.discountedPrice && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      <Percent className="w-4 h-4 inline mr-1" />
                      Discount: <span className="font-bold">
                        {Math.round(((Number(formData.originalPrice) - Number(formData.discountedPrice)) / Number(formData.originalPrice)) * 100)}%
                      </span>
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your service and what's included..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="images" className="flex items-center gap-2">
                      <ImagePlus className="h-4 w-4" />
                      Deal Images
                    </Label>
                    <p className="mt-1 text-sm text-gray-600">Upload multiple images to show what this deal includes.</p>
                  </div>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={isUploadingImages}
                    onChange={(event) => {
                      void uploadFilesToCloudinary(event.target.files);
                      event.currentTarget.value = '';
                    }}
                  />
                  {isUploadingImages && <p className="text-sm text-gray-600">Uploading images to Cloudinary...</p>}
                  {imageUploadError && <p className="text-sm text-red-600">{imageUploadError}</p>}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {formData.images.map((image, index) => (
                        <div key={`${image}-${index}`} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white">
                          <img src={image} alt={`Deal upload ${index + 1}`} className="h-28 w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((current) => ({
                                ...current,
                                images: current.images.filter((_, imageIndex) => imageIndex !== index),
                              }));
                            }}
                            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white opacity-100 transition group-hover:bg-black"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="isActive" className="text-base">Active Deal</Label>
                    <p className="text-sm text-gray-600">Make this deal visible to customers</p>
                  </div>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setEditingDeal(null);
                      setFormData({
                        title: '',
                        category: '',
                        originalPrice: '',
                        discountedPrice: '',
                        validUntil: '',
                        description: '',
                        isActive: true,
                        images: [],
                      });
                      setImageUploadError('');
                      setIsUploadingImages(false);
                      setSaveError('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#2C5F2D] hover:bg-[#1E4620]" disabled={isSaving || isUploadingImages}>
                    {isSaving ? 'Saving...' : editingDeal ? 'Update Deal' : 'Create Deal'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Summary */}
        {loadError && <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{loadError}</p>}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Deals</p>
                  <p className="text-2xl font-bold text-gray-900">{deals.length}</p>
                </div>
                <Package className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Deals</p>
                  <p className="text-2xl font-bold text-green-600">
                    {deals.filter(d => d.isActive).length}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-[#2C5F2D]">
                    {deals.reduce((sum, deal) => sum + deal.bookings, 0)}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-[#2C5F2D]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Discount</p>
                  <p className="text-2xl font-bold text-[#D4AF37]">
                    {deals.length > 0 ? Math.round(deals.reduce((sum, deal) => sum + deal.discount, 0) / deals.length) : 0}%
                  </p>
                </div>
                <Percent className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {isLoadingDeals && (
          <div className="mb-6 rounded-3xl border border-dashed border-[#d9c5a1] bg-white px-6 py-10 text-center text-sm text-gray-600 shadow-md">
            Loading deals from the database...
          </div>
        )}

        {!isLoadingDeals && deals.length === 0 && (
          <div className="mb-6 rounded-3xl border border-dashed border-[#d9c5a1] bg-white px-6 py-10 text-center text-sm text-gray-600 shadow-md">
            No deals found in the database yet. Create one to test the full roundtrip.
          </div>
        )}

        {/* Deals List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {deals.map((deal) => (
            <Card key={deal.id} className={`border-none shadow-md ${!deal.isActive ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{deal.title}</CardTitle>
                    <CardDescription>{deal.category}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => void toggleActive(deal)}
                      title={deal.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {deal.isActive ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(deal)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => void handleDelete(deal.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {deal.images?.length > 0 && (
                  <div className="mb-4 grid grid-cols-3 gap-2 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-2">
                    {deal.images.slice(0, 3).map((image, index) => (
                      <img
                        key={`${deal.id}-${index}`}
                        src={image}
                        alt={`${deal.title} image ${index + 1}`}
                        className="h-20 w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-600 mb-4">{deal.description}</p>

                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 line-through">
                      LKR {deal.originalPrice.toLocaleString()}
                    </p>
                    <p className="text-2xl font-bold text-[#2C5F2D]">
                      LKR {deal.discountedPrice.toLocaleString()}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {deal.discount}% OFF
                  </Badge>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    Valid until {new Date(deal.validUntil).toLocaleDateString('en-GB')}
                  </div>
                  <div className="text-sm font-medium text-[#2C5F2D]">
                    {deal.bookings} bookings
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
