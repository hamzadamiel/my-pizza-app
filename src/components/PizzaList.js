import React, { useState, useEffect } from 'react';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('/data/pizzas.json')
      .then((response) => response.json())
      .then((data) => setPizzas(data.pizzas))
      .catch((error) => {
        console.error('Error fetching pizza data:', error);
      });
  }, []);

  return (
    <div>
      <h3>Pizzas</h3>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.name}>
            {pizza.name} - {pizza.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
