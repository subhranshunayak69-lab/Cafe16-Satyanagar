import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Heart,
  Coffee,
  Sparkles,
  ArrowUp
} from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800/80 pt-16 pb-8 relative overflow-hidden">
      
      {/* AMBIENT GLOW EFFECTS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12 relative z-10">
        
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* BRAND COLUMN */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-xl shadow-lg shadow-amber-500/10">
                16
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white tracking-wide block leading-none">
                  CAFE 16
                </span>
                <span className="text-[10px] text-amber-500 tracking-widest uppercase font-semibold">
                  Satyanagar, Bhubaneswar
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed">
              A serene 1950s vintage heritage bungalow transformed into an artisan coffee sanctuary, book lounge, and open-air lawn garden.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Artisan Menu', page: 'menu' },
                { label: 'Table Reservation', page: 'reservation' },
                { label: 'Visual Gallery', page: 'gallery' },
                { label: 'Guest Reviews', page: 'reviews' },
                { label: 'Order Tracking', page: 'tracker' },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate(link.page);
                      scrollToTop();
                    }}
                    className="hover:text-amber-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-amber-500/60">›</span> {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* WORKING HOURS */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Cafe Timings
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex justify-between border-b border-stone-900 pb-2">
                <span className="text-stone-400">Monday – Friday</span>
                <span className="font-medium text-white">11:00 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-stone-900 pb-2">
                <span className="text-stone-400">Saturday – Sunday</span>
                <span className="font-medium text-amber-400">10:00 AM – 11:00 PM</span>
              </div>
              <p className="text-[11px] text-stone-500 pt-1">
                * Live Music Sessions on Saturday Evenings in the Lawn Garden.
              </p>
            </div>
          </div>

          {/* CONTACT & LOCATION */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" /> Visit Us
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Plot No. 16, Satyanagar Rd, near Big Bazaar, Bhubaneswar, Odisha 751007
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+917978060887" className="hover:text-amber-400 transition-colors">
                  +91 79780 60887
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:hello@cafe16satyanagar.com" className="hover:text-amber-400 transition-colors">
                  hello@cafe16satyanagar.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-1 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Cafe 16 Satyanagar. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>in Bhubaneswar.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-stone-900 border border-stone-800 text-stone-300 hover:text-white px-4 py-2 rounded-full transition-colors group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-500 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}