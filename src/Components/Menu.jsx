import React, { useState } from 'react';
import { Search, Plus, Minus, Star, Sparkles, Filter, Check } from 'lucide-react';

export default function Menu({ menuItems, addToCart, onOpenDishModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'

  const categories = [
    'All',
    'Coffee & Brews',
    'Starters & Fast Bites',
    'Mains & Bowls',
    'Desserts & Bakery'
  ];

  // Filtering Logic
  const filteredDishes = menuItems.filter((dish) => {
    const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet =
      dietaryFilter === 'all'
        ? true
        : dietaryFilter === 'veg'
        ? dish.isVeg
        : !dish.isVeg;

    return matchesCategory && matchesSearch && matchesDiet;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      
      {/* SECTION HEADER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">
            Crafted Fresh Daily
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            Bungalow Menu
          </h2>
          <p className="text-stone-400 text-sm mt-1 font-light">
            Gourmet comfort food, artisan brews, and signature Persian kababs.
          </p>
        </div>

        {/* SEARCH & DIETARY TOGGLES */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* SEARCH INPUT */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-500" />
            <input
              type="text"
              placeholder="Search dishes or brews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900/90 border border-stone-800 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          {/* DIET TOGGLES */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-full p-1 w-full sm:w-auto justify-center">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                dietaryFilter === 'veg'
                  ? 'bg-green-950 text-green-400 font-semibold border border-green-800/80'
                  : 'text-stone-400 hover:text-green-400'
              }`}
            >
              Veg
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                dietaryFilter === 'non-veg'
                  ? 'bg-red-950 text-red-400 font-semibold border border-red-800/80'
                  : 'text-stone-400 hover:text-red-400'
              }`}
            >
              Non-Veg
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-stone-800/60">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20'
                : 'bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800 hover:border-stone-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* DISH GRID */}
      {filteredDishes.length === 0 ? (
        <div className="text-center py-16 bg-stone-900/30 rounded-3xl border border-stone-800">
          <p className="text-stone-400 text-base">No culinary items match your search filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setDietaryFilter('all');
            }}
            className="mt-4 text-xs font-semibold text-amber-400 underline hover:text-amber-300"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-stone-900/80 border border-stone-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col group hover:shadow-xl hover:shadow-black/50"
            >
              {/* IMAGE CONTAINER */}
              <div 
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => onOpenDishModal && onOpenDishModal(dish)}
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                {/* DIETARY & BADGES */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      dish.isVeg
                        ? 'bg-green-950/90 text-green-400 border border-green-800/80'
                        : 'bg-red-950/90 text-red-400 border border-red-800/80'
                    }`}
                  >
                    {dish.isVeg ? 'VEG' : 'NON-VEG'}
                  </span>
                  {dish.isChefSpecial && (
                    <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      SIGNATURE
                    </span>
                  )}
                </div>

                {/* RATING */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold text-amber-400 flex items-center gap-1 border border-stone-800">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {dish.rating}
                </div>
              </div>

              {/* DETAILS & ACTION */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div 
                  className="cursor-pointer" 
                  onClick={() => onOpenDishModal && onOpenDishModal(dish)}
                >
                  <h3 className="font-semibold text-base text-white group-hover:text-amber-400 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-stone-400 text-xs line-clamp-2 mt-1 font-light leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-800/80">
                  <div>
                    <span className="font-serif font-bold text-lg text-white">₹{dish.price}</span>
                    <span className="text-[10px] text-stone-500 block">{dish.prepTime}</span>
                  </div>

                  <button
                    onClick={() => addToCart(dish)}
                    disabled={dish.isAvailable === false}
                    className="bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/30 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {dish.isAvailable === false ? 'Sold out' : <><Plus className="w-3.5 h-3.5" /> Add</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
