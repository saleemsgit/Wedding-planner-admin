"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, LayoutDashboard, LogOut, Package, Bell } from 'lucide-react';
import { Button } from '../components/ui/button';

const navItems = [
  { path: '/vendor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/vendor/deals', label: 'Deals & Services', icon: Package },
  { path: '/vendor/bookings', label: 'Bookings', icon: Calendar },
];

export default function VendorNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
            <Link href="/vendor/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#D4AF37] to-[#B8941F] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2C5F2D]">Vendor Portal</h1>
              <p className="text-xs text-gray-500">Wedding Services Platform</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#2C5F2D] text-white hover:bg-[#1E4620]'
                        : 'text-gray-700 hover:text-[#2C5F2D] hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <div className="h-8 w-px bg-gray-200"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Al-Noor Events</p>
                <p className="text-xs text-gray-500">Premium Vendor</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#D4AF37] to-[#2C5F2D] flex items-center justify-center text-white font-semibold">
                AN
              </div>
            </div>

            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-red-600">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex overflow-x-auto gap-2 pb-3 -mx-4 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={isActive ? 'default' : 'outline'}
                  size="sm"
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2C5F2D] text-white'
                      : 'text-gray-700 hover:text-[#2C5F2D]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
