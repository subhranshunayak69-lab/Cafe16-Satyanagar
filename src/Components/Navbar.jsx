import { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, PhoneCall } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, cartCount, setIsCartOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'story', label: 'About Bungalow' },
    { id: 'reservation', label: 'Book Table' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'workforce', label: 'Team Portal' },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-stone-950/80 border-b border-stone-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* BRAND LOGO & TITLE */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center font-serif text-black font-bold text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            16
          </div>
          <div>
            <h1 className="font-serif text-lg lg:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              CAFE 16
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-amber-500 font-medium -mt-0.5">
              Satyanagar • Bhubaneswar
            </p>
          </div>
        </div>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative py-1 transition-colors ${
                activeTab === link.id
                  ? 'text-amber-400 font-semibold'
                  : 'hover:text-white text-stone-400'
              }`}
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full animate-fade-in" />
              )}
            </button>
          ))}
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          {/* QUICK CALL BUTTON */}
          <a
            href="tel:+917978060887"
            className="hidden sm:flex items-center gap-2 text-xs font-medium text-stone-300 hover:text-amber-400 border border-stone-800 hover:border-amber-500/50 bg-stone-900/60 px-3 py-2 rounded-full transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
            <span>Call Us</span>
          </a>

          {/* CART DRAWER TRIGGER */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-full flex items-center gap-2 text-xs lg:text-sm transition-all active:scale-95 shadow-md shadow-amber-500/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="bg-black text-amber-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800/60"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 mt-3 pt-3 pb-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === link.id
                  ? 'bg-amber-500/10 text-amber-400 font-semibold border-l-2 border-amber-500'
                  : 'text-stone-300 hover:bg-stone-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-800/80 px-4">
            <a
              href="tel:+917978060887"
              className="flex items-center justify-center gap-2 w-full text-center text-xs font-semibold text-amber-400 border border-amber-500/30 bg-amber-500/10 py-2.5 rounded-lg"
            >
              <PhoneCall className="w-3.5 h-3.5" /> Call Cafe (+91 79780 60887)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
