"use client";

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, DollarSign, Package, Star, TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import VendorNavigation from './VendorNavigation';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const bookingData = [
  { day: 'Mon', bookings: 12 },
  { day: 'Tue', bookings: 19 },
  { day: 'Wed', bookings: 15 },
  { day: 'Thu', bookings: 22 },
  { day: 'Fri', bookings: 28 },
  { day: 'Sat', bookings: 35 },
  { day: 'Sun', bookings: 30 },
];

const recentBookings = [
  {
    id: 1,
    customer: 'Fatima & Ahmed',
    service: 'Premium Wedding Hall',
    date: '2026-06-15',
    amount: 150000,
    status: 'confirmed'
  },
  {
    id: 2,
    customer: 'Zainab & Hassan',
    service: 'Mehndi Artist - Bridal Package',
    date: '2026-06-20',
    amount: 25000,
    status: 'pending'
  },
  {
    id: 3,
    customer: 'Ayesha & Omar',
    service: 'Wedding Photography',
    date: '2026-07-01',
    amount: 85000,
    status: 'confirmed'
  },
  {
    id: 4,
    customer: 'Mariam & Khalid',
    service: 'Catering - 500 guests',
    date: '2026-07-10',
    amount: 200000,
    status: 'confirmed'
  },
];

export default function VendorDashboard() {
  const [timeframe, setTimeframe] = useState('month');

  const stats = [
    {
      title: 'Total Revenue',
      value: 'LKR 328,000',
      change: '+12.5%',
      icon: DollarSign,
      trend: 'up',
      description: 'vs last month'
    },
    {
      title: 'Active Bookings',
      value: '24',
      change: '+8',
      icon: Calendar,
      trend: 'up',
      description: 'new this week'
    },
    {
      title: 'Active Deals',
      value: '12',
      change: '3 expiring soon',
      icon: Package,
      trend: 'neutral',
      description: 'total promotions'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2',
      icon: Star,
      trend: 'up',
      description: 'from 156 reviews'
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <VendorNavigation />

      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C5F2D] mb-2">Welcome back, Al-Noor Events</h1>
          <p className="text-gray-600">Here's what's happening with your business today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${
                    stat.trend === 'up' ? 'bg-green-50' : 'bg-amber-50'
                  }`}>
                    <stat.icon className={`w-6 h-6 ${
                      stat.trend === 'up' ? 'text-[#2C5F2D]' : 'text-[#D4AF37]'
                    }`} />
                  </div>
                  {stat.trend === 'up' && (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2C5F2D"
                    strokeWidth={3}
                    dot={{ fill: '#2C5F2D', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Bookings Chart */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Weekly Bookings</CardTitle>
              <CardDescription>Number of bookings per day this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="bookings" fill="#D4AF37" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest customer bookings and their status</CardDescription>
              </div>
              <Tabs value={timeframe} onValueChange={setTimeframe}>
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#F4E4C1] flex items-center justify-center">
                            <Users className="w-5 h-5 text-[#2C5F2D]" />
                          </div>
                          <span className="font-medium text-gray-900">{booking.customer}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{booking.service}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString('en-GB')}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-900">
                        LKR {booking.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          <CheckCircle className="w-3 h-3" />
                          {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
