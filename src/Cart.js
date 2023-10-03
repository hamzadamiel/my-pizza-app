import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Cart.css'; // Import the CSS file

const Cart = ({ cartItems, setIsCartOpen, setCartItems }) => {
  const navigate = useNavigate();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice * item.quantity, 0);
  };

  const handleSubmitOrder = () => {
    // Implement logic to submit the order with customerInfo and cartItems
    // For simplicity, we'll just clear the cart here
    setCartItems([]);
    setIsCartOpen(false); // Close the cart
    alert('Order submitted successfully!');
  };

  const handleDeleteItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const handleAddQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
  };

  const handleRemoveQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
    }
  };

  const handleBackToHome = () => {
    navigate('/'); // Navigate back to the homepage
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.totalPrice ? item.totalPrice.toFixed(2) : 'N/A'} (Quantity: {item.quantity})
                  {/* Add + and - buttons to change the quantity */}
                  <button onClick={() => handleDeleteItem(index)}>Delete</button>
                  <button onClick={() => handleAddQuantity(index)}>+</button>
                  <button onClick={() => handleRemoveQuantity(index)}>-</button>
                </li>
              ))}
            </ul>
          )}
          <h3>Total Price:</h3>
          <p>${calculateTotalPrice().toFixed(2)}</p>
        </div>
        <div className="order-form">
          <h3>Customer Information</h3>
          <form onSubmit={handleSubmitOrder}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <textarea
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Buy</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Cart;
