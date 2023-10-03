import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './css/CustomizePizza.css'; // Import your CSS file

const CustomizePizza = ({ cartItems, setCartItems }) => {
  const { pizzaName } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState(null);
  const [selectedSize, setSelectedSize] = useState('Small');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedBase, setSelectedBase] = useState('Thin Italian');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch('/data/pizzas.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedPizza = data.pizzas.find((p) => p.name === pizzaName);
        if (selectedPizza) {
          setPizza(selectedPizza);
        } else {
          navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error fetching pizza data:', error);
      });
  }, [pizzaName, navigate]);

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

  const handleAddToCart = () => {
    const total = calculateTotalPrice();
    const customizedPizza = {
      ...pizza,
      selectedSize,
      selectedToppings,
      selectedBase,
      totalPrice: total,
      quantity,
    };
    setCartItems([...cartItems, customizedPizza]);

    // Reset the fields
    setSelectedSize('Small');
    setSelectedToppings([]);
    setSelectedBase('Thin Italian');
    setQuantity(1);
  };

  const calculateTotalPrice = () => {
    const sizePrice = selectedSize ? pizza.size_prices[selectedSize] : 0;
    const basePrice = selectedBase
      ? commonBases.find((base) => base.name === selectedBase)?.price
      : 0;
    const toppingsPrice = selectedToppings.reduce((total, topping) => {
      const toppingPrice = commonToppings.find((t) => t.name === topping)?.price;
      return total + (toppingPrice || 0);
    }, 0);

    return (sizePrice + basePrice + toppingsPrice) * quantity;
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleToppingChange = (topping) => {
    const newSelectedToppings = [...selectedToppings];
    const toppingIndex = newSelectedToppings.indexOf(topping);
    if (toppingIndex === -1) {
      newSelectedToppings.push(topping);
    } else {
      newSelectedToppings.splice(toppingIndex, 1);
    }
    setSelectedToppings(newSelectedToppings);
  };

  const handleBaseChange = (base) => {
    setSelectedBase(base);
  };

  if (!pizza) {
    return <p>Loading...</p>;
  }

  const total = calculateTotalPrice();

  return (
    <div className="customize-pizza-container"> {}
      <h2 className="pizza-title">Customize Your {pizza.name} Pizza</h2>
      <p className="pizza-description">{pizza.description}</p>
      <div>
        <h3>Available Sizes:</h3>
        <ul>
          {Object.entries(pizza.size_prices).map(([size, price]) => (
            <li key={size}>
              <label>
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={selectedSize === size}
                  onChange={() => handleSizeChange(size)}
                />
                {size} - Price: {price}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Available Bases:</h3>
        <ul>
          {commonBases.map((baseOption) => (
            <li key={baseOption.name}>
              <label>
                <input
                  type="radio"
                  name="base"
                  value={baseOption.name}
                  checked={selectedBase === baseOption.name}
                  onChange={() => handleBaseChange(baseOption.name)}
                />
                {baseOption.name} - Price: {baseOption.price}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Available Toppings:</h3>
        <ul>
          {commonToppings.map((toppingOption) => (
            <li key={toppingOption.name}>
              <label>
                <input
                  type="checkbox"
                  name="topping"
                  value={toppingOption.name}
                  checked={selectedToppings.includes(toppingOption.name)}
                  onChange={() => handleToppingChange(toppingOption.name)}
                />
                {toppingOption.name} - Price: {toppingOption.price}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="total-price-container">
        <h3>Total Price:</h3>
        <p className="total-price">£{total.toFixed(2)}</p>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={!selectedSize || !selectedBase}
        className="buy-button"
      >
        Buy
      </button>
      <Link to="/" className="back-link">
        Back to Menu
      </Link>
    </div>
  );
};

export default CustomizePizza;
