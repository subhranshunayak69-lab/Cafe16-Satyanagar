import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel({ slides = [], autoPlayInterval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default fallback images showcasing Cafe 16 Satyanagar highlights if none passed
  const defaultSlides = [
    {
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
      title: 'Lush Garden Lawn Seating',
      subtitle: 'Dine under fairy-lit greenery in our repurposed 50-year-old vintage bungalow.',
    },
    {
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
      title: 'Authentic Iranian Chelo Kababs',
      subtitle: 'Butter-infused rice paired with juicy grilled chicken & lamb skewers.',
    },
    {
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
      title: 'Bakul Foundation Mini-Library',
      subtitle: 'Pick a book, order an espresso, and relax in cozy indoor reading nooks.',
    },
  ];

  const carouselItems = slides.length > 0 ? slides : defaultSlides;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [currentIndex, autoPlayInterval]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-stone-800 shadow-2xl group">
      {/* SLIDE TRACK */}
      <div
        className="flex transition-transform duration-700 ease-out h-[360px] sm:h-[480px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((slide, idx) => (
          <div key={idx} className="w-full shrink-0 relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* CAPTION */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                Bungalow Feature
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold mt-3 leading-tight">
                {slide.title}
              </h3>
              <p className="text-stone-300 text-xs sm:text-base mt-2 font-light leading-relaxed max-w-xl">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* NAVIGATION CONTROLS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2.5 rounded-full border border-stone-700 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all active:scale-90"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2.5 rounded-full border border-stone-700 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all active:scale-90"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-4 right-6 flex items-center gap-2">
        {carouselItems.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === idx
                ? 'w-6 bg-amber-400'
                : 'w-2 bg-stone-500/60 hover:bg-stone-300'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}