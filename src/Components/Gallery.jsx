import React, { useState } from 'react';
import { Camera, Sparkles, X, Eye, Image as ImageIcon, Heart } from 'lucide-react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState({});

  const categories = ['All', 'Ambiance', 'Garden', 'Coffee', 'Dishes'];

  const galleryItems = [
    {
      id: 1,
      title: 'Heritage Bungalow Exterior',
      category: 'Ambiance',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200',
      caption: 'The colonial-style 1950s architecture lit up under warm night lanterns.',
    },
    {
      id: 2,
      title: 'Lawn Garden Fairy Lights',
      category: 'Garden',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
      caption: 'Open-air outdoor seating under lush green canopy and fairy lighting.',
    },
    {
      id: 3,
      title: 'Signature Cold Brew & Cappuccino',
      category: 'Coffee',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1200',
      caption: 'Freshly roasted 100% Arabica beans poured by our master baristas.',
    },
    {
      id: 4,
      title: 'Iranian Chelo Kabab Platter',
      category: 'Dishes',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200',
      caption: 'Saffron butter rice served with tender grilled kababs and grilled tomatoes.',
    },
    {
      id: 5,
      title: 'Bakul Foundation Mini Library',
      category: 'Ambiance',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200',
      caption: 'Curated cozy book collection for readers and coffee enthusiasts.',
    },
    {
      id: 6,
      title: 'Nutella Brownie & Desserts',
      category: 'Dishes',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1200',
      caption: 'Warm gooey chocolate brownie served with vanilla ice cream.',
    },
  ];

  const filteredItems =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12 space-y-8 animate-fade-in">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Visual Tour
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            Life at Cafe 16
          </h2>
          <p className="text-stone-400 text-sm mt-1 font-light">
            A glimpse inside our heritage villa, green garden lawn, handcrafted brews, and artisan dishes.
          </p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                activeFilter === cat
                  ? 'bg-amber-500 text-black border-amber-500 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isLiked = likes[item.id];

          return (
            <div
              key={item.id}
              className="group relative bg-stone-900 border border-stone-800/80 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/40"
            >
              {/* IMAGE CONTAINER */}
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* CATEGORY BADGE */}
                <span className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md border border-stone-800 text-amber-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>

                {/* LIKE BUTTON */}
                <button
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 text-stone-300 hover:text-red-400 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isLiked ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </button>

                {/* ZOOM LIGHTBOX BUTTON */}
                <button
                  onClick={() => setSelectedImage(item)}
                  className="absolute bottom-4 right-4 p-2.5 rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-transform active:scale-95 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* CARD DETAILS */}
              <div className="p-5 space-y-1.5 bg-stone-900">
                <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-stone-400 text-xs font-light leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-stone-950/80 text-stone-400 hover:text-white rounded-full border border-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* HIGH-RES IMAGE */}
            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            {/* MODAL FOOTER */}
            <div className="p-6 bg-stone-950 border-t border-stone-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                  {selectedImage.category}
                </span>
                <span className="text-stone-500 text-xs">Cafe 16 Satyanagar</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                {selectedImage.title}
              </h3>
              <p className="text-stone-400 text-xs font-light">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}