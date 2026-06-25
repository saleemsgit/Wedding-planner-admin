import type { Metadata } from "next";
import "./globals.css";
import AdminShell from "./components/AdminShell";

export const metadata: Metadata = {
  title: "WeddingSL Admin",
  description: "Next.js admin dashboard for the wedding booking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#fbf7ef] text-[#17352c]">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
