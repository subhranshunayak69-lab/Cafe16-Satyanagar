import { useMemo, useState } from 'react';
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

  const placeOrder = () => {
    setActiveOrder({
      orderId: `C16-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: 'Guest',
      orderType: 'Dine-in',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: '20 mins',
      items: cart.map(({ name, quantity, price }) => ({ name, quantity, price })),
      totalAmount: grandTotal,
      paymentMethod: 'At cafe',
    });
    setCart([]);
    setIsCheckoutOpen(false);
    setActiveTab('tracker');
  };

  const pages = {
    home: <Hero setActiveTab={setActiveTab} />,
    menu: <Menu menuItems={menuItems} addToCart={addToCart} onOpenDishModal={setActiveModalDish} />,
    story: <Story />,
    reservation: <Reservation />,
    reviews: <Reviews />,
    gallery: <Gallery />,
    tracker: <OrderTracker currentOrder={activeOrder} onBackToMenu={() => setActiveTab('menu')} />,
    workforce: <WorkforcePortal authRole={authRole} setAuthRole={setAuthRole} tasks={workforceTasks} setTasks={setWorkforceTasks} />,
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount} setIsCartOpen={setIsCartOpen} />
      <main className="flex-1">{pages[activeTab] || pages.home}</main>
      <Footer onNavigate={setActiveTab} />

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
          cart={cart}
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
