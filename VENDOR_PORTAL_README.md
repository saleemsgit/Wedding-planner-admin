# Vendor Portal - Sri Lankan Muslim Wedding Platform

## Overview
The vendor portal is a separate application for wedding service vendors to manage their business on the platform. It's designed as a standalone system that can be deployed independently from the customer-facing site.

## Access
- **Customer Site**: `/` (main routes)
- **Vendor Portal**: `/vendor/dashboard`

Vendors can directly navigate to `/vendor/dashboard` to access the portal.

## Vendor Portal Features

### 1. Dashboard (`/vendor/dashboard`)
- Revenue analytics with monthly charts
- Booking trends and statistics
- Recent bookings overview
- Key metrics: Total Revenue, Active Bookings, Active Deals, Average Rating

### 2. Deal Management (`/vendor/deals`)
- Create new service deals and promotions
- Edit existing deals
- Set pricing and discounts
- Manage deal activation status
- Track booking performance per deal
- Support for all 15+ service categories

### 3. Booking Management (`/vendor/bookings`)
- View all customer bookings
- Accept/reject pending bookings
- Mark bookings as completed
- Filter by status (pending, confirmed, completed)
- View detailed booking information
- Track payments and deposits

## Service Categories Supported
1. Wedding Halls & Venues
2. Catering Services
3. Bridal Dressing
4. Groom Dressing
5. Photography & Videography
6. Mehndi Artists
7. Gift Tray Decoration
8. Vehicle Rentals
9. Nikah/Imam Services
10. Wedding Decorations
11. Music & Entertainment
12. Wedding Cakes
13. Invitation Cards
14. Jewelry Rental
15. Makeup Artists

## Design
- Consistent with customer site design system
- Gold (#D4AF37) and Deep Green (#2C5F2D) color palette
- Mobile-responsive design
- Professional dashboard-style interface

## Future Deployment
The vendor portal is structured to be easily separated into a standalone deployment:
- All vendor components are in `/src/app/vendor-components/`
- Separate navigation and routing
- Can be deployed to `vendors.weddingplatform.lk` or similar subdomain

## Technical Details
- Built with React + TypeScript
- Recharts for analytics visualization
- React Router for navigation
- Radix UI components
- Tailwind CSS for styling
