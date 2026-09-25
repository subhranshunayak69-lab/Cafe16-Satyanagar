import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  ChefHat,
  Bike,
  Sparkles,
  Phone,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export default function OrderTracker({ currentOrder, onBackToMenu }) {
  // Demo order fallback if no active order is passed via props
  const defaultOrder = {
    orderId: 'C16-ORD-849201',
    customerName: 'Subhranshu Nayak',
    orderType: 'Dine-in', // 'Dine-in', 'Takeaway', 'Delivery'
    tableNumber: 'Table 4 (Garden Fairy Lights)',
    placedAt: '08:15 PM',
    estimatedTime: '20 mins',
    items: [
      { name: 'Iranian Chelo Kabab', quantity: 1, price: 340 },
      { name: 'Cold Brew Iced Coffee', quantity: 2, price: 160 },
      { name: 'Nutella Brownie', quantity: 1, price: 180 }
    ],
    totalAmount: 840,
    paymentMethod: 'UPI',
  };

  const activeOrder = currentOrder || defaultOrder;

  // Track progress stages: 0 = Received, 1 = Preparing, 2 = Ready/Out for delivery, 3 = Completed
  const [statusStep, setStatusStep] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(18); // in minutes

  // Auto-progress demo timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setStatusStep(3); // Completed
          return 0;
        }
        if (prev <= 10) setStatusStep(2); // Ready / On the way
        return prev - 1;
      });
    }, 15000); // Progresses every 15 seconds for realistic demo feedback

    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      id: 0,
      label: 'Order Placed',
      description: 'Received by Cafe 16 kitchen',
      icon: Clock,
    },
    {
      id: 1,
      label: 'Kitchen Preparing',
      description: 'Chef is crafting your order fresh',
      icon: ChefHat,
    },
    {
      id: 2,
      label: activeOrder.orderType === 'Delivery' ? 'Out for Delivery' : 'Ready to Serve',
      description: activeOrder.orderType === 'Delivery' ? 'Rider on the way' : 'Serving at your table',
      icon: activeOrder.orderType === 'Delivery' ? Bike : Sparkles,
    },
    {
      id: 3,
      label: 'Order Delivered',
      description: 'Enjoy your meal in the garden!',
      icon: CheckCircle2,
    },
  ];

  const handleSupportCall = () => {
    window.location.href = 'tel:+917978060887';
  };

  const handleSupportWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hello Cafe 16 Satyanagar, I need help with my Order ID: ${activeOrder.orderId}`
    );
    window.open(`https://wa.me/917978060887?text=${msg}`, '_blank');
  };

  return (
    <section className="max-w-4xl mx-auto px-4 lg:px-8 py-12 space-y-8 animate-fade-in">
      
      {/* HEADER BAR */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Live Status
              </span>
              <span className="text-stone-500 text-xs">• Order ID: <strong className="text-stone-300">{activeOrder.orderId}</strong></span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
              Tracking Your Order
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">
              For <strong className="text-stone-200">{activeOrder.customerName}</strong> ({activeOrder.orderType} {activeOrder.tableNumber ? `• ${activeOrder.tableNumber}` : ''})
            </p>
          </div>

          {/* ESTIMATED TIMER DISPLAY */}
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 text-center sm:text-right shrink-0">
            <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">
              Estimated Time
            </span>
            <span className="font-serif font-bold text-2xl text-amber-400">
              {statusStep === 3 ? 'Completed' : `~${timeRemaining} Mins`}
            </span>
          </div>
        </div>

        {/* VISUAL PROGRESS TRACKER */}
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
            {steps.map((step) => {
              const Icon = step.icon;
              const isPassed = statusStep >= step.id;
              const isCurrent = statusStep === step.id;

              return (
                <div key={step.id} className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
                      isPassed
                        ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-stone-950 text-stone-600 border-stone-800'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-0.5">
                    <h4 className={`text-sm font-semibold transition-colors ${
                      isCurrent ? 'text-amber-400' : isPassed ? 'text-white' : 'text-stone-500'
                    }`}>
                      {step.label}
                    </h4>
                    <p className="text-[11px] text-stone-400 font-light leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* TWO COLUMN GRID: ORDER DETAILS & SUPPORT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ORDER ITEMS SUMMARY (2 COLUMNS) */}
        <div className="md:col-span-2 bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-500" /> Order Summary
            </h3>
            <span className="text-xs text-stone-400">Placed at {activeOrder.placedAt}</span>
          </div>

          <div className="space-y-3 divide-y divide-stone-800/60">
            {activeOrder.items.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex justify-between items-center text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-stone-950 text-amber-400 border border-stone-800 flex items-center justify-center font-bold text-xs">
                    {item.quantity}x
                  </span>
                  <span className="font-medium text-stone-200">{item.name}</span>
                </div>
                <span className="font-serif font-semibold text-white">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800 flex justify-between items-center text-sm">
            <span className="text-stone-400">Total Paid ({activeOrder.paymentMethod})</span>
            <span className="font-serif font-bold text-xl text-amber-400">₹{activeOrder.totalAmount}</span>
          </div>
        </div>

        {/* CAFE ASSISTANCE & ACTIONS (1 COLUMN) */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-white mb-1">
              Need Assistance?
            </h3>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Have a special request for the kitchen or need water refill at your table?
            </p>

            <div className="mt-4 space-y-2">
              <button
                onClick={handleSupportWhatsApp}
                className="w-full bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-200 font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-green-400" /> WhatsApp Host
              </button>
              <button
                onClick={handleSupportCall}
                className="w-full bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-200 font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" /> Call Cafe Desk
              </button>
            </div>
          </div>

          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-3 rounded-full text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <span>Back to Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

    </section>
  );
}