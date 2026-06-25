import { Link, useParams } from 'react-router';
import { Star, MapPin, Filter, Heart, ChevronDown, BadgeCheck, Search, Grid3X3, List, Sliders } from 'lucide-react';
import Navigation from './Navigation';
import { useState } from 'react';

export default function ServiceListing() {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [savedVendors, setSavedVendors] = useState<number[]>([]);

  const vendors = [
    { id: 1, name: 'Royal Gardens Banquet Hall', category: 'Wedding Halls', location: 'Colombo 07', rating: 4.9, reviews: 156, price: 350000, image: 'https://images.unsplash.com/photo-1775918427144-51f0bf53f8c4?w=800', availability: 'Available', verified: true, packages: 3 },
    { id: 2, name: 'Elegant Moments Photography', category: 'Photography', location: 'Dehiwala', rating: 5.0, reviews: 203, price: 85000, image: 'https://images.unsplash.com/photo-1611106211090-8f3c79eb8552?w=800', availability: 'Available', verified: true, packages: 4 },
    { id: 3, name: 'Luxury Bridal Boutique', category: 'Bridal Dressing', location: 'Wellawatte', rating: 4.8, reviews: 127, price: 120000, image: 'https://images.unsplash.com/photo-1610202308858-d729ec4a3582?w=800', availability: 'Limited', verified: true, packages: 3 },
    { id: 4, name: 'Gourmet Catering Services', category: 'Catering', location: 'Mount Lavinia', rating: 4.9, reviews: 189, price: 480000, image: 'https://images.unsplash.com/photo-1776993298437-fab447702a31?w=800', availability: 'Available', verified: true, packages: 4 },
    { id: 5, name: 'Premium Car Rentals', category: 'Luxury Cars', location: 'Colombo 03', rating: 4.7, reviews: 94, price: 45000, image: 'https://images.unsplash.com/photo-1727042451438-d219de847f82?w=800', availability: 'Available', verified: false, packages: 5 },
    { id: 6, name: 'Artistic Mehndi Designs', category: 'Mehndi Artists', location: 'Bambalapitiya', rating: 5.0, reviews: 215, price: 25000, image: 'https://images.unsplash.com/photo-1640745682470-8321de74eb05?w=800', availability: 'Available', verified: true, packages: 2 },
    { id: 7, name: 'Regal Gift Decorators', category: 'Gift Trays', location: 'Dehiwala', rating: 4.8, reviews: 143, price: 65000, image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800', availability: 'Available', verified: true, packages: 3 },
    { id: 8, name: 'Divine Nikah Services', category: 'Religious Services', location: 'Wellawatte', rating: 5.0, reviews: 178, price: 15000, image: 'https://images.unsplash.com/photo-1745573673786-d462f0ac2690?w=800', availability: 'Available', verified: true, packages: 2 },
    { id: 9, name: 'Royal Groom Styling', category: 'Groom Dressing', location: 'Colombo 04', rating: 4.7, reviews: 88, price: 75000, image: 'https://images.unsplash.com/photo-1762709413447-15781dbc08f7?w=800', availability: 'Available', verified: true, packages: 3 },
  ];

  const categoryTabs = [
    { id: 'all', name: 'All Services' },
    { id: 'halls', name: 'Wedding Halls' },
    { id: 'catering', name: 'Catering' },
    { id: 'photography', name: 'Photography' },
    { id: 'bridal', name: 'Bridal' },
    { id: 'mehndi', name: 'Mehndi' },
    { id: 'cars', name: 'Cars' },
    { id: 'religious', name: 'Religious' },
  ];

  const priceRanges = [
    { label: 'Under LKR 50,000', value: '0-50000' },
    { label: 'LKR 50,000 - 150,000', value: '50000-150000' },
    { label: 'LKR 150,000 - 500,000', value: '150000-500000' },
    { label: 'Above LKR 500,000', value: '500000+' },
  ];

  const locations = ['Colombo 07', 'Dehiwala', 'Wellawatte', 'Mount Lavinia', 'Bambalapitiya', 'Colombo 03', 'Colombo 04'];

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSavedVendors((prev) => prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]);
  };

  const getCategoryTitle = () => {
    if (category === 'all') return 'All Services';
    return categoryTabs.find(t => t.id === category)?.name || (category?.replace(/-/g, ' ') || 'Services');
  };

  return (
    <div className="min-h-screen bg-ivory pb-20 md:pb-0">
      <Navigation />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl mb-2 text-green-deep capitalize">{getCategoryTitle()}</h1>
            <p className="text-muted-foreground">{vendors.length} verified vendors available</p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
            {categoryTabs.map((tab) => (
              <Link
                key={tab.id}
                to={`/services/${tab.id}`}
                className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap ${
                  (category === tab.id || (category === undefined && tab.id === 'all'))
                    ? 'bg-green-deep text-ivory shadow-sm'
                    : 'bg-card border border-border text-foreground hover:border-gold hover:text-gold'
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="bg-card rounded-2xl p-4 border border-border mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="w-full pl-10 pr-4 py-2.5 bg-beige border-0 rounded-xl text-sm"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 bg-beige hover:bg-gold/10 rounded-xl transition-colors text-sm"
              >
                <Sliders className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <select className="px-4 py-2.5 bg-beige border-0 rounded-xl text-foreground text-sm">
                <option>Sort: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: Highest First</option>
                <option>Most Reviewed</option>
              </select>

              <select className="px-4 py-2.5 bg-beige border-0 rounded-xl text-foreground text-sm">
                <option>All Locations</option>
                {locations.map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-xl transition-colors ${
                    viewMode === 'grid' ? 'bg-gold text-white' : 'bg-beige text-foreground hover:bg-gold/10'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-xl transition-colors ${
                    viewMode === 'list' ? 'bg-gold text-white' : 'bg-beige text-foreground hover:bg-gold/10'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-border grid md:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-3 text-green-deep">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-border accent-gold" />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-3 text-green-deep">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-border accent-gold" />
                        <div className="flex items-center gap-1">
                          {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                          ))}
                          <span className="text-sm ml-1">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-3 text-green-deep">Availability</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-border accent-gold" />
                      <span className="text-sm">Available Now</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-border accent-gold" />
                      <span className="text-sm">Limited Slots</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-3 text-green-deep">Verification</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-border accent-gold" />
                      <span className="text-sm">Verified Vendors Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-border accent-gold" />
                      <span className="text-sm">With Packages</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Vendor Grid/List */}
          <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {vendors.map((vendor) => (
              <Link
                key={vendor.id}
                to={`/service/${vendor.id}`}
                className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:border-gold/30 transition-all ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`overflow-hidden relative ${viewMode === 'list' ? 'w-56 flex-shrink-0' : 'aspect-[4/3]'}`}>
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-deep/50 via-transparent to-transparent" />

                  {/* Availability badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      vendor.availability === 'Available' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {vendor.availability}
                    </span>
                  </div>

                  {/* Save button */}
                  <button
                    onClick={(e) => toggleSave(vendor.id, e)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${savedVendors.includes(vendor.id) ? 'fill-red-500 text-red-500' : 'text-green-deep'}`} />
                  </button>
                </div>

                <div className="p-5 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="text-sm font-medium text-green-deep">{vendor.rating}</span>
                      <span className="text-xs text-muted-foreground">({vendor.reviews})</span>
                    </div>
                    {vendor.verified && (
                      <div className="flex items-center gap-1 bg-gold/10 px-2 py-1 rounded-full">
                        <BadgeCheck className="w-3.5 h-3.5 text-gold" />
                        <span className="text-xs text-gold">Verified</span>
                      </div>
                    )}
                  </div>

                  <h3 className="mb-2 text-green-deep group-hover:text-gold transition-colors">{vendor.name}</h3>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {vendor.location}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {vendor.packages} packages available
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground">Starting at</div>
                      <span className="font-medium text-gold">LKR {vendor.price.toLocaleString()}</span>
                    </div>
                    <span className="bg-green-deep text-ivory text-xs px-4 py-2 rounded-xl hover:bg-green-soft transition-all">
                      Quick Book
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-10">
            <button className="px-8 py-3.5 border-2 border-gold text-gold hover:bg-gold hover:text-white rounded-xl transition-all">
              Load More Vendors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
