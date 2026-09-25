import React, { useState } from 'react';
import { X, Star, Plus, Minus, Clock, ShieldAlert, Sparkles, Check } from 'lucide-react';

export default function FoodModal({ dish, onClose, addToCart }) {
  if (!dish) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState(dish.customizations?.[0] || '');
  const [specialNote, setSpecialNote] = useState('');

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddAndClose = () => {
    const customizedDish = {
      ...dish,
      selectedCustomization: selectedOption,
      specialNote: specialNote.trim(),
    };
    addToCart(customizedDish, quantity);
    onClose();
  };

  const calculateTotalPrice = () => {
    let basePrice = dish.price;
    if (selectedOption && selectedOption.priceExtra) {
      basePrice += selectedOption.priceExtra;
    }
    return basePrice * quantity;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* MODAL CARD */}
      <div 
        className="bg-stone-900 border border-stone-800 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl shadow-black relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-stone-300 hover:text-white p-2 rounded-full border border-stone-700/80 backdrop-blur-md transition-all"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* DISH IMAGE HERO */}
        <div className="relative h-60 w-full shrink-0">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />
          
          {/* BADGES OVER IMAGE */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase backdrop-blur-md ${
                dish.isVeg
                  ? 'bg-green-950/90 text-green-400 border border-green-800'
                  : 'bg-red-950/90 text-red-400 border border-red-800'
              }`}
            >
              {dish.isVeg ? 'VEG' : 'NON-VEG'}
            </span>
            {dish.isChefSpecial && (
              <span className="bg-amber-500 text-black text-[10px] font-bold px-2.5 py-1 rounded shadow flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> SIGNATURE
              </span>
            )}
          </div>
        </div>

        {/* CONTENT SCROLLABLE AREA */}
        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          {/* TITLE & PRICE HEADER */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold text-white leading-tight">
                {dish.name}
              </h2>
              <div className="text-right shrink-0">
                <span className="font-serif font-bold text-2xl text-amber-400">
                  ₹{calculateTotalPrice()}
                </span>
                {quantity > 1 && (
                  <span className="block text-[10px] text-stone-500">
                    (₹{dish.price} × {quantity})
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-400 mt-2">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {dish.rating || '4.5'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-500" /> {dish.prepTime || '15 mins'}
              </span>
              <span>•</span>
              <span className="text-stone-400">{dish.category}</span>
            </div>

            <p className="text-stone-300 text-sm mt-3 leading-relaxed font-light">
              {dish.description}
            </p>
          </div>

          {/* CUSTOMIZATION OPTIONS (IF AVAILABLE) */}
          {dish.customizations && dish.customizations.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-stone-800">
              <h3 className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
                Choose Preparation / Variation
              </h3>
              <div className="space-y-2">
                {dish.customizations.map((option, idx) => {
                  const optionLabel = typeof option === 'string' ? option : option.name;
                  const isSelected = selectedOption === option;

                  return (
                    <label
                      key={idx}
                      onClick={() => setSelectedOption(option)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                          : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <span className="text-xs font-medium">{optionLabel}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-amber-500 bg-amber-500' : 'border-stone-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* SPECIAL INSTRUCTIONS */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold tracking-wider text-stone-400 uppercase block">
              Special Instructions
            </label>
            <textarea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g., Extra spicy, less ice, or sauce on the side..."
              rows={2}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* FOOTER ACTION BAR */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          {/* QUANTITY CONTROLS */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-full p-1">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Decrease Quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-white">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Increase Quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* ADD TO BAG BUTTON */}
          <button
            onClick={handleAddAndClose}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <span>Add to Bag</span>
            <span>•</span>
            <span className="font-bold">₹{calculateTotalPrice()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}