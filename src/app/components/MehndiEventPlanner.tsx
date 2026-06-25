import { Link } from 'react-router';
import {
  Flower2, Music, Palette, Calendar, Users, Star, Heart,
  UtensilsCrossed, Sofa, Camera, Check, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import Navigation from './Navigation';
import IslamicPattern from './IslamicPattern';

export default function MehndiEventPlanner() {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [checklist, setChecklist] = useState([
    { task: 'Book Mehndi artist', completed: false },
    { task: 'Finalize decoration theme', completed: false },
    { task: 'Send invitations to guests', completed: false },
    { task: 'Arrange music/entertainment', completed: false },
    { task: 'Plan refreshments menu', completed: false },
    { task: 'Book photographer', completed: false },
    { task: 'Arrange seating layout', completed: false },
    { task: 'Prepare gift return boxes', completed: false },
    { task: 'Set up dance/performance area', completed: false },
    { task: 'Book food stall vendors', completed: false },
  ]);

  const decorThemes = [
    {
      name: 'Traditional Green & Gold',
      description: 'Classic Sri Lankan Mehndi with marigold garlands, green drapes, and gold lanterns',
      price: 95000,
      image: 'https://images.unsplash.com/photo-1640745682470-8321de74eb05?w=600',
      features: ['Marigold stage backdrop', 'Gold lantern canopy', 'Green draping', 'Floral arch', 'Traditional seating'],
      color: 'from-green-600 to-amber-500',
    },
    {
      name: 'Floral Mehndi Garden',
      description: 'Romantic garden theme with fresh flowers, fairy lights, and pastel florals',
      price: 115000,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
      features: ['Flower wall backdrop', 'Fairy lights canopy', 'Floral archway', 'Lawn furniture', 'String lights'],
      color: 'from-pink-500 to-rose-400',
    },
    {
      name: 'Modern Luxury Mehndi',
      description: 'Contemporary glamour with crystal chandeliers, gold accents, and plush seating',
      price: 145000,
      image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=600',
      features: ['Crystal chandelier setup', 'Velvet seating', 'Gold geometric decor', 'LED uplighting', 'Photo booth'],
      color: 'from-purple-600 to-indigo-700',
    },
    {
      name: 'Royal Mughal Style',
      description: 'Opulent Mughal-inspired setting with arches, jewel tones, and intricate motifs',
      price: 185000,
      image: 'https://images.unsplash.com/photo-1745573673786-d462f0ac2690?w=600',
      features: ['Mughal arched backdrop', 'Jewel-toned draping', 'Ornate pillars', 'Royal seating cushions', 'Persian carpet'],
      color: 'from-amber-600 to-orange-700',
    },
  ];

  const mehndiArtists = [
    {
      name: 'Zara Mehndi Designs',
      rating: 5.0,
      reviews: 215,
      price: 25000,
      specialty: 'Traditional & Contemporary Fusion',
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1640745682470-8321de74eb05?w=400',
      styles: ['Bridal Mehndi', 'Arabic Style', 'Indian Bridal', 'Minimalist'],
    },
    {
      name: 'Artistic Henna Creations',
      rating: 4.9,
      reviews: 187,
      price: 30000,
      specialty: 'Bridal Specialization & Guest Mehndi',
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
      styles: ['Bridal Full Hands', 'Floral Designs', 'Mughal Patterns', 'Guest Package'],
    },
    {
      name: 'Henna by Mariam',
      rating: 4.8,
      reviews: 143,
      price: 20000,
      specialty: 'Arabic & Moroccan Styles',
      experience: '6 years',
      image: 'https://images.unsplash.com/photo-1610202308858-d729ec4a3582?w=400',
      styles: ['Arabic Patterns', 'Geometric', 'Simple Elegant', 'Kids Mehndi'],
    },
  ];

  const musicOptions = [
    { name: 'DJ Package', description: 'Professional DJ with premium sound system & lighting', price: 55000, icon: '🎧' },
    { name: 'Live Singer', description: 'Traditional Urdu & Sinhala wedding songs with harmonium', price: 75000, icon: '🎤' },
    { name: 'Dhol Players', description: 'Traditional dhol performance for ceremonial moments', price: 40000, icon: '🥁' },
    { name: 'Tabla & Harmonium Duo', description: 'Classical Indian music for intimate ceremonies', price: 45000, icon: '🎵' },
  ];

  const seatingOptions = [
    { name: 'Traditional Floor Seating', description: 'Cushion & bolster seating on carpets', price: 25000, icon: '🛋️' },
    { name: 'Chair & Table Setup', description: 'Elegant round tables with decorated chairs', price: 35000, icon: '🪑' },
    { name: 'Mixed Setup', description: 'Combination of floor seating & chairs for families', price: 45000, icon: '✨' },
  ];

  const foodStalls = [
    { name: 'Chaat & Golgappa Corner', price: 35000, icon: '🍛' },
    { name: 'Biryani & Kebab Station', price: 55000, icon: '🍖' },
    { name: 'Dessert & Sweets Counter', price: 40000, icon: '🍮' },
    { name: 'Fresh Juice Bar', price: 25000, icon: '🥤' },
    { name: 'Ice Cream Live Station', price: 30000, icon: '🍦' },
  ];

  const completedCount = checklist.filter((c) => c.completed).length;
  const progressPct = Math.round((completedCount / checklist.length) * 100);

  const toggleCheck = (index: number) => {
    setChecklist((prev) =>
      prev.map((item, i) => i === index ? { ...item, completed: !item.completed } : item)
    );
  };

  return (
    <div className="min-h-screen bg-ivory pb-20 md:pb-0">
      <Navigation />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-green-deep via-green-soft to-green-deep text-ivory rounded-2xl p-8 mb-8 overflow-hidden">
            <IslamicPattern className="absolute inset-0 opacity-10 text-white" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center">
                  <Flower2 className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl">Mehndi Night Planner</h1>
                  <p className="text-ivory/70 text-sm">Create a magical, unforgettable Mehndi celebration</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-xs text-ivory/60">Event Date</div>
                    <div className="font-medium">July 10, 2026</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-xs text-ivory/60">Expected Guests</div>
                    <div className="font-medium">80–100 People</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 flex items-center gap-3">
                  <Check className="w-6 h-6 text-gold" />
                  <div>
                    <div className="text-xs text-ivory/60">Planning Progress</div>
                    <div className="font-medium">{progressPct}% Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decoration Themes */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-green-deep flex items-center gap-3">
                <Palette className="w-6 h-6 text-gold" />
                Choose Decoration Theme
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {decorThemes.map((theme, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedTheme(index)}
                  className={`group bg-card rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedTheme === index ? 'border-gold shadow-xl' : 'border-border hover:border-gold/40'
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${theme.color} opacity-30`} />
                    {selectedTheme === index && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <button className="absolute top-3 left-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all">
                      <Heart className="w-4 h-4 text-green-deep" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-green-deep mb-1">{theme.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{theme.description}</p>
                    <ul className="space-y-1 mb-4">
                      {theme.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-xs text-foreground">
                          <div className="w-1 h-1 bg-gold rounded-full" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-gold font-medium text-sm">LKR {theme.price.toLocaleString()}</span>
                      <Link
                        to="/booking/decor"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs px-4 py-2 bg-green-deep hover:bg-green-soft text-white rounded-xl transition-all"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Mehndi Artists */}
              <div>
                <h2 className="text-2xl mb-6 text-green-deep flex items-center gap-3">
                  <Flower2 className="w-6 h-6 text-gold" />
                  Mehndi Artists
                </h2>
                <div className="space-y-4">
                  {mehndiArtists.map((artist, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-5 bg-card rounded-2xl p-6 border border-border hover:border-gold/30 hover:shadow-md transition-all">
                      <div className="w-full md:w-40 aspect-square rounded-2xl overflow-hidden flex-shrink-0">
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                          <div>
                            <h3 className="text-lg text-green-deep">{artist.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="w-4 h-4 fill-gold text-gold" />
                              <span className="text-sm font-medium">{artist.rating}</span>
                              <span className="text-xs text-muted-foreground">({artist.reviews} reviews)</span>
                              <span className="text-xs text-muted-foreground">• {artist.experience} exp.</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{artist.specialty}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {artist.styles.map((style, si) => (
                            <span key={si} className="text-xs bg-beige text-muted-foreground px-2.5 py-1 rounded-full">{style}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div>
                            <div className="text-xs text-muted-foreground">Starting at</div>
                            <div className="text-gold font-medium">LKR {artist.price.toLocaleString()}</div>
                          </div>
                          <Link
                            to={`/booking/${index + 1}`}
                            className="px-6 py-2.5 bg-gold hover:bg-gold/90 text-white rounded-xl transition-all text-sm shadow-sm"
                          >
                            Book Artist
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seating Arrangements */}
              <div>
                <h2 className="text-2xl mb-6 text-green-deep flex items-center gap-3">
                  <Sofa className="w-6 h-6 text-gold" />
                  Seating Arrangements
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {seatingOptions.map((option, index) => (
                    <div key={index} className="bg-card rounded-2xl p-5 border border-border hover:border-gold/30 transition-all">
                      <div className="text-3xl mb-3">{option.icon}</div>
                      <h3 className="text-green-deep mb-2">{option.name}</h3>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{option.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-gold font-medium text-sm">LKR {option.price.toLocaleString()}</span>
                        <button className="text-xs px-4 py-2 bg-beige hover:bg-gold/10 text-green-deep rounded-xl transition-all">Select</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Music & Entertainment */}
              <div>
                <h2 className="text-2xl mb-6 text-green-deep flex items-center gap-3">
                  <Music className="w-6 h-6 text-gold" />
                  Music & Entertainment
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {musicOptions.map((option, index) => (
                    <div key={index} className="bg-card rounded-2xl p-5 border border-border hover:border-gold/30 transition-all">
                      <div className="text-3xl mb-3">{option.icon}</div>
                      <h3 className="text-green-deep mb-2">{option.name}</h3>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{option.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <span className="text-gold font-medium text-sm">LKR {option.price.toLocaleString()}</span>
                        <button className="text-xs px-4 py-2 bg-beige hover:bg-gold/10 rounded-xl transition-all">Add</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Food Stalls */}
              <div>
                <h2 className="text-2xl mb-6 text-green-deep flex items-center gap-3">
                  <UtensilsCrossed className="w-6 h-6 text-gold" />
                  Food Stalls & Counters
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {foodStalls.map((stall, index) => (
                    <label key={index} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl cursor-pointer hover:border-gold/30 hover:bg-gold/5 transition-all">
                      <input type="checkbox" className="w-5 h-5 accent-gold rounded" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span>{stall.icon}</span>
                          <span className="text-sm text-foreground">{stall.name}</span>
                        </div>
                        <span className="text-xs text-gold">LKR {stall.price.toLocaleString()}</span>
                      </div>
                    </label>
                  ))}
                </div>
                <Link to="/services/catering" className="inline-flex items-center gap-2 mt-4 text-sm text-gold hover:text-green-deep transition-colors">
                  Browse Full Catering Options <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Photography for Mehndi */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg text-purple-900 mb-2">Mehndi Photography Package</h3>
                    <p className="text-sm text-purple-700 mb-4">Capture the magic of your Mehndi night with our specialized event photography packages including candid shots, portraits, and highlight reels.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Candid Photography', 'Mehndi Close-ups', 'Family Portraits', 'Highlight Video', 'Same-day Reels'].map((f, i) => (
                        <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">{f}</span>
                      ))}
                    </div>
                    <Link to="/services/photography" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl transition-all text-sm">
                      View Photography Packages <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Event Checklist */}
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-20">
                <h2 className="text-lg mb-4 text-green-deep flex items-center justify-between">
                  <span>Event Checklist</span>
                  <span className="text-sm text-muted-foreground">{completedCount}/{checklist.length}</span>
                </h2>
                <div className="space-y-2.5">
                  {checklist.map((item, index) => (
                    <label key={index} onClick={() => toggleCheck(index)} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-beige rounded-xl transition-colors">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        readOnly
                        className="w-4 h-4 rounded accent-gold"
                      />
                      <span className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {item.task}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-gold">{progressPct}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gold rounded-full h-2 transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
                <button className="w-full mt-4 py-2.5 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-gold hover:text-gold transition-colors text-sm">
                  + Add Task
                </button>
              </div>

              {/* Selected Theme Card */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-lg mb-4 text-green-deep">Selected Theme</h2>
                <div className="rounded-xl overflow-hidden mb-4">
                  <img src={decorThemes[selectedTheme].image} alt={decorThemes[selectedTheme].name} className="w-full h-36 object-cover" />
                </div>
                <h3 className="font-medium text-green-deep mb-2">{decorThemes[selectedTheme].name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{decorThemes[selectedTheme].description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-gold font-medium">LKR {decorThemes[selectedTheme].price.toLocaleString()}</span>
                  <Link to="/booking/decor" className="text-xs px-4 py-2 bg-gold hover:bg-gold/90 text-white rounded-xl transition-all">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
