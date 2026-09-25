import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertCircle,
  ChefHat,
  Search,
  Filter,
  RefreshCw,
  Power,
  ChevronRight,
  DollarSign,
  Users
} from 'lucide-react';

export default function AdminDashboard({ menuItems, onToggleItemAvailability }) {
  // Demo orders for manager management
  const [orders, setOrders] = useState([
    {
      id: 'C16-ORD-849201',
      customer: 'Subhranshu Nayak',
      phone: '+91 98765 43210',
      type: 'Dine-in',
      table: 'Table 4 (Garden)',
      items: [
        { name: 'Iranian Chelo Kabab', qty: 1, price: 340 },
        { name: 'Cold Brew Coffee', qty: 2, price: 160 }
      ],
      total: 660,
      status: 'Preparing', // 'Received', 'Preparing', 'Ready', 'Completed'
      time: '10 mins ago',
      payment: 'UPI (Paid)'
    },
    {
      id: 'C16-ORD-849202',
      customer: 'Ananya Pattnaik',
      phone: '+91 98123 45678',
      type: 'Takeaway',
      table: '-',
      items: [
        { name: 'Nutella Brownie', qty: 2, price: 180 },
        { name: 'Cappuccino', qty: 1, price: 150 }
      ],
      total: 510,
      status: 'Received',
      time: '2 mins ago',
      payment: 'Cash'
    },
    {
      id: 'C16-ORD-849199',
      customer: 'Rohan Senapati',
      phone: '+91 94370 11223',
      type: 'Delivery',
      table: '-',
      items: [
        { name: 'Peri Peri Fries', qty: 1, price: 140 },
        { name: 'Caramel Macchiato', qty: 1, price: 190 }
      ],
      total: 330,
      status: 'Ready',
      time: '22 mins ago',
      payment: 'Card (Paid)'
    }
  ]);

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'menu'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Status transition handler
  const handleUpdateStatus = (orderId, nextStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate live stats
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const activeOrdersCount = orders.filter((ord) => ord.status !== 'Completed').length;

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* HEADER & TOP STATS BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900 border border-stone-800 p-6 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Manager Portal
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-2">
            Cafe 16 Operations
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-0.5 font-light">
            Live order queue, kitchen management, and menu availability toggle.
          </p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex bg-stone-950 p-1.5 rounded-2xl border border-stone-800 shrink-0">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-black shadow-md font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Live Orders ({activeOrdersCount})
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-black shadow-md font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Stock & Menu Items
          </button>
        </div>
      </div>

      {/* DASHBOARD SUMMARY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase text-stone-500 font-semibold tracking-wider block">Today's Revenue</span>
            <span className="font-serif font-bold text-2xl text-white">₹{totalRevenue}</span>
          </div>
        </div>

        <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase text-stone-500 font-semibold tracking-wider block">Active Orders</span>
            <span className="font-serif font-bold text-2xl text-white">{activeOrdersCount}</span>
          </div>
        </div>

        <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase text-stone-500 font-semibold tracking-wider block">In Kitchen</span>
            <span className="font-serif font-bold text-2xl text-white">
              {orders.filter((o) => o.status === 'Preparing').length}
            </span>
          </div>
        </div>

        <div className="bg-stone-900/90 border border-stone-800 p-5 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase text-stone-500 font-semibold tracking-wider block">Completed</span>
            <span className="font-serif font-bold text-2xl text-white">
              {orders.filter((o) => o.status === 'Completed').length}
            </span>
          </div>
        </div>
      </div>

      {/* TAB 1: LIVE ORDERS QUEUE */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* SEARCH & FILTERS BAR */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-900 p-4 rounded-2xl border border-stone-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-500" />
              <input
                type="text"
                placeholder="Search by customer name or Order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
              {['All', 'Received', 'Preparing', 'Ready', 'Completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    statusFilter === st
                      ? 'bg-amber-500 text-black border-amber-500 font-bold'
                      : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* ORDERS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-stone-900 border border-stone-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between shadow-lg relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* HEADER */}
                  <div className="flex justify-between items-start border-b border-stone-800 pb-3">
                    <div>
                      <span className="font-mono text-xs text-amber-500 font-bold">{order.id}</span>
                      <h4 className="font-semibold text-white text-base mt-0.5">{order.customer}</h4>
                      <span className="text-[11px] text-stone-400 block">{order.phone}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        order.status === 'Received'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : order.status === 'Preparing'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : order.status === 'Ready'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                          : 'bg-green-500/10 text-green-400 border border-green-500/30'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="flex justify-between text-xs text-stone-400 font-light">
                    <span>Type: <strong className="text-white">{order.type}</strong> {order.table !== '-' && `(${order.table})`}</span>
                    <span>{order.time}</span>
                  </div>

                  {/* ITEMS LIST */}
                  <div className="bg-stone-950 rounded-2xl p-3 space-y-2 border border-stone-800/80">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-stone-300">
                        <span>{it.qty}x {it.name}</span>
                        <span className="text-stone-400">₹{it.price * it.qty}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-xs text-white">
                      <span>Total Amount</span>
                      <span className="text-amber-400">₹{order.total}</span>
                    </div>
                  </div>
                </div>

                {/* STATUS UPDATER ACTIONS */}
                <div className="pt-2 border-t border-stone-800/80 flex gap-2">
                  {order.status === 'Received' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'Preparing')}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-black font-semibold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1"
                    >
                      <span>Start Preparing</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {order.status === 'Preparing' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'Ready')}
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1"
                    >
                      <span>Mark Ready</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {order.status === 'Ready' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'Completed')}
                      className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1"
                    >
                      <span>Complete Order</span>
                      <CheckCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {order.status === 'Completed' && (
                    <span className="w-full text-center text-xs text-stone-500 py-2">
                      Order Fulfilled & Closed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MENU STOCK & AVAILABILITY */}
      {activeTab === 'menu' && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-stone-800 pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-white">Menu Item Stock Controls</h3>
              <p className="text-stone-400 text-xs mt-0.5">Toggle item availability in real-time when dishes go out of stock.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(menuItems || []).map((item) => (
              <div
                key={item.id}
                className="bg-stone-950 border border-stone-800/80 rounded-2xl p-4 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="truncate">
                    <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                    <span className="text-[11px] text-amber-400 font-serif font-bold block">₹{item.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleItemAvailability && onToggleItemAvailability(item.id)}
                  className={`p-2.5 rounded-xl border transition-all shrink-0 ${
                    item.isAvailable !== false
                      ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400'
                  }`}
                  title={item.isAvailable !== false ? 'Click to mark Out of Stock' : 'Click to mark Available'}
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}