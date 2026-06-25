import { Link } from 'react-router';
import {
  Search, Calendar, Heart, Camera, Car, Sparkles, ChevronRight, Star,
  MapPin, BadgeCheck, Users, Gift, Flower2, Music, Gem, BookOpen,
  Lightbulb, Mic2, TreePine, Shirt, Watch, Bot, TrendingUp, Bell
} from 'lucide-react';
import Navigation from './Navigation';
import IslamicPattern from './IslamicPattern';

export default function LandingPage() {
  const categories = [
    { icon: <Calendar className="w-6 h-6" />, name: 'Wedding Halls', path: '/services/halls', color: 'from-green-deep to-green-soft' },
    { icon: <Sparkles className="w-6 h-6" />, name: 'Catering', path: '/services/catering', color: 'from-gold to-yellow-600' },
    { icon: <Heart className="w-6 h-6" />, name: 'Bridal Dressing', path: '/services/bridal', color: 'from-pink-500 to-rose-600' },
    { icon: <Shirt className="w-6 h-6" />, name: 'Groom Styling', path: '/services/groom', color: 'from-blue-600 to-indigo-700' },
    { icon: <Car className="w-6 h-6" />, name: 'Luxury Cars', path: '/services/cars', color: 'from-gray-700 to-gray-900' },
    { icon: <Camera className="w-6 h-6" />, name: 'Photography', path: '/services/photography', color: 'from-purple-600 to-violet-700' },
    { icon: <Flower2 className="w-6 h-6" />, name: 'Mehndi Artists', path: '/services/mehndi', color: 'from-green-500 to-emerald-600' },
    { icon: <Gift className="w-6 h-6" />, name: 'Gift Trays', path: '/services/gifts', color: 'from-amber-500 to-orange-600' },
    { icon: <Gem className="w-6 h-6" />, name: 'Jewelry', path: '/services/jewelry', color: 'from-gold to-amber-600' },
    { icon: <BookOpen className="w-6 h-6" />, name: 'Wedding Cards', path: '/services/cards', color: 'from-teal-500 to-cyan-600' },
    { icon: <Lightbulb className="w-6 h-6" />, name: 'Lighting & Decor', path: '/services/decor', color: 'from-yellow-400 to-amber-500' },
    { icon: <Mic2 className="w-6 h-6" />, name: 'Sound Systems', path: '/services/sound', color: 'from-red-500 to-rose-600' },
    { icon: <BookOpen className="w-6 h-6" />, name: 'Religious Services', path: '/services/religious', color: 'from-green-deep to-emerald-800' },
    { icon: <TreePine className="w-6 h-6" />, name: 'Flower Arrangements', path: '/services/flowers', color: 'from-pink-400 to-rose-500' },
    { icon: <Music className="w-6 h-6" />, name: 'Videography', path: '/services/video', color: 'from-blue-500 to-cyan-600' },
    { icon: <Watch className="w-6 h-6" />, name: 'Stage Decorations', path: '/services/stage', color: 'from-gold to-yellow-700' },
    { icon: <Users className="w-6 h-6" />, name: 'Family Seating', path: '/services/seating', color: 'from-green-soft to-green-deep' },
  ];

  const weddingStages = [
    { number: '01', title: 'Proposal', subtitle: 'Begin your journey', icon: '💍', color: 'border-pink-200 bg-pink-50' },
    { number: '02', title: 'Engagement', subtitle: 'Sacred commitment', icon: '🤝', color: 'border-purple-200 bg-purple-50' },
    { number: '03', title: 'Gift Exchange', subtitle: 'Seer / Jahez ceremony', icon: '🎁', color: 'border-amber-200 bg-amber-50' },
    { number: '04', title: 'Mehndi Night', subtitle: 'Celebrate together', icon: '🌿', color: 'border-green-200 bg-green-50' },
    { number: '05', title: 'Groom Arrival', subtitle: 'Grand entrance', icon: '👑', color: 'border-blue-200 bg-blue-50' },
    { number: '06', title: 'Nikah', subtitle: 'Sacred union', icon: '☪️', color: 'border-gold-light bg-amber-50' },
    { number: '07', title: 'Walima', subtitle: 'Blessed feast', icon: '🎊', color: 'border-teal-200 bg-teal-50' },
  ];

  const featuredVendors = [
    {
      name: 'Royal Gardens Banquet Hall',
      location: 'Colombo 07',
      rating: 4.9,
      reviews: 156,
      price: 'LKR 350,000',
      image: 'https://images.unsplash.com/photo-1775918427144-51f0bf53f8c4?w=800',
      category: 'Wedding Hall',
      availability: 'Available'
    },
    {
      name: 'Elegant Moments Photography',
      location: 'Dehiwala',
      rating: 5.0,
      reviews: 203,
      price: 'LKR 85,000',
      image: 'https://images.unsplash.com/photo-1611106211090-8f3c79eb8552?w=800',
      category: 'Photography',
      availability: 'Available'
    },
    {
      name: 'Luxury Bridal Boutique',
      location: 'Wellawatte',
      rating: 4.8,
      reviews: 127,
      price: 'LKR 120,000',
      image: 'https://images.unsplash.com/photo-1610202308858-d729ec4a3582?w=800',
      category: 'Bridal Dressing',
      availability: 'Limited'
    },
  ];

  const testimonials = [
    {
      name: 'Amina & Rizwan',
      text: 'This platform made planning our wedding so easy! From finding our Nikah venue to booking the Mehndi artists, everything was seamless and beautifully organized.',
      date: 'March 2026',
      avatar: 'AR',
      event: 'Nikah & Walima'
    },
    {
      name: 'Fatima & Asif',
      text: 'The vendor quality is exceptional. Our Mehndi night was absolutely perfect thanks to their recommendations. The Gift Exchange planner saved us so much time!',
      date: 'February 2026',
      avatar: 'FA',
      event: 'Full Wedding Package'
    },
    {
      name: 'Zainab & Haroon',
      text: 'WeddingSL understood our Sri Lankan Muslim traditions perfectly. The platform helped us coordinate all 7 wedding events without any stress.',
      date: 'January 2026',
      avatar: 'ZH',
      event: 'Engagement to Walima'
    },
  ];

  const aiSuggestions = [
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Budget Tip', text: 'Book your hall 6 months early to save up to 15% on venue costs.', color: 'bg-green-50 border-green-200 text-green-700' },
    { icon: <Bell className="w-5 h-5" />, title: 'Timeline Alert', text: 'Mehndi artists in Colombo book out fast. Reserve yours 3 months ahead.', color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'Trending Now', text: 'Royal Mughal Mehndi themes are trending this season among Sri Lankan brides.', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-deep via-green-soft to-green-deep text-ivory pt-20 pb-28 px-4">
        <IslamicPattern className="absolute inset-0 opacity-8 text-white" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-deep/40" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-gold/40">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold-light">Sri Lanka's Premier Muslim Wedding Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Plan Your Dream <br />
              <span className="text-gold">Sri Lankan Muslim</span>
              <br />Wedding Effortlessly
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-ivory/80 max-w-2xl mx-auto">
              From Proposal to Walima — discover, book, and coordinate every detail of your perfect celebration
            </p>

            {/* Enhanced Search Bar */}
            <div className="bg-white/98 backdrop-blur-sm rounded-2xl p-4 shadow-2xl max-w-4xl mx-auto border border-white/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-beige border-0 text-foreground text-sm"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-beige border-0 text-foreground text-sm"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-beige border-0 text-foreground text-sm"
                  />
                </div>
                <button className="bg-gold hover:bg-gold/90 text-green-deep px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/planner" className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-green-deep px-8 py-4 rounded-xl transition-all shadow-lg">
                <Heart className="w-5 h-5" />
                Start Planning
              </Link>
              <Link to="/services/all" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-ivory border border-white/40 px-8 py-4 rounded-xl transition-all">
                <Search className="w-5 h-5" />
                Explore Vendors
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-ivory/70">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-gold" />
                <span className="text-sm">500+ Verified Vendors</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-ivory/40 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gold" fill="currentColor" />
                <span className="text-sm">1,200+ Happy Couples</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-ivory/40 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-sm">All 7 Wedding Events</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Journey Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-beige to-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-4 border border-gold/20">
              <Heart className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold">Seven Blessed Events</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4 text-green-deep">Your Wedding Journey</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Seven beautiful stages of celebration, from the first proposal to the blessed Walima feast</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {weddingStages.map((stage, index) => (
              <div
                key={index}
                className={`relative bg-card rounded-2xl p-5 border-2 ${stage.color} hover:shadow-lg transition-all group cursor-pointer text-center`}
              >
                {index < weddingStages.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-gold/30 z-10" />
                )}
                <div className="text-3xl mb-3">{stage.icon}</div>
                <div className="text-xs text-muted-foreground mb-1 font-medium">{stage.number}</div>
                <h3 className="text-green-deep mb-1">{stage.title}</h3>
                <p className="text-xs text-muted-foreground">{stage.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/planner" className="inline-flex items-center gap-2 bg-green-deep hover:bg-green-soft text-ivory px-8 py-4 rounded-xl transition-all shadow-lg">
              Plan All Your Events
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-4 border border-gold/20">
              <Grid className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold">Complete Wedding Services</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4 text-green-deep">Explore All Services</h2>
            <p className="text-muted-foreground text-lg">Everything you need from A to Z for your perfect wedding</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group bg-card hover:shadow-xl transition-all rounded-2xl p-5 border border-border hover:border-gold cursor-pointer text-center"
              >
                <div className={`bg-gradient-to-br ${category.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto shadow-sm`}>
                  {category.icon}
                </div>
                <h3 className="text-sm text-foreground leading-snug">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-20 px-4 bg-beige">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-4 border border-gold/20">
                <BadgeCheck className="w-4 h-4 text-gold" />
                <span className="text-sm text-gold">Top Rated</span>
              </div>
              <h2 className="text-3xl md:text-5xl mb-2 text-green-deep">Featured Vendors</h2>
              <p className="text-muted-foreground">Trusted by hundreds of couples across Sri Lanka</p>
            </div>
            <Link to="/services/all" className="hidden md:flex items-center gap-2 text-gold hover:text-green-deep transition-colors border border-gold px-5 py-2.5 rounded-xl hover:bg-gold/10">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredVendors.map((vendor, index) => (
              <Link key={index} to="/service/1" className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all hover:border-gold/30">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-deep/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-xs px-3 py-1.5 rounded-full font-medium text-green-deep">
                      {vendor.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                      vendor.availability === 'Available'
                        ? 'bg-green-500 text-white'
                        : 'bg-amber-500 text-white'
                    }`}>
                      {vendor.availability}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1">
                    <BadgeCheck className="w-5 h-5 text-gold" />
                    <span className="text-white text-xs">Verified Vendor</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="font-medium text-green-deep">{vendor.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>
                  </div>
                  <h3 className="text-lg mb-2 text-green-deep group-hover:text-gold transition-colors">{vendor.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    {vendor.location}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground">Starting at</div>
                      <span className="font-medium text-gold text-lg">{vendor.price}</span>
                    </div>
                    <span className="bg-gold/10 text-gold text-sm px-4 py-2 rounded-xl hover:bg-gold hover:text-white transition-all">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/services/all" className="inline-flex items-center gap-2 border border-gold text-gold px-6 py-3 rounded-xl hover:bg-gold/10 transition-all">
              View All Vendors <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Smart Recommendations Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full mb-6 border border-gold/20">
                <Bot className="w-4 h-4 text-gold" />
                <span className="text-sm text-gold">AI-Powered Planning</span>
              </div>
              <h2 className="text-3xl md:text-5xl mb-6 text-green-deep leading-tight">
                Smart Recommendations <br />Just for You
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our AI wedding assistant analyzes your budget, dates, and preferences to suggest the perfect vendors, themes, and timeline — specifically for Sri Lankan Muslim weddings.
              </p>
              <div className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className={`flex items-start gap-4 p-4 rounded-xl border ${suggestion.color}`}>
                    <div className="flex-shrink-0 mt-0.5">{suggestion.icon}</div>
                    <div>
                      <div className="font-medium mb-1">{suggestion.title}</div>
                      <div className="text-sm opacity-80">{suggestion.text}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/planner" className="inline-flex items-center gap-2 mt-8 bg-green-deep hover:bg-green-soft text-ivory px-8 py-4 rounded-xl transition-all shadow-lg">
                <Bot className="w-5 h-5" />
                Get AI Recommendations
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-deep to-green-soft rounded-3xl p-8 text-ivory relative overflow-hidden">
                <IslamicPattern className="absolute inset-0 opacity-10 text-white" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Wedding AI Assistant</div>
                      <div className="text-xs text-ivory/60">Online • Ready to help</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4">
                      <p className="text-sm text-ivory/90">Assalamu Alaikum! 🌙 I'm your personal wedding planner. When is your Nikah date?</p>
                    </div>
                    <div className="bg-gold/30 backdrop-blur-sm rounded-2xl rounded-tr-none p-4 ml-8">
                      <p className="text-sm text-ivory">July 15, 2026 in Colombo</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4">
                      <p className="text-sm text-ivory/90">Perfect! I suggest booking your hall by January. Here are 3 premium venues available on that date... ✨</p>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask me anything about your wedding..."
                      className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-sm text-ivory placeholder-ivory/40 border-0 outline-none"
                    />
                    <button className="bg-gold hover:bg-gold/90 px-4 py-3 rounded-xl transition-all">
                      <ChevronRight className="w-5 h-5 text-green-deep" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-deep to-green-soft text-ivory relative overflow-hidden">
        <IslamicPattern className="absolute inset-0 opacity-5 text-white" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full mb-4 border border-gold/30">
              <Heart className="w-4 h-4 text-gold" />
              <span className="text-sm text-gold-light">Love Stories</span>
            </div>
            <h2 className="text-3xl md:text-5xl mb-4">Couples Love Us</h2>
            <p className="text-ivory/80 text-lg">Read what our happy couples have to say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-lg mb-6 text-ivory/90 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-green-deep font-medium text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-xs text-ivory/60">{testimonial.event}</div>
                    </div>
                  </div>
                  <span className="text-sm text-ivory/50">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-beige relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold to-amber-600 rounded-full mb-8 shadow-xl">
            <Heart className="w-10 h-10 text-white" fill="white" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6 text-green-deep">Start Planning Today</h2>
          <p className="text-xl mb-10 text-muted-foreground max-w-2xl mx-auto">
            Join 1,200+ Sri Lankan Muslim couples who planned their perfect wedding with us. Barakah in every booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/planner" className="bg-green-deep hover:bg-green-soft text-ivory px-10 py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Create Wedding Plan
            </Link>
            <Link to="/services/all" className="bg-white hover:bg-gold/5 text-green-deep px-10 py-4 rounded-xl transition-all border-2 border-green-deep flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Browse Vendors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-deep text-ivory py-16 px-4 relative overflow-hidden">
        <IslamicPattern className="absolute inset-0 opacity-5 text-white" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-gold to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 text-white" fill="white" />
                </div>
                <div>
                  <div className="text-xl font-medium text-gold">WeddingSL</div>
                  <div className="text-xs text-ivory/50">Muslim Wedding Platform</div>
                </div>
              </div>
              <p className="text-ivory/70 text-sm leading-relaxed max-w-xs">
                Sri Lanka's most trusted platform for planning the perfect Muslim wedding, from Proposal to Walima.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gold/30 rounded-xl flex items-center justify-center transition-all text-sm">f</a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gold/30 rounded-xl flex items-center justify-center transition-all text-sm">ig</a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-gold/30 rounded-xl flex items-center justify-center transition-all text-sm">wa</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-gold">Services</h4>
              <ul className="space-y-2.5 text-sm text-ivory/70">
                <li><a href="#" className="hover:text-gold transition-colors">Wedding Halls</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Catering</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Photography</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Bridal Services</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Mehndi Artists</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-gold">Planning</h4>
              <ul className="space-y-2.5 text-sm text-ivory/70">
                <li><a href="#" className="hover:text-gold transition-colors">My Planner</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Gift Exchange</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Mehndi Night</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Budget Tracker</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Nikah Booking</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-gold">Company</h4>
              <ul className="space-y-2.5 text-sm text-ivory/70">
                <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Become a Vendor</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ivory/50">
            <p>&copy; 2026 WeddingSL. All rights reserved. Built with ❤️ for Sri Lankan Muslim Weddings.</p>
            <p>May Allah bless every union 🤲</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Grid({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}
