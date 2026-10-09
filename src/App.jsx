import { useEffect, useMemo, useState } from 'react';
import CartDrawer from './Components/CartDrawer.jsx';
import CheckoutModal from './Components/CheckoutModal.jsx';
import FoodModal from './Components/FoodModal.jsx';
import Footer from './Components/Footer.jsx';
import Gallery from './Components/Gallery.jsx';
import Hero from './Components/Hero.jsx';
import Menu from './Components/Menu.jsx';
import Navbar from './Components/Navbar.jsx';
import OrderTracker from './Components/OrderTracker.jsx';
import Reservation from './Components/Reservation.jsx';
import Reviews from './Components/Reviews.jsx';
import Story from './Components/Story.jsx';
import WorkforcePortal, { INITIAL_WORKFORCE_TASKS } from './Components/WorkforcePortal.jsx';
import { INITIAL_MENU } from './Data/menuData.js';

const TAX_RATE = 0.05;
const DELIVERY_FEE = 40;

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const menuItems = INITIAL_MENU;
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [activeModalDish, setActiveModalDish] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [authRole, setAuthRole] = useState(null);
  const [workforceTasks, setWorkforceTasks] = useState(INITIAL_WORKFORCE_TASKS);

  useEffect(() => {
    const sectionIds = ['home', 'story', 'menu', 'reservation', 'gallery', 'reviews', 'tracker', 'workforce'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (visibleSection) setActiveTab(visibleSection.target.id);
    }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.1, 0.3] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigateTo = (sectionId) => {
    setActiveTab(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const grandTotal = useMemo(() => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return subtotal ? subtotal + Math.round(subtotal * TAX_RATE) + DELIVERY_FEE : 0;
  }, [cart]);

  const addToCart = (dish, quantity = 1) => {
    if (!dish.isAvailable) return;
    setCart((items) => {
      const key = `${dish.id}:${dish.selectedCustomization?.name || dish.selectedCustomization || ''}:${dish.specialNote || ''}`;
      const existing = items.find((item) => item.cartKey === key);
      if (existing) {
        return items.map((item) => item.cartKey === key ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...items, { ...dish, cartKey: key, quantity }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((items) => items
      .map((item) => item.cartKey === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0));
  };

  const placeOrder = (checkoutDetails = {}) => {
    setActiveOrder({
      orderId: checkoutDetails.orderId || `C16-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: checkoutDetails.customerInfo?.name || 'Guest',
      orderType: checkoutDetails.orderType || 'Dine-in',
      tableNumber: checkoutDetails.orderType === 'Dine-in' ? checkoutDetails.tableNumber : undefined,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: '20 mins',
      items: cart.map(({ name, quantity, price }) => ({ name, quantity, price })),
      totalAmount: checkoutTotal || grandTotal,
      paymentMethod: checkoutDetails.paymentMethod || 'Pay at counter',
    });
    setCart([]);
    setIsCheckoutOpen(false);
    navigateTo('tracker');
  };

  return (
    <div className="min-h-screen bg-[#17130f] text-stone-100">
      <Navbar activeTab={activeTab} setActiveTab={navigateTo} cartCount={cartCount} setIsCartOpen={setIsCartOpen} />
      <main>
        <Hero setActiveTab={navigateTo} />
        <div id="story" className="scroll-mt-24"><Story /></div>
        <div className="section-rule" />
        <div id="menu" className="scroll-mt-24"><Menu menuItems={menuItems} addToCart={addToCart} onOpenDishModal={setActiveModalDish} /></div>
        <div id="reservation" className="scroll-mt-24 bg-[#201a14] py-5"><Reservation /></div>
        <div id="gallery" className="scroll-mt-24"><Gallery /></div>
        <div id="reviews" className="scroll-mt-24 bg-[#201a14]"><Reviews /></div>
        <div id="tracker" className="scroll-mt-24"><OrderTracker currentOrder={activeOrder} onBackToMenu={() => navigateTo('menu')} /></div>
        <div id="workforce" className="scroll-mt-24 border-t border-[#d1af78]/15 bg-[#1b1611]">
          <WorkforcePortal authRole={authRole} setAuthRole={setAuthRole} tasks={workforceTasks} setTasks={setWorkforceTasks} />
        </div>
      </main>
      <Footer onNavigate={navigateTo} />

      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          updateQuantity={updateQuantity}
          onProceedToCheckout={(total) => { setCheckoutTotal(total); setIsCheckoutOpen(true); }}
        />
      )}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          grandTotal={checkoutTotal || grandTotal}
          clearCart={placeOrder}
        />
      )}
      {activeModalDish && (
        <FoodModal dish={activeModalDish} onClose={() => setActiveModalDish(null)} addToCart={addToCart} />
      )}
    </div>
  );
}
