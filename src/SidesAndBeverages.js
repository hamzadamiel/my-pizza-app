import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SidesAndBeverages.css';

const SidesAndBeverages = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [sidesData, setSidesData] = useState([]);
  const [beveragesData, setBeveragesData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('/data/sides.json')
      .then((response) => response.json())
      .then((sides) => {
        setSidesData(sides);
      })
      .catch((error) => {
        console.error('Error fetching sides data:', error);
      });

    fetch('/data/beverages.json')
      .then((response) => response.json())
      .then((beverages) => {
        setBeveragesData(beverages);
      })
      .catch((error) => {
        console.error('Error fetching beverages data:', error);
      });
  }, []);

  const handleItemSelection = (item) => {
    const selectedItem = selectedItems.find((selected) => selected.name === item.name);

    if (!selectedItem) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.name !== item.name));
    }
  };

  useEffect(() => {
    const totalPrice = selectedItems.reduce((total, selectedItem) => {
      return total + selectedItem.price * quantity; // Calculate the total price based on quantity
    }, 0);

    setTotalPrice(totalPrice);
  }, [selectedItems, quantity]);

  const handleBuy = () => {
    if (Array.isArray(cartItems)) {
      const selectedItemsWithQuantity = selectedItems.map((selectedItem) => {
        return {
          name: selectedItem.name,
          quantity,
          price: selectedItem.price,
          totalPrice: selectedItem.price * quantity, // Calculate the total price based on quantity
        };
      });

      setCartItems([...cartItems, ...selectedItemsWithQuantity]);
    } else {
      const selectedItemsWithQuantity = selectedItems.map((selectedItem) => {
        return {
          name: selectedItem.name,
          quantity,
          price: selectedItem.price,
          totalPrice: selectedItem.price * quantity, // Calculate the total price based on quantity
        };
      });

      setCartItems([...selectedItemsWithQuantity]);
    }

    setSelectedItems([]);
    setQuantity(1);
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="sides-beverages-container">
      <div className="row">
        <div className="col-md-6">
          <div className="menu-section">
            <h3>Sides:</h3>
            <div className="menu-list">
              {sidesData.map((item) => (
                <div key={item.name} className="menu-item">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>Price: £{item.price.toFixed(2)}</p>
                  <button
                    className={`btn ${selectedItems.find((selected) => selected.name === item.name) ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => handleItemSelection(item)}
                  >
                    {selectedItems.find((selected) => selected.name === item.name) ? 'Remove' : 'Buy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="menu-section">
            <h3>Beverages:</h3>
            <div className="menu-list">
              {beveragesData.map((item) => (
                <div key={item.name} className="menu-item">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>Price: £{item.price.toFixed(2)}</p>
                  <button
                    className={`btn ${selectedItems.find((selected) => selected.name === item.name) ? 'btn-danger' : 'btn-success'}`}
                    onClick={() => handleItemSelection(item)}
                  >
                    {selectedItems.find((selected) => selected.name === item.name) ? 'Remove' : 'Buy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="selected-items-section">
          <h3>Selected Items:</h3>
          <ul className="selected-items-list">
            {selectedItems.map((item, index) => (
              <li key={index} className="selected-item">
                {item.name} - £{item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <div className="total-price-section">
            <h3>Total Price:</h3>
            <p>£{(totalPrice * quantity).toFixed(2)}</p>
          </div>
          <button
            className="btn btn-success buy-button"
            onClick={handleBuy}
            disabled={selectedItems.length === 0}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidesAndBeverages;
