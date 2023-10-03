import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import './css/Customize5050.css';

const Customize5050 = ({ cartItems, setCartItems }) => {
  const { pizzaName } = useParams();
  const location = useLocation();
  const [pizzaData, setPizzaData] = useState([]);
  const [selectedFirstPizza, setSelectedFirstPizza] = useState('');
  const [selectedSecondPizza, setSelectedSecondPizza] = useState('');
  const [selectedSize, setSelectedSize] = useState('Medium'); // Default to Medium
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedBase, setSelectedBase] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customizedPizzaPrice, setCustomizedPizzaPrice] = useState(0);
  const [pizzaNames, setPizzaNames] = useState([]);

  // Define commonBases and commonToppings
  const commonBases = [
    { name: 'Thin Italian', price: 0.0 },
    { name: 'Stone Crust', price: 1.0 },
    { name: 'Cheese Stuffed Crust', price: 2.0 },
    { name: 'Vegan', price: 1.5 },
    { name: 'Gluten-Free', price: 2.5 },
  ];

  const commonToppings = [
    { name: 'Tomato Sauce', price: 0.2 },
    { name: 'Mozzarella', price: 0.2 },
    { name: 'Pepperoni', price: 0.2 },
    { name: 'Bell Peppers', price: 0.2 },
    { name: 'Onions', price: 0.2 },
    { name: 'Olives', price: 0.2 },
    { name: 'Mushrooms', price: 0.2 },
    { name: 'Vegan Cheese', price: 0.2 },
    { name: 'Spinach', price: 0.2 },
    { name: 'Artichokes', price: 0.2 },
  ];

  useEffect(() => {
    if (location.state) {
      const { pizzaData, toppings, bases } = location.state;
      setPizzaData(pizzaData);
    } else {
      fetch('/data/pizzas.json')
        .then((response) => response.json())
        .then((data) => {
          setPizzaData(data.pizzas);
          const names = data.pizzas.map((pizza) => pizza.name);
          setPizzaNames(names);
        })
        .catch((error) => {
          console.error('Error fetching pizza data:', error);
        });
    }
  }, [location.state]);

  useEffect(() => {
    const firstPizza = pizzaData.find((pizza) => pizza.name === selectedFirstPizza);
    const secondPizza = pizzaData.find((pizza) => pizza.name === selectedSecondPizza);

    if (firstPizza && secondPizza) {
      const totalPrice =
        (firstPizza.size_prices[selectedSize] || 0) +
        (secondPizza.size_prices[selectedSize] || 0) +
        selectedToppings.reduce((total, topping) => total + topping.price, 0) +
        (selectedBase ? selectedBase.price : 0);

      setCustomizedPizzaPrice(totalPrice);
    } else {
      setCustomizedPizzaPrice(0);
    }
  }, [selectedFirstPizza, selectedSecondPizza, selectedSize, selectedToppings, selectedBase, pizzaData]);

  const handleFirstPizzaChange = (event) => {
    setSelectedFirstPizza(event.target.value);
  };

  const handleSecondPizzaChange = (event) => {
    setSelectedSecondPizza(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleToppingChange = (event) => {
    const selectedToppingsArray = Array.from(event.target.selectedOptions, (option) => ({
      name: option.value,
      price: parseFloat(option.dataset.price),
    }));
    setSelectedToppings(selectedToppingsArray);
  };

  const handleBaseChange = (event) => {
    const selectedBaseObject = commonBases.find((base) => base.name === event.target.value);
    setSelectedBase(selectedBaseObject);
  };

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    const total = customizedPizzaPrice * quantity;
    const pizzaNameInCart = `50-50 - ${selectedFirstPizza} / ${selectedSecondPizza}`;
    const customizedPizza = {
      name: pizzaNameInCart,
      size: selectedSize,
      toppings: selectedToppings,
      base: selectedBase,
      totalPrice: total,
      quantity,
    };
    setCartItems([...cartItems, customizedPizza]);

    setSelectedFirstPizza('');
    setSelectedSecondPizza('');
    setSelectedSize('Medium');
    setSelectedToppings([]);
    setSelectedBase('');
    setQuantity(1);
  };

  return (
    <div>
      <h2>Customize 50-50 Pizza</h2>
      <p>Select two pizzas to create your 50-50 pizza.</p>

      <div>
        <h3>Select First Pizza:</h3>
        <select onChange={handleFirstPizzaChange}>
          <option value="">Select a pizza</option>
          {pizzaNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Select Second Pizza:</h3>
        <select onChange={handleSecondPizzaChange}>
          <option value="">Select a pizza</option>
          {pizzaNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Select Size:</h3>
        <select onChange={handleSizeChange} value={selectedSize}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>

      <div>
        <h3>Select Toppings:</h3>
        <select multiple onChange={handleToppingChange}>
          {commonToppings.map((topping) => (
            <option key={topping.name} value={topping.name} data-price={topping.price}>
              {topping.name} (+£{topping.price.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Select Base:</h3>
        <select onChange={handleBaseChange}>
          <option value="">Select a base</option>
          {commonBases.map((base) => (
            <option key={base.name} value={base.name}>
              {base.name} (+£{base.price.toFixed(2)})
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3>Total Price:</h3>
        <p>£{customizedPizzaPrice.toFixed(2)} per pizza</p>
        <p>Total: £{customizedPizzaPrice.toFixed(2) * quantity}</p>
      </div>

      <button onClick={handleAddToCart} disabled={!selectedFirstPizza || !selectedSecondPizza || !selectedSize}>
        Buy
      </button>

   
    </div>
  );
};

export default Customize5050;
