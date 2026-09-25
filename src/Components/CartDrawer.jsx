import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Sparkles } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Financial Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gstTax = Math.round(subtotal * 0.05); // 5% GST
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const grandTotal = Math.max(0, subtotal + gstTax + deliveryFee - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CAFE16OFF') {
      setDiscount(100);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "CAFE16OFF"');
      setPromoApplied(false);
      setDiscount(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 flex flex-col shadow-2xl">
          
          {/* DRAWER HEADER */}
          <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-white">Your Order Bag</h2>
                <p className="text-xs text-stone-400">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CART ITEMS LIST */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-stone-400">
                <div className="w-16 h-16 bg-stone-800/60 rounded-full flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Explore our menu and add your favorite dishes or brews.
                  </p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartKey || item.id}
                  className="bg-stone-950/80 border border-stone-800/80 rounded-2xl p-3.5 flex gap-3.5 items-center hover:border-stone-700 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {item.name}
                    </h4>
                    {item.selectedCustomization && (
                      <p className="text-[10px] text-amber-400/90 font-medium truncate">
                        {typeof item.selectedCustomization === 'string'
                          ? item.selectedCustomization
                          : item.selectedCustomization.name}
                      </p>
                    )}
                    <span className="text-xs font-serif font-bold text-stone-200 mt-1 block">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.cartKey || item.id, -1)}
                      className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                    >
                      {item.quantity === 1 ? (
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      ) : (
                        <Minus className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartKey || item.id, 1)}
                      className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER & BILL SUMMARY */}
          {cart.length > 0 && (
            <div className="p-5 bg-stone-950 border-t border-stone-800 space-y-4">
              
              {/* PROMO CODE INPUT */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-500" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. CAFE16OFF)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode}
                  className="bg-stone-800 hover:bg-stone-700 disabled:opacity-50 text-amber-400 font-semibold px-4 py-2 rounded-xl text-xs transition-colors"
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </button>
              </form>

              {promoError && <p className="text-[11px] text-red-400">{promoError}</p>}
              {promoApplied && (
                <p className="text-[11px] text-green-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ₹100 Discount Applied!
                </p>
              )}

              {/* FINANCIAL BREAKDOWN */}
              <div className="space-y-1.5 text-xs text-stone-400 pt-2 border-t border-stone-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (5% GST)</span>
                  <span className="text-stone-200">₹{gstTax}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging & Delivery</span>
                  <span className="text-stone-200">₹{deliveryFee}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-serif font-bold text-white pt-2 border-t border-stone-800">
                  <span>Grand Total</span>
                  <span className="text-amber-400 text-base">₹{grandTotal}</span>
                </div>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(grandTotal);
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
