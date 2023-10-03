import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/PizzaMenu.css'; // Import the CSS file

const PizzaMenu = () => {
  const navigate = useNavigate();
  const [selectedPizza, setSelectedPizza] = useState('');
  const [pizzaData, setPizzaData] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [bases, setBases] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('Nothing'); // Initialize with 'Nothing'
  const [showFullList, setShowFullList] = useState(true);

  useEffect(() => {
    // Fetch pizza data from the server
    fetch('/data/pizzas.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setPizzaData(data.pizzas);
        setToppings(data.toppings);
        setBases(data.bases);
      })
      .catch((error) => {
        console.error('Error fetching pizza data:', error);
      });
  }, []);

  useEffect(() => {
  // Apply sorting when sortCriteria changes
  if (sortCriteria === 'Gluten') {
    // Sort by gluten (example sorting logic)
    const sortedPizzas = pizzaData.filter((pizza) => pizza.is_gluten_free);
    setPizzaData(sortedPizzas);
    setShowFullList(false);
  } else if (sortCriteria === 'Vegan') {
    // Sort by vegan (example sorting logic)
    const sortedPizzas = pizzaData.filter((pizza) => pizza.is_vegan);
    setPizzaData(sortedPizzas);
    setShowFullList(false);
  } else if (sortCriteria === 'Nothing') {
    // Show the full list (reset to original state)
    fetch('/data/pizzas.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setPizzaData(data.pizzas);
        setShowFullList(true);
      })
      .catch((error) => {
        console.error('Error fetching pizza data:', error);
      });
  }
}, [sortCriteria]);


  const handleCustomizeClick = (pizzaName) => {
    if (pizzaName) {
      navigate(`/customize/${pizzaName}`, {
        state: { pizzaData, toppings, bases },
      });
    }
  };

  const handleSidesAndBeveragesClick = () => {
    navigate('/sides-and-beverages');
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  return (
    <div className="pizza-menu-container">
      <h2>Pizza Menu</h2>
      <div className="sort-dropdown">
        
        <select id="sort" value={sortCriteria} onChange={handleSortChange}>
          <option value="Nothing">Show all</option>
          <option value="Gluten">Gluten</option>
          <option value="Vegan">Vegan</option>
        </select>
      </div>
      <div className="pizza-list">
        {pizzaData.map((pizza) => (
          <div key={pizza.name} className="pizza-item">
            <h3>{pizza.name}</h3>
            <p>{pizza.description}</p>
            <img src={`/images/${pizza.image}`} alt={pizza.name} className="image" />
            <button
              onClick={() => handleCustomizeClick(pizza.name)}
              className="customize-button"
            >
              Customize
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PizzaMenu;
