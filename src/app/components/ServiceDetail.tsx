import { Link } from 'react-router';
import {
  Star, MapPin, Calendar, Users, Check, Heart, Share2,
  ChevronLeft, ChevronRight, BadgeCheck, ChevronDown,
  Phone, MessageCircle, Camera, Award
} from 'lucide-react';
import Navigation from './Navigation';
import { useState } from 'react';

export default function ServiceDetail() {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('July 2026');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const images = [
    'https://images.unsplash.com/photo-1775918427144-51f0bf53f8c4?w=1200',
    'https://images.unsplash.com/photo-1745573673786-d462f0ac2690?w=1200',
    'https://images.unsplash.com/photo-1611106211090-8f3c79eb8552?w=1200',
    'https://images.unsplash.com/photo-1610202308858-d729ec4a3582?w=1200',
  ];

  const packages = [
    {
      name: 'Essential',
      price: 250000,
      features: [
        'Hall rental for 6 hours',
        'Basic decoration',
        'Seating for 200 guests',
        'Basic sound system',
        'Air conditioning',
      ],
    },
    {
      name: 'Premium',
      price: 350000,
      popular: true,
      features: [
        'Hall rental for 8 hours',
        'Premium decoration with florals',
        'Seating for 300 guests',
        'Professional sound & lighting',
        'Air conditioning',
        'Stage decoration',
        'Red carpet entrance',
      ],
    },
    {
      name: 'Luxury',
      price: 500000,
      features: [
        'Hall rental for 10 hours',
        'Luxury decoration & florals',
        'Seating for 400 guests',
        'Premium sound, lighting & DJ',
        'Grand stage with backdrop',
        'VIP entrance with carpet',
        'Dedicated event coordinator',
        'Complimentary valet parking',
      ],
    },
  ];

  const reviews = [
    { name: 'Amina Rahman', rating: 5, date: 'March 2026', text: 'Absolutely stunning venue! The team was professional and accommodating. Our Nikah ceremony was perfect beyond words.', verified: true, event: 'Nikah Ceremony' },
    { name: 'Rizwan Ahmed', rating: 5, date: 'February 2026', text: 'The premium package exceeded our expectations. Beautiful decoration and excellent service throughout our wedding reception.', verified: true, event: 'Wedding Reception' },
    { name: 'Fatima Hassan', rating: 4, date: 'January 2026', text: 'Great hall with wonderful ambiance. Minor delay in setup but overall an excellent experience. Highly recommended!', verified: true, event: 'Walima' },
    { name: 'Hassan Ali', rating: 5, date: 'December 2025', text: 'Perfect venue for our daughter\'s Nikah. The Islamic-inspired decor was magnificent. Staff were courteous and helpful throughout.', verified: false, event: 'Nikah & Reception' },
  ];

  const faqs = [
    { q: 'What events can be hosted at this venue?', a: 'We specialize in all Muslim wedding events including Nikah ceremonies, Walima receptions, wedding receptions, and engagement parties. Our team is experienced with all Sri Lankan Muslim wedding traditions.' },
    { q: 'Is halal catering available?', a: 'Yes, all our catering partners are 100% halal certified. We work exclusively with halal food providers to ensure compliance with Islamic dietary requirements.' },
    { q: 'Can we arrange our own decorators?', a: 'Yes, external decorators are welcome with prior approval. We can also recommend our trusted decoration partners who specialize in Islamic wedding themes including Royal Gold, Emerald Green, and Arabic Royal styles.' },
    { q: 'What is the advance booking requirement?', a: 'We recommend booking at least 6 months in advance for peak season (June-August). A 30% deposit is required to confirm your booking.' },
    { q: 'Is prayer space available for guests?', a: 'Yes, we have a dedicated prayer room (musallah) for both male and female guests with ablution facilities, available throughout your event.' },
  ];

  const similarVenues = [
    { name: 'Palm Gardens Banquet', location: 'Bambalapitiya', rating: 4.8, price: 320000, image: 'https://images.unsplash.com/photo-1745573673786-d462f0ac2690?w=400' },
    { name: 'Emerald Hall Events', location: 'Colombo 05', rating: 4.7, price: 280000, image: 'https://images.unsplash.com/photo-1775918427144-51f0bf53f8c4?w=400' },
  ];

  const stats = [
    { label: 'Rating', value: '4.9', icon: <Star className="w-5 h-5" /> },
    { label: 'Reviews', value: '156', icon: <Users className="w-5 h-5" /> },
    { label: 'Capacity', value: '400', icon: <Users className="w-5 h-5" /> },
    { label: 'Events Done', value: '320+', icon: <Calendar className="w-5 h-5" /> },
  ];

  // Calendar days for July 2026
  const availableDates = [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 18, 19, 20, 22, 23, 26, 27, 28, 30];
  const bookedDates = [4, 7, 11, 14, 15, 16, 17, 21, 24, 25, 29, 31];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-ivory pb-20 md:pb-0">
      <Navigation />

      <div className="pt-16 pb-16">
        {/* Image Gallery */}
        <div className="relative h-[55vh] bg-green-deep overflow-hidden">
          <img
            src={images[currentImage]}
            alt="Venue"
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-deep/70 to-transparent" />

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-green-deep" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-green-deep" />
          </button>

          {/* Image thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-gold w-6' : 'bg-white/60'}`}
              />
            ))}
          </div>

          <Link
            to="/services/halls"
            className="absolute top-4 left-4 bg-white/90 hover:bg-white px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="absolute top-4 right-4 flex gap-2">
            <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all">
              <Heart className="w-5 h-5 text-green-deep" />
            </button>
            <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all">
              <Share2 className="w-5 h-5 text-green-deep" />
            </button>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5" />
            {currentImage + 1} / {images.length}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl mb-2 text-green-deep">Royal Gardens Banquet Hall</h1>
                    <div className="flex items-center gap-3 text-muted-foreground flex-wrap">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">Colombo 07, Sri Lanka</span>
                      </div>
                      <span className="text-sm">•</span>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-gold" />
                        <span className="text-sm text-gold">Top Rated 2026</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-xl border border-gold/20">
                    <BadgeCheck className="w-5 h-5 text-gold" />
                    <span className="text-sm font-medium text-gold">Verified Vendor</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 mt-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-beige rounded-xl hover:bg-gold/10 transition-colors">
                      <div className="text-gold mb-2 flex justify-center">{stat.icon}</div>
                      <div className="text-xl font-medium text-green-deep mb-0.5">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Contact Actions */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-beige hover:bg-gold/10 py-3 rounded-xl transition-colors text-sm">
                    <Phone className="w-4 h-4 text-gold" />
                    Call Now
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-beige hover:bg-gold/10 py-3 rounded-xl transition-colors text-sm">
                    <MessageCircle className="w-4 h-4 text-gold" />
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl mb-4 text-green-deep">About This Venue</h2>
                <p className="text-foreground leading-relaxed mb-4">
                  Royal Gardens Banquet Hall is one of Colombo's most prestigious wedding venues, offering an elegant and
                  luxurious setting for your special day. Our spacious hall can accommodate up to 400 guests with comfort and style.
                </p>
                <p className="text-foreground leading-relaxed">
                  We specialize in Muslim wedding ceremonies including Nikah, Walima, and reception events. Our experienced
                  team ensures every detail is perfect, from the grand entrance to the final farewell. With premium amenities,
                  beautiful Islamic-inspired decor options, and exceptional service, we make your dream wedding a reality.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    'Prayer room (Musallah)',
                    'Halal catering options',
                    'Separate ladies section',
                    'Ample parking',
                    'Air conditioning',
                    'Bridal suite',
                    'Stage lighting system',
                    'Valet service'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-gold" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Calendar */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-green-deep">Availability Calendar</h2>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-4 py-2 bg-beige border-0 rounded-xl text-sm"
                  >
                    <option>July 2026</option>
                    <option>August 2026</option>
                    <option>September 2026</option>
                  </select>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className="text-center text-xs text-muted-foreground py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {/* Offset for July 2026 (starts on Wednesday) */}
                  {[...Array(3)].map((_, i) => <div key={`empty-${i}`} />)}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const isAvailable = availableDates.includes(day);
                    const isBooked = bookedDates.includes(day);
                    return (
                      <button
                        key={day}
                        className={`aspect-square rounded-xl text-sm transition-all ${
                          isBooked
                            ? 'bg-red-50 text-red-300 cursor-not-allowed line-through'
                            : isAvailable
                            ? 'bg-green-50 text-green-700 hover:bg-gold hover:text-white cursor-pointer border border-green-200'
                            : 'bg-beige text-muted-foreground'
                        }`}
                        disabled={isBooked}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-200 border border-green-400" />
                    <span className="text-xs text-muted-foreground">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-100" />
                    <span className="text-xs text-muted-foreground">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gold" />
                    <span className="text-xs text-muted-foreground">Selected</span>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl mb-6 text-green-deep">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-beige transition-colors"
                      >
                        <span className="text-sm font-medium text-green-deep pr-4">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-gold flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === index && (
                        <div className="px-5 pb-5 border-t border-border">
                          <p className="text-sm text-muted-foreground leading-relaxed pt-4">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-green-deep">Reviews</h2>
                  <div className="flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-xl">
                    <Star className="w-5 h-5 fill-gold text-gold" />
                    <span className="font-medium text-green-deep">4.9</span>
                    <span className="text-sm text-muted-foreground">(156)</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="pb-6 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-start gap-4 mb-3">
                        <div className="w-10 h-10 bg-green-deep rounded-full flex items-center justify-center text-ivory text-sm flex-shrink-0">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-foreground">{review.name}</span>
                            {review.verified && (
                              <div className="flex items-center gap-1 text-xs text-gold">
                                <BadgeCheck className="w-3.5 h-3.5" />
                                Verified
                              </div>
                            )}
                            <span className="text-xs bg-beige text-muted-foreground px-2 py-0.5 rounded-full">{review.event}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-gold hover:text-gold transition-colors text-sm">
                  View All 156 Reviews
                </button>
              </div>

              {/* Similar Recommendations */}
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl mb-6 text-green-deep">Similar Venues</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {similarVenues.map((venue, index) => (
                    <Link key={index} to="/service/2" className="group flex gap-4 p-4 bg-beige rounded-xl hover:bg-gold/10 transition-colors">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm text-green-deep truncate">{venue.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {venue.location}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-gold text-gold" />
                          <span className="text-xs font-medium">{venue.rating}</span>
                        </div>
                        <div className="text-sm text-gold mt-1">LKR {venue.price.toLocaleString()}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Packages & Vendor Profile */}
            <div className="lg:col-span-1 space-y-6">
              {/* Vendor Profile */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg mb-4 text-green-deep">About the Vendor</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-deep to-green-soft rounded-2xl flex items-center justify-center text-ivory text-lg">
                    RG
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Royal Gardens Events</div>
                    <div className="text-xs text-muted-foreground">Est. 2015 • Colombo</div>
                    <div className="flex items-center gap-1 mt-1">
                      <BadgeCheck className="w-3.5 h-3.5 text-gold" />
                      <span className="text-xs text-gold">Premium Verified</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center bg-beige rounded-xl p-3">
                    <div className="font-medium text-green-deep">320+</div>
                    <div className="text-xs text-muted-foreground">Events</div>
                  </div>
                  <div className="text-center bg-beige rounded-xl p-3">
                    <div className="font-medium text-green-deep">98%</div>
                    <div className="text-xs text-muted-foreground">Response</div>
                  </div>
                  <div className="text-center bg-beige rounded-xl p-3">
                    <div className="font-medium text-green-deep">4.9★</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 bg-beige hover:bg-gold/10 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-gold" />
                    Call
                  </button>
                  <button className="flex-1 py-2.5 bg-beige hover:bg-gold/10 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4 text-gold" />
                    Chat
                  </button>
                </div>
              </div>

              {/* Packages */}
              <div className="sticky top-20 space-y-4">
                {packages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`bg-card rounded-2xl p-6 border-2 transition-all ${
                      pkg.popular ? 'border-gold shadow-xl' : 'border-border hover:border-gold/40'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="bg-gold text-white text-xs px-3 py-1.5 rounded-full w-fit mb-3">
                        ⭐ Most Popular
                      </div>
                    )}
                    <h3 className="text-lg mb-2 text-green-deep">{pkg.name}</h3>
                    <div className="mb-4">
                      <span className="text-2xl font-medium text-gold">LKR {pkg.price.toLocaleString()}</span>
                    </div>
                    <ul className="space-y-2.5 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/booking/1"
                      className={`block text-center py-3 rounded-xl transition-all text-sm ${
                        pkg.popular
                          ? 'bg-gold hover:bg-gold/90 text-white shadow-md'
                          : 'bg-beige hover:bg-gold/10 text-green-deep border border-border'
                      }`}
                    >
                      Book This Package
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
