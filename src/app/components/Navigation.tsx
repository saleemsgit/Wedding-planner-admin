import { Link, useLocation } from 'react-router';
import { Heart, User, Menu, X, Home, Grid3X3, CalendarDays, Gift, Flower2 } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/all' },
    { name: 'My Planner', path: '/planner' },
    { name: 'Gift Exchange', path: '/gift-exchange' },
    { name: 'Mehndi Night', path: '/mehndi' },
  ];

  const bottomNavLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Services', path: '/services/all', icon: <Grid3X3 className="w-5 h-5" /> },
    { name: 'Planner', path: '/planner', icon: <CalendarDays className="w-5 h-5" /> },
    { name: 'Gifts', path: '/gift-exchange', icon: <Gift className="w-5 h-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-gold via-gold to-green-deep rounded-xl flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium text-green-deep leading-tight">WeddingSL</span>
                <span className="text-xs text-muted-foreground leading-none hidden sm:block">Muslim Wedding Platform</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    location.pathname === link.path
                      ? 'bg-gold/10 text-gold font-medium'
                      : 'text-foreground hover:text-gold hover:bg-gold/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 bg-green-deep text-ivory px-4 py-2 rounded-xl hover:bg-green-soft transition-all shadow-sm">
                <User className="w-4 h-4" />
                <span className="text-sm">My Profile</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground rounded-lg hover:bg-beige transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-3 px-4 rounded-xl transition-colors ${
                      location.pathname === link.path
                        ? 'bg-gold/10 text-gold font-medium'
                        : 'text-foreground hover:bg-beige'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                location.pathname === link.path
                  ? 'text-gold'
                  : 'text-muted-foreground hover:text-gold'
              }`}
            >
              {link.icon}
              <span className="text-xs">{link.name}</span>
              {location.pathname === link.path && (
                <div className="w-1 h-1 rounded-full bg-gold" />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
