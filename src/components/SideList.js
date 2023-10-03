import React, { useState, useEffect } from 'react';

const SideList = () => {
  const [sides, setSides] = useState([]);

  useEffect(() => {
    fetch('/data/sides.json')
      .then((response) => response.json())
      .then((data) => setSides(data))
      .catch((error) => {
        console.error('Error fetching side data:', error);
      });
  }, []);

  return (
    <div>
      <h3>Sides</h3>
      <ul>
        {sides.map((side) => (
          <li key={side.id}>
            {side.name} - {side.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideList;
