import React, { useState, useEffect } from 'react';

const BeverageList = () => {
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    fetch('/data/beverages.json')
      .then((response) => response.json())
      .then((data) => setBeverages(data))
      .catch((error) => {
        console.error('Error fetching beverage data:', error);
      });
  }, []);

  return (
    <div>
      <h3>Beverages</h3>
      <ul>
        {beverages.map((beverage) => (
          <li key={beverage.id}>
            {beverage.name} - {beverage.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeverageList;
