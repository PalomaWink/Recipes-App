import React from 'react';

export default function Meals() {
  const arrayMeals = ['meals1', 'meals2', 'meals3', 'meals3', 'meals3'];
  return (
    <div>
      {
        arrayMeals.map((category, index) => (
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
