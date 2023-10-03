import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SidesAndBeverages from './SidesAndBeverages'; // Import the combined component
import CustomizePizza from './CustomizePizza';
import Customize5050 from './Customize5050';
import PizzaMenu from './PizzaMenu';
import CartHeader from './CartHeader';
import Cart from './Cart';
import CheckoutPage from './Checkout';
import OrderDetails from './OrderDetails';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <Router>
      <div>
        <CartHeader
          cartItemCount={cartItems.length}
          onCartClick={handleCartClick}
        />
        <Routes>
          <Route path="/" element={<PizzaMenu />} />
          <Route
            path="/customize/:pizzaName"
            element={
              <CustomizePizza
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route
            path="/customize-5050/"
            element={
              <Customize5050
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route
            path="/sides-and-beverages"
            element={
              <SidesAndBeverages
              cartItems={cartItems}
                setCartItems={setCartItems} /> // Use the combined component here
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                setCartItems={setCartItems}
                setIsCartOpen={setIsCartOpen}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-details"
            element={<OrderDetails cartItems={cartItems} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
