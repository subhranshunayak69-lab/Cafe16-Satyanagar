import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Smartphone, Banknote, ShieldCheck, ShoppingBag, MapPin, Send, Sparkles } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart, grandTotal, clearCart }) {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState('Dine-in'); // 'Dine-in', 'Takeaway', 'Delivery'
  const [tableNumber, setTableNumber] = useState('Table 4 (Garden)');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'Card', 'Cash'
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) return;

    const newOrderId = 'C16-ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setOrderPlaced(true);
  };

  const handleSendWhatsAppOrder = () => {
    const itemDetails = cart
      .map(
        (item) =>
          `• ${item.name} x ${item.quantity} - ₹${item.price * item.quantity}${
            item.selectedCustomization
              ? ` (${typeof item.selectedCustomization === 'string' ? item.selectedCustomization : item.selectedCustomization.name})`
              : ''
          }`
      )
      .join('\n');

    const orderMsg = encodeURIComponent(
      `*NEW ORDER RECEIVED - Cafe 16 Satyanagar*\n` +
      `*Order ID:* ${orderId}\n` +
      `*Order Type:* ${orderType} ${orderType === 'Dine-in' ? `(${tableNumber})` : ''}\n\n` +
      `*Customer Name:* ${customerInfo.name}\n` +
      `*Phone:* ${customerInfo.phone}\n` +
      `${orderType === 'Delivery' ? `*Delivery Address:* ${customerInfo.address}\n` : ''}` +
      `*Payment Method:* ${paymentMethod}\n\n` +
      `*ITEMS:* \n${itemDetails}\n\n` +
      `*TOTAL AMOUNT:* ₹${grandTotal}`
    );

    window.open(`https://wa.me/917978060887?text=${orderMsg}`, '_blank');
    if (clearCart) clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-stone-900 border border-stone-800 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white">
                {orderPlaced ? 'Order Confirmed' : 'Checkout & Payment'}
              </h2>
              <p className="text-xs text-stone-400">
                {orderPlaced ? 'Thank you for dining with Cafe 16' : 'Complete your details to place order'}
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

        {/* BODY CONTENT */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {orderPlaced ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
                  Order Successfully Placed
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {orderId}
                </h3>
                <p className="text-stone-400 text-xs mt-2 max-w-sm mx-auto font-light">
                  Your order has been sent to our kitchen. You will receive real-time status updates.
                </p>
              </div>

              {/* SUMMARY TICKET */}
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-left text-xs space-y-2 text-stone-300 max-w-md mx-auto">
                <div className="flex justify-between border-b border-stone-800/80 pb-2">
                  <span className="text-stone-500">Fulfillment Type:</span>
                  <span className="font-semibold text-white">{orderType}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800/80 pb-2">
                  <span className="text-stone-500">Customer:</span>
                  <span className="font-semibold text-white">{customerInfo.name} ({customerInfo.phone})</span>
                </div>
                <div className="flex justify-between border-b border-stone-800/80 pb-2">
                  <span className="text-stone-500">Payment:</span>
                  <span className="font-semibold text-amber-400">{paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-400 font-semibold">Total Paid/Due:</span>
                  <span className="font-serif font-bold text-amber-400 text-sm">₹{grandTotal}</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3.5 rounded-full flex items-center justify-center gap-2 text-xs transition-all shadow-lg active:scale-95"
                >
                  <Send className="w-4 h-4" /> Send Receipt to WhatsApp
                </button>
                <button
                  onClick={onClose}
                  className="w-full border border-stone-800 text-stone-300 hover:text-white py-3.5 rounded-full text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* CHECKOUT FORM */
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* ORDER FULFILLMENT TYPE TOGGLE */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-amber-500 uppercase tracking-wider block">
                  1. Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Dine-in', 'Takeaway', 'Delivery'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setOrderType(type)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${
                        orderType === type
                          ? 'bg-amber-500 text-black border-amber-500 font-bold'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* TABLE NUMBER (IF DINE-IN) */}
              {orderType === 'Dine-in' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                    Select Table Location
                  </label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option>Table 1 (Veranda)</option>
                    <option>Table 2 (Lawn Garden)</option>
                    <option>Table 3 (Lawn Garden)</option>
                    <option>Table 4 (Garden Fairy Lights)</option>
                    <option>Table 5 (Library Lounge)</option>
                    <option>Table 6 (Indoor Vintage)</option>
                  </select>
                </div>
              )}

              {/* CUSTOMER CONTACT DETAILS */}
              <div className="space-y-4">
                <label className="text-xs font-semibold text-amber-500 uppercase tracking-wider block">
                  2. Contact Information
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-stone-400">Full Name *</span>
                    <input
                      type="text"
                      name="name"
                      required
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Subhranshu Nayak"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] text-stone-400">Phone Number *</span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                {orderType === 'Delivery' && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-stone-400">Delivery Address *</span>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      placeholder="House/Flat No., Street, Satyanagar or nearby area..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    />
                  </div>
                )}
              </div>

              {/* PAYMENT METHOD SELECTION */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-amber-500 uppercase tracking-wider block">
                  3. Payment Method
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'UPI', label: 'UPI / QR', icon: Smartphone },
                    { id: 'Card', label: 'Credit/Debit', icon: CreditCard },
                    { id: 'Cash', label: 'Pay at Counter', icon: Banknote },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-[11px] font-medium">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ORDER SUMMARY BANNER */}
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-semibold block">Total Amount Due</span>
                  <span className="font-serif font-bold text-xl text-amber-400">₹{grandTotal}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Encrypted Checkout
                  </span>
                </div>
              </div>

            </form>
          )}
        </div>

        {/* FOOTER ACTION BUTTON */}
        {!orderPlaced && (
          <div className="p-4 bg-stone-950 border-t border-stone-800">
            <button
              type="submit"
              form="checkout-form"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3.5 rounded-full text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95"
            >
              Confirm Order & Pay ₹{grandTotal}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
