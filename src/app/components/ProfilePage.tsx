import { Link } from 'react-router';
import {
  User, Calendar, Heart, Bell, Settings, LogOut, Clock,
  MapPin, Download, CreditCard, ChevronRight, BadgeCheck,
  Star, Phone, Mail, Edit2, Camera
} from 'lucide-react';
import { useState } from 'react';
import Navigation from './Navigation';
import IslamicPattern from './IslamicPattern';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'payments' | 'saved' | 'timeline'>('bookings');

  const userInfo = {
    name: 'Amina Rahman',
    partnerName: 'Rizwan Ahmed',
    email: 'amina.rahman@email.com',
    phone: '+94 77 123 4567',
    weddingDate: '2026-07-15',
    location: 'Colombo, Sri Lanka',
    memberSince: 'January 2026',
    planningProgress: 42,
  };

  const bookingHistory = [
    { id: 1, service: 'Royal Gardens Banquet Hall', category: 'Venue', date: '2026-07-16', status: 'confirmed', amount: 350000, bookingDate: '2026-04-15', packageName: 'Premium' },
    { id: 2, service: 'Gourmet Catering Services', category: 'Catering', date: '2026-07-16', status: 'confirmed', amount: 480000, bookingDate: '2026-04-18', packageName: 'Royal Buffet' },
    { id: 3, service: 'Elegant Moments Photography', category: 'Photography', date: '2026-07-16', status: 'pending', amount: 85000, bookingDate: '2026-04-20', packageName: 'Cinematic' },
    { id: 4, service: 'Regal Gift Decorators', category: 'Gift Trays', date: '2026-06-20', status: 'confirmed', amount: 65000, bookingDate: '2026-04-22', packageName: 'Royal Gold' },
    { id: 5, service: 'Divine Nikah Services', category: 'Religious', date: '2026-07-15', status: 'confirmed', amount: 15000, bookingDate: '2026-04-25', packageName: 'Standard' },
  ];

  const paymentHistory = [
    { id: 1, service: 'Royal Gardens Banquet Hall', amount: 175000, type: 'Deposit (50%)', date: '2026-04-15', method: 'Credit Card', status: 'paid', invoice: '#INV-4821' },
    { id: 2, service: 'Gourmet Catering Services', amount: 480000, type: 'Full Payment', date: '2026-04-18', method: 'Bank Transfer', status: 'paid', invoice: '#INV-4822' },
    { id: 3, service: 'Regal Gift Decorators', amount: 65000, type: 'Full Payment', date: '2026-04-22', method: 'Credit Card', status: 'paid', invoice: '#INV-4823' },
    { id: 4, service: 'Elegant Moments Photography', amount: 42500, type: 'Deposit (50%)', date: '2026-04-20', method: 'Mobile Payment', status: 'pending', invoice: '#INV-4824' },
  ];

  const savedVendors = [
    { id: 1, name: 'Royal Gardens Banquet Hall', category: 'Venue', rating: 4.9, image: 'https://images.unsplash.com/photo-1775918427144-51f0bf53f8c4?w=400' },
    { id: 2, name: 'Elegant Moments Photography', category: 'Photography', rating: 5.0, image: 'https://images.unsplash.com/photo-1611106211090-8f3c79eb8552?w=400' },
    { id: 3, name: 'Luxury Bridal Boutique', category: 'Bridal', rating: 4.8, image: 'https://images.unsplash.com/photo-1610202308858-d729ec4a3582?w=400' },
    { id: 4, name: 'Zara Mehndi Designs', category: 'Mehndi', rating: 5.0, image: 'https://images.unsplash.com/photo-1640745682470-8321de74eb05?w=400' },
  ];

  const notifications = [
    { id: 1, text: 'Your booking for Royal Gardens has been confirmed ✅', time: '2 hours ago', unread: true, type: 'success' },
    { id: 2, text: 'New message from Elegant Moments Photography 📸', time: '5 hours ago', unread: true, type: 'message' },
    { id: 3, text: 'Payment reminder: Balance due for Photography on May 20', time: '1 day ago', unread: false, type: 'warning' },
    { id: 4, text: 'Mehndi artists availability alert for July 10 🌿', time: '2 days ago', unread: false, type: 'info' },
  ];

  const weddingTimeline = [
    { stage: 'Proposal', date: '2026-05-15', status: 'completed', icon: '💍', description: 'Completed successfully' },
    { stage: 'Gift Exchange (Seer)', date: '2026-06-20', status: 'in-progress', icon: '🎁', description: '65% planned' },
    { stage: 'Mehndi Night', date: '2026-07-10', status: 'pending', icon: '🌿', description: 'Venue: Home | Artists: TBD' },
    { stage: 'Groom Arrival', date: '2026-07-15', status: 'pending', icon: '👑', description: 'Car: Not booked' },
    { stage: 'Nikah Ceremony', date: '2026-07-15', status: 'pending', icon: '☪️', description: 'Imam: Booked ✅' },
    { stage: 'Wedding Reception', date: '2026-07-16', status: 'pending', icon: '🎊', description: 'Hall: Confirmed ✅' },
    { stage: 'Walima', date: '2026-07-17', status: 'pending', icon: '🍽️', description: 'Venue: Not set' },
  ];

  const totalSpent = paymentHistory.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const daysRemaining = Math.ceil((new Date('2026-07-15').getTime() - new Date('2026-05-11').getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-ivory pb-20 md:pb-0">
      <Navigation />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Profile Header */}
          <div className="relative bg-gradient-to-br from-green-deep to-green-soft text-ivory rounded-2xl p-8 mb-8 overflow-hidden">
            <IslamicPattern className="absolute inset-0 opacity-10 text-white" />
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center text-3xl font-medium text-green-deep shadow-lg">
                    {userInfo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center shadow-md">
                    <Camera className="w-4 h-4 text-green-deep" />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h1 className="text-2xl md:text-3xl">{userInfo.name}</h1>
                    <span className="text-gold text-lg">&</span>
                    <h1 className="text-2xl md:text-3xl">{userInfo.partnerName}</h1>
                    <div className="flex items-center gap-1 bg-gold/20 px-3 py-1 rounded-full">
                      <BadgeCheck className="w-4 h-4 text-gold" />
                      <span className="text-xs text-gold">Verified Couple</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-ivory/80 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Nikah: July 15, 2026
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {userInfo.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {daysRemaining} days remaining
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {/* Progress Ring */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center">
                    <div className="text-3xl font-light text-gold mb-1">{userInfo.planningProgress}%</div>
                    <div className="text-xs text-ivory/70 mb-2">Planning Done</div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div className="bg-gold rounded-full h-1.5" style={{ width: `${userInfo.planningProgress}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-3 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-light text-gold">{bookingHistory.length}</div>
                  <div className="text-xs text-ivory/70">Bookings</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-light text-gold">LKR {(totalSpent / 1000).toFixed(0)}K</div>
                  <div className="text-xs text-ivory/70">Total Spent</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-light text-gold">{savedVendors.length}</div>
                  <div className="text-xs text-ivory/70">Saved</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-xl font-light text-gold">7</div>
                  <div className="text-xs text-ivory/70">Events</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* Tab Navigation */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'bookings', name: 'My Bookings' },
                  { id: 'payments', name: 'Payment History' },
                  { id: 'saved', name: 'Saved Vendors' },
                  { id: 'timeline', name: 'Wedding Timeline' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-deep text-ivory shadow-sm'
                        : 'bg-card border border-border text-foreground hover:border-gold hover:text-gold'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-green-deep">My Bookings</h2>
                    <Link to="/services/all" className="text-sm text-gold hover:text-green-deep transition-colors flex items-center gap-1">
                      Book More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <div key={booking.id} className="p-5 bg-beige rounded-xl hover:bg-gold/5 transition-colors">
                        <div className="flex flex-col sm:flex-row justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                              <h3 className="font-medium text-green-deep">{booking.service}</h3>
                              <span className={`text-xs px-3 py-1 rounded-full ${
                                booking.status === 'confirmed' ? 'bg-gold/15 text-gold' : 'bg-orange-100 text-orange-600'
                              }`}>
                                {booking.status === 'confirmed' ? '✅ Confirmed' : '⏳ Pending'}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span className="bg-white px-2 py-1 rounded-md">{booking.category}</span>
                              <span className="bg-white px-2 py-1 rounded-md">{booking.packageName} Package</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Booked {new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
                            <div className="text-xl font-medium text-gold">LKR {booking.amount.toLocaleString()}</div>
                            <Link to={`/service/${booking.id}`} className="text-xs text-green-deep hover:text-gold transition-colors border border-border px-3 py-1.5 rounded-xl hover:border-gold">
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment History Tab */}
              {activeTab === 'payments' && (
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-green-deep">Payment History</h2>
                    <div className="text-sm text-muted-foreground bg-beige px-4 py-2 rounded-xl">
                      Total: LKR {totalSpent.toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-beige rounded-xl">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-sm font-medium text-foreground">{payment.service}</h3>
                            <span className={`text-xs px-2.5 py-1 rounded-full ${
                              payment.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'
                            }`}>
                              {payment.status === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span>{payment.type}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <CreditCard className="w-3 h-3" />
                              {payment.method}
                            </span>
                            <span>•</span>
                            <span>{new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-lg font-medium text-gold">LKR {payment.amount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">{payment.invoice}</div>
                          </div>
                          <button className="p-2.5 bg-white hover:bg-gold/10 rounded-xl transition-colors border border-border hover:border-gold">
                            <Download className="w-4 h-4 text-gold" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Vendors Tab */}
              {activeTab === 'saved' && (
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-green-deep">Saved Vendors</h2>
                    <span className="text-sm text-muted-foreground">{savedVendors.length} saved</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {savedVendors.map((vendor) => (
                      <Link
                        key={vendor.id}
                        to={`/service/${vendor.id}`}
                        className="group relative rounded-2xl overflow-hidden aspect-[4/3] border-2 border-border hover:border-gold transition-all"
                      >
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-deep via-green-deep/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                            <span className="text-xs font-medium">{vendor.rating}</span>
                          </div>
                          <div className="text-xs text-white/70 mb-0.5">{vendor.category}</div>
                          <div className="text-sm font-medium">{vendor.name}</div>
                        </div>
                        <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all">
                          <Heart className="w-4 h-4 text-gold fill-gold" />
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Wedding Timeline Tab */}
              {activeTab === 'timeline' && (
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <h2 className="text-2xl mb-6 text-green-deep">Wedding Timeline Overview</h2>
                  <div className="space-y-4">
                    {weddingTimeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative flex-shrink-0">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl border-2 ${
                            event.status === 'completed' ? 'bg-gold/10 border-gold' :
                            event.status === 'in-progress' ? 'bg-green-50 border-green-400' :
                            'bg-beige border-border'
                          }`}>
                            {event.icon}
                          </div>
                          {index < weddingTimeline.length - 1 && (
                            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" />
                          )}
                        </div>
                        <div className={`flex-1 p-4 rounded-xl mb-2 ${
                          event.status === 'completed' ? 'bg-gold/5 border border-gold/20' :
                          event.status === 'in-progress' ? 'bg-green-50 border border-green-200' :
                          'bg-beige border border-border'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-green-deep">{event.stage}</h3>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">{event.description}</div>
                            </div>
                            <span className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ml-2 ${
                              event.status === 'completed' ? 'bg-gold/15 text-gold' :
                              event.status === 'in-progress' ? 'bg-green-100 text-green-700' :
                              'bg-beige text-muted-foreground border border-border'
                            }`}>
                              {event.status === 'completed' ? 'Done' : event.status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Personal Info */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg text-green-deep flex items-center gap-2">
                    <User className="w-5 h-5 text-gold" />
                    Personal Info
                  </h2>
                  <button className="p-2 hover:bg-beige rounded-xl transition-colors">
                    <Edit2 className="w-4 h-4 text-gold" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-beige rounded-xl">
                    <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="text-sm text-foreground">{userInfo.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-beige rounded-xl">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">Phone</div>
                      <div className="text-sm text-foreground">{userInfo.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-beige rounded-xl">
                    <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">Wedding Date</div>
                      <div className="text-sm text-foreground">July 15, 2026</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-beige rounded-xl">
                    <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">Location</div>
                      <div className="text-sm text-foreground">{userInfo.location}</div>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 py-2.5 bg-beige hover:bg-gold/10 rounded-xl text-sm text-foreground transition-colors">
                  Edit Profile
                </button>
              </div>

              {/* Notifications */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg text-green-deep flex items-center gap-2">
                    <Bell className="w-5 h-5 text-gold" />
                    Notifications
                  </h2>
                  <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center text-white text-xs">
                    {notifications.filter(n => n.unread).length}
                  </div>
                </div>
                <div className="space-y-2.5">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 rounded-xl text-sm ${n.unread ? 'bg-gold/10 border border-gold/20' : 'bg-beige'}`}
                    >
                      <div className="text-foreground leading-snug mb-1">{n.text}</div>
                      <div className="text-xs text-muted-foreground">{n.time}</div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-gold hover:text-green-deep transition-colors">
                  View All Notifications
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-lg mb-4 text-green-deep">Quick Actions</h2>
                <div className="space-y-2">
                  {[
                    { icon: <Calendar className="w-4 h-4" />, name: 'My Planner', path: '/planner', color: 'text-gold' },
                    { icon: <Heart className="w-4 h-4" />, name: 'Browse Services', path: '/services/all', color: 'text-gold' },
                    { icon: <Settings className="w-4 h-4" />, name: 'Account Settings', path: '/settings', color: 'text-muted-foreground' },
                  ].map((action, index) => (
                    <Link
                      key={index}
                      to={action.path}
                      className="flex items-center gap-3 p-3 bg-beige hover:bg-gold/10 rounded-xl transition-colors"
                    >
                      <span className={action.color}>{action.icon}</span>
                      <span className="text-sm text-foreground">{action.name}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                    </Link>
                  ))}
                  <button className="flex items-center gap-3 p-3 bg-beige hover:bg-red-50 rounded-xl transition-colors w-full text-left">
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
