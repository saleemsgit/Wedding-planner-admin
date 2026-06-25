"use client";

import { useState } from 'react';
import { Calendar, Check, X, Clock, DollarSign, Phone, Mail, MapPin, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import VendorNavigation from './VendorNavigation';

const mockBookings = [
  {
    id: 1,
    customer: { name: 'Fatima & Ahmed', phone: '+94 77 123 4567', email: 'fatima@example.com' },
    service: 'Premium Wedding Hall',
    date: '2026-06-15',
    eventType: 'Wedding Reception',
    guests: 800,
    amount: 150000,
    deposit: 50000,
    status: 'confirmed',
    location: 'Colombo 05',
    bookedOn: '2026-05-10',
  },
  {
    id: 2,
    customer: { name: 'Zainab & Hassan', phone: '+94 71 987 6543', email: 'zainab@example.com' },
    service: 'Mehndi Artist - Bridal Package',
    date: '2026-06-20',
    eventType: 'Mehndi Night',
    guests: 150,
    amount: 25000,
    deposit: 10000,
    status: 'pending',
    location: 'Dehiwala',
    bookedOn: '2026-05-15',
  },
  {
    id: 3,
    customer: { name: 'Ayesha & Omar', phone: '+94 76 555 1234', email: 'ayesha@example.com' },
    service: 'Wedding Photography',
    date: '2026-07-01',
    eventType: 'Nikah Ceremony',
    guests: 500,
    amount: 85000,
    deposit: 30000,
    status: 'confirmed',
    location: 'Nugegoda',
    bookedOn: '2026-05-12',
  },
  {
    id: 4,
    customer: { name: 'Mariam & Khalid', phone: '+94 77 222 3333', email: 'mariam@example.com' },
    service: 'Catering - Premium Package',
    date: '2026-07-10',
    eventType: 'Walima',
    guests: 500,
    amount: 200000,
    deposit: 75000,
    status: 'confirmed',
    location: 'Mount Lavinia',
    bookedOn: '2026-05-18',
  },
  {
    id: 5,
    customer: { name: 'Nadia & Imran', phone: '+94 71 444 5555', email: 'nadia@example.com' },
    service: 'Gift Tray Decoration',
    date: '2026-06-25',
    eventType: 'Gift Exchange',
    guests: 50,
    amount: 15000,
    deposit: 0,
    status: 'pending',
    location: 'Rajagiriya',
    bookedOn: '2026-05-17',
  },
  {
    id: 6,
    customer: { name: 'Safiya & Amir', phone: '+94 77 666 7777', email: 'safiya@example.com' },
    service: 'Premium Wedding Hall',
    date: '2026-05-20',
    eventType: 'Wedding Reception',
    guests: 1000,
    amount: 180000,
    deposit: 180000,
    status: 'completed',
    location: 'Colombo 07',
    bookedOn: '2026-04-05',
  },
];

export default function BookingManagement() {
  const [bookings, setBookings] = useState(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAccept = (id: number) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: 'confirmed' } : booking
    ));
    setSelectedBooking(null);
  };

  const handleReject = (id: number) => {
    if (confirm('Are you sure you want to reject this booking?')) {
      setBookings(bookings.filter(booking => booking.id !== id));
      setSelectedBooking(null);
    }
  };

  const handleComplete = (id: number) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: 'completed' } : booking
    ));
    setSelectedBooking(null);
  };

  const filteredBookings = filterStatus === 'all'
    ? bookings
    : bookings.filter(b => b.status === filterStatus);

  const stats = {
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    total: bookings.length,
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <VendorNavigation />

      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2C5F2D] mb-2">Booking Management</h1>
            <p className="text-gray-600">View and manage customer bookings</p>
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Calendar className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-[#2C5F2D]">{stats.completed}</p>
                </div>
                <Check className="w-8 h-8 text-[#2C5F2D]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>Manage your customer bookings and appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="border border-gray-200 hover:border-[#D4AF37] transition-colors cursor-pointer"
                  onClick={() => setSelectedBooking(booking)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.customer.name}
                          </h3>
                          <Badge className={
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : booking.status === 'pending'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.date).toLocaleDateString('en-GB')} - {booking.eventType}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{booking.customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold">LKR {booking.amount.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">{booking.service}</span>
                          <span className="text-sm text-gray-500">• {booking.guests} guests</span>
                        </div>
                      </div>

                      {booking.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAccept(booking.id);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReject(booking.id);
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}

                      {booking.status === 'confirmed' && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleComplete(booking.id);
                          }}
                          className="bg-[#2C5F2D] hover:bg-[#1E4620] text-white"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Booking Details Dialog */}
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="max-w-2xl">
            {selectedBooking && (
              <>
                <DialogHeader>
                  <DialogTitle>Booking Details</DialogTitle>
                  <DialogDescription>
                    Booking ID: #{selectedBooking.id}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Information</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-gray-600">Name:</span> <span className="font-medium">{selectedBooking.customer.name}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Phone:</span> <span className="font-medium">{selectedBooking.customer.phone}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Email:</span> <span className="font-medium">{selectedBooking.customer.email}</span></p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Event Details</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-gray-600">Service:</span> <span className="font-medium">{selectedBooking.service}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Event Type:</span> <span className="font-medium">{selectedBooking.eventType}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Date:</span> <span className="font-medium">{new Date(selectedBooking.date).toLocaleDateString('en-GB')}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Location:</span> <span className="font-medium">{selectedBooking.location}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Guests:</span> <span className="font-medium">{selectedBooking.guests} people</span></p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Information</h3>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="text-gray-600">Total Amount:</span> <span className="font-bold text-[#2C5F2D]">LKR {selectedBooking.amount.toLocaleString()}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Deposit Paid:</span> <span className="font-medium">LKR {selectedBooking.deposit.toLocaleString()}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Balance Due:</span> <span className="font-medium text-amber-600">LKR {(selectedBooking.amount - selectedBooking.deposit).toLocaleString()}</span></p>
                      <p className="text-sm"><span className="text-gray-600">Booked On:</span> <span className="font-medium">{new Date(selectedBooking.bookedOn).toLocaleDateString('en-GB')}</span></p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedBooking.status === 'pending' && (
                    <div className="flex gap-3 pt-4 border-t">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleAccept(selectedBooking.id)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Accept Booking
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleReject(selectedBooking.id)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject Booking
                      </Button>
                    </div>
                  )}

                  {selectedBooking.status === 'confirmed' && (
                    <div className="pt-4 border-t">
                      <Button
                        className="w-full bg-[#2C5F2D] hover:bg-[#1E4620] text-white"
                        onClick={() => handleComplete(selectedBooking.id)}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Mark as Completed
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
