import React, { useState } from 'react';
import { Sparkles, ChevronRight, Star, Clock, MapPin, Coffee, Award } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Calculate normalized offset from center (-1 to 1)
    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center px-4 lg:px-8 py-16 overflow-hidden border-b border-stone-800/80"
    >
      {/* AMBIENT BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/25 via-stone-950 to-stone-950 -z-10" />
      
      {/* FLOATING DECORATIVE BACKGROUND OVERLAYS WITH MOUSE PARALLAX */}
      <div 
        className="hidden lg:block absolute top-12 left-10 w-64 h-64 rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-500/10 pointer-events-none transition-transform duration-300 ease-out opacity-80"
        style={{
          transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0) rotate(-6deg)`,
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600" 
          alt="Chelo Kabab Platter" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
          <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">Bungalow Signature</span>
          <p className="text-xs font-semibold text-white">Chelo Kabab Chicken Platter</p>
        </div>
      </div>

      <div 
        className="hidden lg:block absolute bottom-12 right-12 w-60 h-60 rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-500/10 pointer-events-none transition-transform duration-300 ease-out opacity-80"
        style={{
          transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0) rotate(5deg)`,
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600" 
          alt="Espresso Hot Chocolate" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
          <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase">Specialty Brew</span>
          <p className="text-xs font-semibold text-white">Espresso Hot Chocolate</p>
        </div>
      </div>

      {/* HERO MAIN CONTENT */}
      <div className="max-w-4xl text-center space-y-8 relative z-10">
        
        {/* BRAND BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm tracking-wide font-medium shadow-inner">
          <Sparkles className="w-4 h-4" /> 
          <span>Repurposed 50-Year-Old Vintage Bungalow & Garden Lawn</span>
        </div>

        {/* HEADLINE */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
          Where Vintage Nostalgia Meets <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-200 italic">
            Gourmet Brews
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-stone-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Relax under fairy-lit outdoor garden lawns, browse curated reads from our Bakul Foundation mini-library, and relish authentic Iranian Chelo Kababs & artisanal coffee.
        </p>

        {/* CTA BUTTON GROUP */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveTab('menu')}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-2 text-base transition-all shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95"
          >
            <span>Explore Menu & Order</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setActiveTab('reservation')}
            className="w-full sm:w-auto border border-stone-700 hover:border-amber-500 text-white hover:text-amber-400 font-medium px-8 py-4 rounded-full text-base transition-all hover:bg-stone-900/80 active:scale-95"
          >
            Reserve Garden Table
          </button>
        </div>

        {/* METRICS & QUICK HIGHLIGHTS */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-stone-800/80">
          <div className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-lg sm:text-xl font-serif">
              <Star className="w-4 h-4 fill-amber-400" /> 4.2 / 5
            </div>
            <p className="text-stone-500 text-xs mt-1">2,200+ Reviews</p>
          </div>

          <div className="p-3 text-center border-l border-stone-800/60">
            <div className="text-amber-400 font-bold text-lg sm:text-xl font-serif">
              ₹500 - ₹800
            </div>
            <p className="text-stone-500 text-xs mt-1">Avg. Cost for Two</p>
          </div>

          <div className="p-3 text-center border-l border-stone-800/60">
            <div className="text-amber-400 font-bold text-lg sm:text-xl font-serif flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" /> 10 AM - 10 PM
            </div>
            <p className="text-stone-500 text-xs mt-1">Open 7 Days</p>
          </div>

          <div className="p-3 text-center border-l border-stone-800/60">
            <div className="text-amber-400 font-bold text-lg sm:text-xl font-serif flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4" /> Satya Nagar
            </div>
            <p className="text-stone-500 text-xs mt-1">Bhubaneswar, Odisha</p>
          </div>
        </div>

      </div>
    </section>
  );
}