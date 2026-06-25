import { Link } from 'react-router';
import {
  Gift, Plus, Trash2, Calendar, Truck, CheckCircle2, Circle,
  Sparkles, Palette, Star, Package, ChevronRight, ShoppingBag
} from 'lucide-react';
import { useState } from 'react';
import Navigation from './Navigation';
import IslamicPattern from './IslamicPattern';

type GiftItem = { id: number; name: string; completed: boolean; cost: number; quantity: number };
type GiftCategory = { name: string; icon: string; items: GiftItem[] };

export default function GiftExchangePlanner() {
  const [activeTheme, setActiveTheme] = useState(0);
  const [activeColor, setActiveColor] = useState('Gold & White');

  const [giftCategories, setGiftCategories] = useState<GiftCategory[]>([
    {
      name: 'Bridal Attire',
      icon: '👗',
      items: [
        { id: 1, name: 'Wedding Saree (Silk)', completed: true, cost: 85000, quantity: 1 },
        { id: 2, name: 'Gold Jewelry Set (Necklace + Bangles + Earrings)', completed: true, cost: 180000, quantity: 1 },
        { id: 3, name: 'Designer Handbag', completed: false, cost: 35000, quantity: 1 },
        { id: 4, name: 'Bridal Shoes', completed: false, cost: 18000, quantity: 1 },
      ],
    },
    {
      name: 'Groom Attire',
      icon: '👔',
      items: [
        { id: 5, name: 'Premium Sherwani', completed: true, cost: 75000, quantity: 1 },
        { id: 6, name: 'Luxury Watch', completed: false, cost: 65000, quantity: 1 },
        { id: 7, name: 'Italian Dress Shoes', completed: true, cost: 22000, quantity: 1 },
        { id: 8, name: 'Tie & Pocket Square Set', completed: false, cost: 8000, quantity: 1 },
      ],
    },
    {
      name: 'Perfumes & Cosmetics',
      icon: '💐',
      items: [
        { id: 9, name: 'Designer Perfumes (Set of 5)', completed: true, cost: 55000, quantity: 1 },
        { id: 10, name: 'Makeup Luxury Kit', completed: false, cost: 35000, quantity: 1 },
        { id: 11, name: 'Oud Collection Set', completed: true, cost: 28000, quantity: 1 },
        { id: 12, name: 'Skincare Gift Set', completed: false, cost: 18000, quantity: 1 },
      ],
    },
    {
      name: 'Sweets & Treats',
      icon: '🍬',
      items: [
        { id: 13, name: 'Traditional Sri Lankan Sweets Box', completed: true, cost: 15000, quantity: 3 },
        { id: 14, name: 'Belgian Chocolate Assortment', completed: true, cost: 12000, quantity: 2 },
        { id: 15, name: 'Premium Dry Fruits Collection', completed: false, cost: 22000, quantity: 2 },
        { id: 16, name: 'Medjool Dates Box', completed: false, cost: 8000, quantity: 5 },
      ],
    },
    {
      name: 'Fruits & Fresh Items',
      icon: '🍎',
      items: [
        { id: 17, name: 'Premium Exotic Fruit Basket', completed: false, cost: 12000, quantity: 2 },
        { id: 18, name: 'Fresh Flower Bouquet', completed: false, cost: 5000, quantity: 5 },
      ],
    },
    {
      name: 'Home & Living',
      icon: '🏠',
      items: [
        { id: 19, name: 'Luxury Bedding Set', completed: false, cost: 55000, quantity: 1 },
        { id: 20, name: 'Prayer Mat Set (His & Hers)', completed: true, cost: 22000, quantity: 1 },
        { id: 21, name: 'Decorative Islamic Art Pieces', completed: false, cost: 28000, quantity: 2 },
        { id: 22, name: 'Crystal Dinner Set', completed: false, cost: 45000, quantity: 1 },
      ],
    },
    {
      name: 'Accessories',
      icon: '👜',
      items: [
        { id: 23, name: 'Silk Scarves (Set of 3)', completed: true, cost: 18000, quantity: 1 },
        { id: 24, name: 'Sunglasses (Designer)', completed: false, cost: 25000, quantity: 1 },
        { id: 25, name: 'Wallet (Leather)', completed: false, cost: 12000, quantity: 1 },
      ],
    },
  ]);

  const trayThemes = [
    {
      name: 'Traditional Gold',
      description: 'Classic gold and ivory theme with ornate decor',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600',
      features: ['Gold foil wrapping', 'Satin ribbons', 'Ornate tray stand', 'Floral accents'],
    },
    {
      name: 'Royal Emerald',
      description: 'Deep green with gold accents, Islamic motifs',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600',
      features: ['Emerald velvet boxes', 'Gold calligraphy tags', 'Pearl embellishments', 'Luxury ribbons'],
    },
    {
      name: 'Modern Luxury',
      description: 'Contemporary black and gold premium finish',
      price: 95000,
      image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600',
      features: ['Matte black boxes', 'Gold hardware', 'Minimalist design', 'Personalized cards'],
    },
    {
      name: 'Floral Garden',
      description: 'Romantic pink and white with fresh flowers',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
      features: ['Floral wrapping paper', 'Rose accents', 'Pastel ribbons', 'Dried flower decor'],
    },
  ];

  const colorThemes = [
    { name: 'Gold & White', colors: ['#C9A961', '#FFFFFF'] },
    { name: 'Green & Gold', colors: ['#1B4D3E', '#C9A961'] },
    { name: 'Rose & Ivory', colors: ['#F4A0A0', '#FDFBF7'] },
    { name: 'Midnight Blue', colors: ['#1e3a5f', '#C9A961'] },
    { name: 'Burgundy & Gold', colors: ['#800020', '#C9A961'] },
  ];

  const totalItems = giftCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedItems = giftCategories.reduce(
    (sum, cat) => sum + cat.items.filter((item) => item.completed).length, 0
  );
  const totalCost = giftCategories.reduce(
    (sum, cat) => sum + cat.items.reduce((s, item) => s + item.cost * item.quantity, 0), 0
  );
  const progress = Math.round((completedItems / totalItems) * 100);

  const toggleItem = (catIndex: number, itemId: number) => {
    setGiftCategories((prev) =>
      prev.map((cat, ci) =>
        ci === catIndex
          ? { ...cat, items: cat.items.map((item) => item.id === itemId ? { ...item, completed: !item.completed } : item) }
          : cat
      )
    );
  };

  return (
    <div className="min-h-screen bg-ivory pb-20 md:pb-0">
      <Navigation />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-gold via-amber-500 to-gold text-white rounded-2xl p-8 mb-8 overflow-hidden">
            <IslamicPattern className="absolute inset-0 opacity-15 text-white" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Gift className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl">Gift Exchange Planner</h1>
                  <p className="text-white/80 text-sm">Seer / Jahez Ceremony Organizer</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-light mb-1">{completedItems}/{totalItems}</div>
                  <div className="text-sm text-white/80">Items Prepared</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-light mb-1">{progress}%</div>
                  <div className="text-sm text-white/80">Complete</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-light mb-1">LKR {(totalCost / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-white/80">Total Value</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-3xl font-light mb-1">{giftCategories.length}</div>
                  <div className="text-sm text-white/80">Categories</div>
                </div>
              </div>
              <div className="mt-4 w-full bg-white/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Color Coordination */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-xl mb-4 text-green-deep flex items-center gap-2">
                  <Palette className="w-5 h-5 text-gold" />
                  Color Coordination Theme
                </h2>
                <div className="flex gap-3 flex-wrap">
                  {colorThemes.map((theme, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveColor(theme.name)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all ${
                        activeColor === theme.name ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/40'
                      }`}
                    >
                      <div className="flex gap-1">
                        {theme.colors.map((color, ci) => (
                          <div key={ci} className="w-4 h-4 rounded-full border border-white/50 shadow-sm" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <span className="text-sm">{theme.name}</span>
                    </button>
                  ))}
                </div>
                {activeColor && (
                  <div className="mt-3 p-3 bg-beige rounded-xl text-sm text-muted-foreground">
                    ✨ Selected theme: <span className="text-gold font-medium">{activeColor}</span> — Your tray decorations will be coordinated in this color palette.
                  </div>
                )}
              </div>

              {/* Gift Categories */}
              {giftCategories.map((category, catIndex) => (
                <div key={catIndex} className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg text-green-deep flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      {category.name}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground bg-beige px-3 py-1 rounded-xl">
                        {category.items.filter((i) => i.completed).length}/{category.items.length}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                          item.completed ? 'bg-gold/5 border-gold/20' : 'bg-white border-border hover:border-gold/30'
                        }`}
                        onClick={() => toggleItem(catIndex, item.id)}
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            {item.name}
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</div>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-medium text-gold text-sm">LKR {(item.cost * item.quantity).toLocaleString()}</div>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          className="p-1.5 hover:bg-red-50 rounded-lg text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-3 py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    Add to {category.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tray Decoration Themes */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-lg mb-4 text-green-deep flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  Tray Decoration Themes
                </h2>
                <div className="space-y-4">
                  {trayThemes.map((theme, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveTheme(index)}
                      className={`border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${
                        activeTheme === index ? 'border-gold shadow-md' : 'border-border hover:border-gold/40'
                      }`}
                    >
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={theme.image}
                          alt={theme.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        {activeTheme === index && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground text-sm">{theme.name}</span>
                          <span className="text-gold font-medium text-sm">LKR {theme.price.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{theme.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {theme.features.map((f, i) => (
                            <span key={i} className="text-xs bg-beige text-muted-foreground px-2 py-0.5 rounded-full">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/services/gifts"
                  className="block mt-4 text-center py-3 bg-gold hover:bg-gold/90 text-white rounded-xl transition-all text-sm shadow-sm"
                >
                  Book Decorator
                </Link>
              </div>

              {/* Cost Summary */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-lg mb-4 text-green-deep flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-gold" />
                  Cost Summary
                </h2>
                <div className="space-y-3 mb-4">
                  {giftCategories.map((cat, i) => {
                    const catTotal = cat.items.reduce((s, item) => s + item.cost * item.quantity, 0);
                    return (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <span>{cat.icon}</span>{cat.name}
                        </span>
                        <span className="font-medium">LKR {catTotal.toLocaleString()}</span>
                      </div>
                    );
                  })}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-medium text-green-deep">Total Value</span>
                    <span className="font-medium text-gold">LKR {totalCost.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-beige rounded-xl p-3 text-xs text-muted-foreground">
                  💡 Add tray decoration cost: LKR {trayThemes[activeTheme].price.toLocaleString()}
                </div>
              </div>

              {/* Delivery Schedule */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-lg mb-4 text-green-deep flex items-center gap-2">
                  <Truck className="w-5 h-5 text-gold" />
                  Delivery Schedule
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Ceremony Date</label>
                    <div className="flex items-center gap-2 px-4 py-3 bg-beige rounded-xl">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <input type="date" className="flex-1 bg-transparent border-0 outline-none text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Delivery Address</label>
                    <textarea
                      rows={3}
                      placeholder="Enter delivery address..."
                      className="w-full px-4 py-3 bg-beige border-0 rounded-xl resize-none text-sm"
                    />
                  </div>
                  <button className="w-full py-3 bg-green-deep hover:bg-green-soft text-white rounded-xl transition-all text-sm shadow-sm">
                    Schedule Delivery
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
