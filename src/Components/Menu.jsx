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
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      {/* SECTION HEADER & SEARCH BAR */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:mb-9 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-500">
            Crafted Fresh Daily
          </span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
            Bungalow Menu
          </h2>
          <p className="mt-2 text-sm font-light text-stone-400 sm:text-base">
            Gourmet comfort food, artisan brews, and signature Persian kababs.
          </p>
        </div>

        {/* SEARCH & DIETARY TOGGLES */}
        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row md:w-auto md:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
            <input
              type="text"
              placeholder="Search dishes or brews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-stone-800 bg-stone-900/90 py-2.5 pl-10 pr-4 text-sm text-white placeholder-stone-500 transition focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex w-full items-center justify-center rounded-full border border-stone-800 bg-stone-900 p-1 sm:w-auto">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                dietaryFilter === 'all'
                  ? 'bg-stone-800 text-white font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                dietaryFilter === 'veg'
                  ? 'border border-green-800/80 bg-green-950 text-green-400 font-semibold'
                  : 'text-stone-400 hover:text-green-400'
              }`}
            >
              Veg
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                dietaryFilter === 'non-veg'
                  ? 'border border-red-800/80 bg-red-950 text-red-400 font-semibold'
                  : 'text-stone-400 hover:text-red-400'
              }`}
            >
              Non-Veg
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto border-b border-stone-800/60 pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-medium transition-all sm:px-5 sm:text-sm ${
              selectedCategory === cat
                ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/20'
                : 'border border-stone-800 bg-stone-900/80 text-stone-400 hover:border-stone-700 hover:text-white'
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
              className="group flex flex-col overflow-hidden rounded-[1.65rem] border border-stone-800/80 bg-stone-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_22px_40px_rgba(0,0,0,0.45)]"
            >
              {/* IMAGE CONTAINER */}
              <div
                className="relative h-48 cursor-pointer overflow-hidden sm:h-52"
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
              <div className="flex flex-1 flex-col justify-between space-y-4 p-4 sm:p-4">
                <div
                  className="cursor-pointer"
                  onClick={() => onOpenDishModal && onOpenDishModal(dish)}
                >
                  <h3 className="text-base font-semibold text-white transition-colors group-hover:text-amber-400">
                    {dish.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs font-light leading-relaxed text-stone-400">
                    {dish.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-stone-800/80 pt-3">
                  <div>
                    <span className="font-serif text-lg font-bold text-white">₹{dish.price}</span>
                    <span className="mt-0.5 block text-[10px] text-stone-500">{dish.prepTime}</span>
                  </div>

                  <button
                    onClick={() => addToCart(dish)}
                    disabled={dish.isAvailable === false}
                    className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-400 shadow-sm transition-all hover:bg-amber-500 hover:text-black active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {dish.isAvailable === false ? 'Sold out' : <><Plus className="h-3.5 w-3.5" /> Add</>}
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
