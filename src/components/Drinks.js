import React from 'react';

export default function Drinks() {
  const arrayDrinks = ['drinks1', 'drinks2', 'drinks3', 'drinks3', 'drinks3'];
  return (
    <div>
      {
        arrayDrinks.map((category, index) => (
          <button
            data-testid={ `${category}-category-filter` }
            key={ index }
          >
            {category}
          </button>
        ))
      }
    </div>
  );
}
