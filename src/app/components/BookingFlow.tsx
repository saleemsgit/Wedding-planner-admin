import { Link } from 'react-router';
import {
  Calendar, Users, FileText, CreditCard, ChevronRight, Check,
  Tag, Wallet, CreditCard as CardIcon, Building2, Smartphone,
  Clock, MapPin, Phone, Mail, User, CheckCircle2
} from 'lucide-react';
import Navigation from './Navigation';
import { useState } from 'react';

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('06:00 PM');
  const [duration, setDuration] = useState('8 hours');
  const [guestCount, setGuestCount] = useState(250);
  const [eventType, setEventType] = useState('Nikah Ceremony');
  const [specialRequests, setSpecialRequests] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentPlan, setPaymentPlan] = useState('full');
  const [confirmed, setConfirmed] = useState(false);

  const packages = [
    {
      id: 'essential',
      name: 'Essential',
      price: 250000,
      features: ['6 hours', 'Up to 200 guests', 'Basic decoration', 'Sound system', 'AC'],
      badge: null
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 350000,
      features: ['8 hours', 'Up to 300 guests', 'Premium florals', 'Professional sound & lighting', 'Stage decoration', 'Red carpet'],
      badge: 'Popular'
    },
    {
      id: 'luxury',
      name: 'Luxury',
      price: 500000,
      features: ['10 hours', 'Up to 400 guests', 'Luxury decoration', 'Premium AV + DJ', 'Grand stage backdrop', 'VIP entrance', 'Event coordinator'],
      badge: 'Premium'
    },
  ];

  const steps = [
    { number: 1, name: 'Package', icon: <FileText className="w-4 h-4" /> },
    { number: 2, name: 'Date & Time', icon: <Calendar className="w-4 h-4" /> },
    { number: 3, name: 'Details', icon: <Users className="w-4 h-4" /> },
    { number: 4, name: 'Customise', icon: <Tag className="w-4 h-4" /> },
    { number: 5, name: 'Payment', icon: <CreditCard className="w-4 h-4" /> },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CardIcon className="w-5 h-5" /> },
    { id: 'bank', name: 'Bank Transfer', icon: <Building2 className="w-5 h-5" /> },
    { id: 'mobile', name: 'Mobile Payment', icon: <Smartphone className="w-5 h-5" /> },
  ];

  const paymentPlans = [
    { id: 'full', name: 'Full Payment', description: 'Pay 100% now and confirm immediately', discount: '5% discount' },
    { id: 'deposit', name: '50% Deposit', description: 'Pay 50% now, rest 30 days before event', discount: null },
    { id: 'installment', name: '3 Installments', description: 'Pay in 3 equal monthly installments', discount: null },
  ];

  const selectedPkg = packages.find((p) => p.id === selectedPackage);
  const basePrice = selectedPkg?.price || 0;
  const serviceFee = 15000;
  const couponDiscount = couponApplied ? 25000 : 0;
  const total = basePrice + serviceFee - couponDiscount;

  const getDepositAmount = () => {
    if (paymentPlan === 'deposit') return total * 0.5;
    if (paymentPlan === 'installment') return total / 3;
    return total;
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'WEDDING2026') {
      setCouponApplied(true);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-ivory pb-20 md:pb-0">
        <Navigation />
        <div className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-gold/30">
              <CheckCircle2 className="w-12 h-12 text-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl mb-4 text-green-deep">Booking Confirmed! 🎊</h1>
            <p className="text-muted-foreground text-lg mb-2">Alhamdulillah! Your booking is confirmed.</p>
            <p className="text-muted-foreground mb-8">A confirmation has been sent to your WhatsApp and email.</p>

            <div className="bg-card rounded-2xl p-6 border border-border mb-8 text-left">
              <h2 className="text-lg mb-4 text-green-deep">Booking Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="font-medium">#WSL-2026-4821</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Venue</span>
                  <span className="font-medium">Royal Gardens Banquet Hall</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-medium">{selectedPkg?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event</span>
                  <span className="font-medium">{eventType}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-medium text-gold text-lg">LKR {getDepositAmount().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/planner" className="bg-green-deep hover:bg-green-soft text-ivory px-8 py-3.5 rounded-xl transition-all">
                View in My Planner
              </Link>
              <Link to="/services/all" className="bg-beige hover:bg-gold/10 text-foreground px-8 py-3.5 rounded-xl transition-all border border-border">
                Browse More Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pb-20 md:pb-0">
      <Navigation />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/service/1" className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1 mb-4">
              <ChevronRight className="w-4 h-4 rotate-180" />
              Royal Gardens Banquet Hall
            </Link>
            <h1 className="text-3xl md:text-4xl mb-2 text-green-deep">Complete Your Booking</h1>
            <p className="text-muted-foreground">Fill in the details to secure your preferred date</p>
          </div>

          {/* Progress Steps */}
          <div className="bg-card rounded-2xl p-5 border border-border mb-8">
            <div className="flex items-center">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => s.number < step && setStep(s.number)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        step > s.number
                          ? 'bg-gold text-white cursor-pointer'
                          : step === s.number
                          ? 'bg-gold text-white ring-4 ring-gold/20'
                          : 'bg-beige text-muted-foreground'
                      }`}
                    >
                      {step > s.number ? <Check className="w-5 h-5" /> : s.icon}
                    </button>
                    <span className={`text-xs mt-2 hidden sm:block ${step >= s.number ? 'text-gold' : 'text-muted-foreground'}`}>
                      {s.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 -mt-6 mx-1 transition-all ${step > s.number ? 'bg-gold' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step Content */}
            <div className="md:col-span-2">
              <div className="bg-card rounded-2xl p-8 border border-border">

                {/* Step 1: Select Package */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl mb-6 text-green-deep">Select Your Package</h2>
                    <div className="space-y-4">
                      {packages.map((pkg) => (
                        <label
                          key={pkg.id}
                          className={`flex items-start p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedPackage === pkg.id
                              ? 'border-gold bg-gold/5 shadow-md'
                              : 'border-border hover:border-gold/40'
                          }`}
                        >
                          <input
                            type="radio"
                            name="package"
                            value={pkg.id}
                            checked={selectedPackage === pkg.id}
                            onChange={(e) => setSelectedPackage(e.target.value)}
                            className="w-5 h-5 accent-gold mt-1 flex-shrink-0"
                          />
                          <div className="flex-1 ml-4">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-medium text-green-deep">{pkg.name} Package</span>
                              {pkg.badge && (
                                <span className="bg-gold text-white text-xs px-2 py-0.5 rounded-full">{pkg.badge}</span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {pkg.features.map((f, i) => (
                                <span key={i} className="text-xs bg-beige text-muted-foreground px-2.5 py-1 rounded-full">{f}</span>
                              ))}
                            </div>
                            <div className="text-xl font-medium text-gold">LKR {pkg.price.toLocaleString()}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl mb-6 text-green-deep">Select Date & Time</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-foreground">Event Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min="2026-06-01"
                            className="w-full pl-12 pr-4 py-3.5 bg-beige border-0 rounded-xl"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-foreground">Start Time</label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-beige border-0 rounded-xl"
                          >
                            {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '07:00 PM'].map(t => (
                              <option key={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-foreground">Duration</label>
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full px-4 py-3.5 bg-beige border-0 rounded-xl"
                        >
                          <option>6 hours</option>
                          <option>8 hours</option>
                          <option>10 hours</option>
                          <option>12 hours</option>
                        </select>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
                        ⚡ July dates are booking fast! Secure your preferred date now.
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Event Details */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl mb-6 text-green-deep">Event Details</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-foreground">Event Type</label>
                        <select
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value)}
                          className="w-full px-4 py-3.5 bg-beige border-0 rounded-xl"
                        >
                          <option>Nikah Ceremony</option>
                          <option>Walima</option>
                          <option>Wedding Reception</option>
                          <option>Mehndi Night</option>
                          <option>Gift Exchange (Seer)</option>
                          <option>Engagement</option>
                          <option>Groom Arrival</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-foreground">Number of Guests</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type="number"
                            value={guestCount}
                            onChange={(e) => setGuestCount(Number(e.target.value))}
                            min="50"
                            max="400"
                            className="w-full pl-12 pr-4 py-3.5 bg-beige border-0 rounded-xl"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">This package supports up to {selectedPkg?.features[1]?.split('Up to ')[1] || '300 guests'}</p>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-foreground">Contact Person</label>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="text" placeholder="Full Name" className="w-full pl-11 pr-4 py-3.5 bg-beige border-0 rounded-xl" />
                          </div>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="tel" placeholder="Phone Number" className="w-full pl-11 pr-4 py-3.5 bg-beige border-0 rounded-xl" />
                          </div>
                          <div className="relative md:col-span-2">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input type="email" placeholder="Email Address" className="w-full pl-11 pr-4 py-3.5 bg-beige border-0 rounded-xl" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-foreground">Venue Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-3 w-4 h-4 text-muted-foreground" />
                          <textarea
                            rows={2}
                            placeholder="Delivery/pickup address if needed..."
                            className="w-full pl-11 pr-4 py-3 bg-beige border-0 rounded-xl resize-none text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Customise */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl mb-6 text-green-deep">Custom Requests & Coupon</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-foreground">Special Requests</label>
                        <textarea
                          rows={4}
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          placeholder="E.g. Separate ladies entrance, specific decor color (Royal Gold theme), prayer room access, halal catering requirement..."
                          className="w-full px-4 py-3 bg-beige border-0 rounded-xl resize-none text-sm"
                        />
                      </div>

                      {/* Add-ons */}
                      <div>
                        <label className="block mb-3 text-sm font-medium text-foreground">Optional Add-ons</label>
                        <div className="space-y-2">
                          {[
                            { name: 'Professional DJ & Sound Upgrade', price: 35000 },
                            { name: 'Flower Arch Entrance', price: 25000 },
                            { name: 'Drone Photography Package', price: 45000 },
                            { name: 'Wedding Car Decoration', price: 15000 },
                          ].map((addon, i) => (
                            <label key={i} className="flex items-center justify-between p-4 bg-beige hover:bg-gold/5 rounded-xl cursor-pointer border border-transparent hover:border-gold/20 transition-all">
                              <div className="flex items-center gap-3">
                                <input type="checkbox" className="w-4 h-4 accent-gold rounded" />
                                <span className="text-sm text-foreground">{addon.name}</span>
                              </div>
                              <span className="text-sm text-gold font-medium">+ LKR {addon.price.toLocaleString()}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Coupon */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-foreground">Coupon Code</label>
                        <div className="flex gap-3">
                          <div className="relative flex-1">
                            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              placeholder="Enter coupon code"
                              className="w-full pl-11 pr-4 py-3.5 bg-beige border-0 rounded-xl text-sm"
                            />
                          </div>
                          <button
                            onClick={applyCoupon}
                            className="px-6 py-3.5 bg-green-deep hover:bg-green-soft text-ivory rounded-xl transition-all text-sm"
                          >
                            Apply
                          </button>
                        </div>
                        {couponApplied && (
                          <div className="flex items-center gap-2 mt-2 text-green-600 text-sm">
                            <CheckCircle2 className="w-4 h-4" />
                            Coupon WEDDING2026 applied! LKR 25,000 discount.
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">Try: WEDDING2026 for a special discount</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Payment */}
                {step === 5 && (
                  <div>
                    <h2 className="text-2xl mb-6 text-green-deep">Payment Details</h2>
                    <div className="space-y-6">

                      {/* Payment Plan */}
                      <div>
                        <label className="block mb-3 text-sm font-medium text-foreground">Payment Plan</label>
                        <div className="space-y-3">
                          {paymentPlans.map((plan) => (
                            <label
                              key={plan.id}
                              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                paymentPlan === plan.id ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/40'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="paymentPlan"
                                  value={plan.id}
                                  checked={paymentPlan === plan.id}
                                  onChange={(e) => setPaymentPlan(e.target.value)}
                                  className="w-4 h-4 accent-gold"
                                />
                                <div>
                                  <div className="text-sm font-medium text-foreground">{plan.name}</div>
                                  <div className="text-xs text-muted-foreground">{plan.description}</div>
                                </div>
                              </div>
                              {plan.discount && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{plan.discount}</span>
                              )}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <label className="block mb-3 text-sm font-medium text-foreground">Payment Method</label>
                        <div className="grid grid-cols-3 gap-3">
                          {paymentMethods.map((method) => (
                            <label
                              key={method.id}
                              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                paymentMethod === method.id ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/40'
                              }`}
                            >
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={paymentMethod === method.id}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="sr-only"
                              />
                              <div className={`${paymentMethod === method.id ? 'text-gold' : 'text-muted-foreground'}`}>
                                {method.icon}
                              </div>
                              <span className="text-xs text-center text-foreground">{method.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {paymentMethod === 'card' && (
                        <div className="space-y-3">
                          <input type="text" placeholder="Card Number" className="w-full px-4 py-3.5 bg-beige border-0 rounded-xl text-sm" />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="MM / YY" className="px-4 py-3.5 bg-beige border-0 rounded-xl text-sm" />
                            <input type="text" placeholder="CVV" className="px-4 py-3.5 bg-beige border-0 rounded-xl text-sm" />
                          </div>
                          <input type="text" placeholder="Cardholder Name" className="w-full px-4 py-3.5 bg-beige border-0 rounded-xl text-sm" />
                        </div>
                      )}

                      {paymentMethod === 'bank' && (
                        <div className="bg-beige rounded-xl p-5">
                          <h3 className="text-sm font-medium mb-3">Bank Transfer Details</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Bank</span><span>Commercial Bank of Ceylon</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Account Name</span><span>WeddingSL Payments (Pvt) Ltd</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Account No.</span><span>8001234567</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Branch</span><span>Colombo Main</span></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-3.5 bg-beige hover:bg-gold/10 text-green-deep rounded-xl transition-all flex items-center gap-2"
                  >
                    <ChevronRight className="w-5 h-5 rotate-180" />
                    Previous
                  </button>
                )}
                {step < 5 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="ml-auto px-8 py-3.5 bg-gold hover:bg-gold/90 text-white rounded-xl transition-all flex items-center gap-2 shadow-md"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setConfirmed(true)}
                    className="ml-auto px-8 py-3.5 bg-green-deep hover:bg-green-soft text-white rounded-xl transition-all flex items-center gap-2 shadow-md"
                  >
                    Confirm Booking
                    <Check className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="text-lg mb-5 text-green-deep">Order Summary</h3>
                  <div className="space-y-3 text-sm mb-5">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{selectedPkg?.name} Package</span>
                      <span className="font-medium">LKR {basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-medium">LKR {serviceFee.toLocaleString()}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>- LKR {couponDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-medium text-foreground">
                        {paymentPlan === 'full' ? 'Total' : paymentPlan === 'deposit' ? 'Deposit (50%)' : '1st Installment'}
                      </span>
                      <span className="font-medium text-gold text-lg">LKR {getDepositAmount().toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="bg-beige rounded-xl p-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2 mb-1">
                      <Check className="w-3.5 h-3.5 text-green-soft" />
                      <span>Secure encrypted payment</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Check className="w-3.5 h-3.5 text-green-soft" />
                      <span>Instant booking confirmation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-green-soft" />
                      <span>Free cancellation within 48hrs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
