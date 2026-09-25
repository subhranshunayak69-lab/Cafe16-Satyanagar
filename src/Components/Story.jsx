import React from 'react';
import { BookOpen, TreePine, Heart, Sparkles, Coffee, Compass, CheckCircle2 } from 'lucide-react';
import Carousel from './Carousel.jsx';

export default function Story() {
  const highlights = [
    {
      title: '50-Year Heritage Bungalow',
      description: 'Preserving old-world architecture with vintage brick accents, grand archways, and antique courtyard aesthetics.',
      icon: Compass,
    },
    {
      title: 'Bakul Mini-Library Partnership',
      description: 'Partnered with Bakul Foundation to house hundreds of curated literary works for guests to enjoy with coffee.',
      icon: BookOpen,
    },
    {
      title: 'Fairy-Lit Garden Lawn',
      description: 'Lush outdoor seating surrounded by greenery, soft ambient lighting, and serene open-air dining.',
      icon: TreePine,
    },
    {
      title: 'Pet-Friendly Sanctuary',
      description: 'Open lawns and welcoming spaces where your pets can relax right beside you.',
      icon: Heart,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 space-y-16">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Satyanagar Heritage
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
          A Converted Bungalow Steeped in Nostalgia & Coffee
        </h2>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          More than just a café—Cafe 16 is a quiet sanctuary tucked away in Satyanagar, bridging Bhubaneswar's rich heritage with artisanal culinary traditions.
        </p>
      </div>

      {/* AMBIANCE CAROUSEL */}
      <div>
        <Carousel />
      </div>

      {/* STORY CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8">
        
        {/* LEFT TEXT STORY */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
            Preserving the Charm of Vintage Bhubaneswar
          </h3>
          
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Housed inside a lovingly repurposed 50-year-old family bungalow, Cafe 16 was born out of a desire to create a slow-paced refuge amidst the bustling city. Original high ceilings, exposed brick walls, and shaded verandas have been restored to preserve its timeless residential warmth.
          </p>

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Whether you choose to sip an iced caramel macchiato under our garden trees or lose yourself in a book from our <strong className="text-amber-400 font-semibold">Bakul Foundation</strong> collection, every corner is crafted for comfort and connection.
          </p>

          {/* CHECKMARKS */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Authentic Iranian Chelo Kababs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Specialty Cold Brews & Desserts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Private Booking Available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Free High-Speed Wi-Fi</span>
            </div>
          </div>
        </div>

        {/* RIGHT HIGHLIGHT CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-stone-900/80 border border-stone-800 p-6 rounded-2xl space-y-3 hover:border-amber-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-white text-base">
                  {item.title}
                </h4>
                <p className="text-stone-400 text-xs font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}