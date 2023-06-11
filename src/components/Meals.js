import React, { useContext, useEffect, useState } from 'react';
import context from '../context/Context';

export default function Meals() {
  const { searchForFoods, setSearchForFoods } = useContext(context);
  const { results } = searchForFoods;
  const [category, setCategory] = useState([]);
  const [activeFilter, setActiveFilter] = useState(true);

  const five = 5;
  const categoryFive = category ? category.slice(0, five) : [];

  const twelve = 12;
  const returnsTwelve = results ? results.slice(0, twelve) : [];

  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlFilter = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const fetchApi = async () => {
    const result = await fetch(url);
    const data = await result.json();
    setSearchForFoods({ ...searchForFoods, results: data.meals });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await fetch(urlCategory);
      const data = await result.json();
      const { meals } = data;
      setCategory(meals);
    };

    fetchCategory();
    fetchApi();
  }, []);

  const handlClickMeals = async (filter) => {
    setActiveFilter(!activeFilter);
    if (activeFilter) {
      const searchApi = `${urlFilter}${filter}`;
      const result = await fetch(searchApi);
      const data = await result.json();
      const { meals } = data;
      setSearchForFoods({ ...searchForFoods, results: meals });
    } else {
      await fetchApi();
    }
  };

  const handlClickAll = async () => {
    await fetchApi();
  };

  return (
    <div>

      {
        categoryFive.map((categor, index) => (
          <button
            data-testid={ `${categor.strCategory}-category-filter` }
            key={ index }
            onClick={ () => handlClickMeals(categor.strCategory) }
          >
            {categor.strCategory}
          </button>
        ))
      }
      <button
        data-testid="All-category-filter"
        onClick={ handlClickAll }
      >
        ALL
      </button>
      {
        returnsTwelve.map((intem, index) => (
          <div key={ intem.idMeal } data-testid={ `${index}-recipe-card` }>
            <h3 data-testid={ `${index}-card-name` }>{intem.strMeal}</h3>
            <img
              src={ intem.strMealThumb }
              alt="Profile"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </div>
  );
}
