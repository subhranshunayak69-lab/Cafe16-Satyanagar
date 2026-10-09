import { useState } from 'react';
import { ArrowUpRight, Menu as MenuIcon, ShoppingBag, X } from 'lucide-react';

const navLinks = [
  { id: 'story', label: 'Our story' },
  { id: 'menu', label: 'The menu' },
  { id: 'gallery', label: 'The bungalow' },
  { id: 'reviews', label: 'Guest notes' },
];

export default function Navbar({ activeTab, setActiveTab, cartCount, setIsCartOpen }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#17130f]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-14">
        <button type="button" onClick={() => handleNavClick('home')} className="group flex items-center gap-3 text-left" aria-label="Cafe 16 home">
          <span className="brand-mark flex h-11 w-11 items-center justify-center rounded-full border border-[#c5a36a]/60 font-serif text-lg text-[#e6c58e] transition group-hover:border-[#e6c58e]">16</span>
          <span>
            <span className="block font-serif text-[17px] leading-none tracking-[.12em] text-[#fffaf2]">CAFE 16</span>
            <span className="mt-1.5 block text-[9px] uppercase tracking-[.2em] text-[#bda67e]">Satyanagar · Bhubaneswar</span>
          </span>
        </button>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`nav-link py-2 text-xs tracking-wide transition ${activeTab === link.id ? 'text-[#e4c797]' : 'text-[#c3bcb1] hover:text-white'}`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex h-10 items-center gap-2 border border-white/20 px-3 text-xs text-[#f5eee2] transition hover:border-[#c5a36a] hover:text-[#e4c797] sm:px-4"
            aria-label={`Open bag${cartCount > 0 ? `, ${cartCount} items` : ''}`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Your bag</span>
            {cartCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c5a36a] px-1 text-[10px] font-semibold text-[#1b1611]">{cartCount}</span>}
          </button>
          <button type="button" onClick={() => handleNavClick('reservation')} className="hidden h-10 items-center gap-2 bg-[#c5a36a] px-4 text-xs font-semibold text-[#211a12] transition hover:bg-[#dcc08f] sm:inline-flex">
            Book a table <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-stone-200 lg:hidden"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="border-t border-white/10 bg-[#17130f] px-4 pb-5 pt-2 lg:hidden" aria-label="Mobile navigation">
          {[...navLinks, { id: 'reservation', label: 'Book a table' }, { id: 'tracker', label: 'Track an order' }, { id: 'workforce', label: 'Team portal demo' }].map((link) => (
            <button key={link.id} type="button" onClick={() => handleNavClick(link.id)} className={`block w-full border-b border-white/[.06] py-3 text-left text-sm ${activeTab === link.id ? 'text-[#e4c797]' : 'text-[#ddd5ca]'}`}>
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
