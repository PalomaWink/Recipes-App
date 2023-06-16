import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import context from '../context/Context';
import '../style/HeaderAlign.css';

export default function Meals() {
  const { fetchData, requestApi, setResults, results } = useContext(context);

  const [category, setCategory] = useState([]);
  const [activeFilter, setActiveFilter] = useState(true);

  const five = 5;
  const categoryFive = category ? category.slice(0, five) : [];

  const twelve = 12;
  const returnsTwelve = results ? results.slice(0, twelve) : [];

  const urlCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlFilter = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await fetch(urlCategory);
      const data = await result.json();
      const { meals } = data;
      setCategory(meals);
    };

    fetchCategory();
    fetchData();
  }, []);

  const handlClickMeals = async (filter) => {
    setActiveFilter(!activeFilter);
    if (activeFilter) {
      const searchApi = `${urlFilter}${filter}`;
      const result = await fetch(searchApi);
      const data = await result.json();
      const { meals } = data;
      setResults(meals);
    } else {
      setResults(requestApi);
    }
  };

  const handlClickAll = async () => {
    setResults(requestApi);
  };

  return (
    <div className="HeaderAlign">
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
            <Link to={ `/meals/${intem.idMeal}` }>
              <h3 data-testid={ `${index}-card-name` }>{intem.strMeal}</h3>
              <img
                src={ intem.strMealThumb }
                alt="Profile"
                data-testid={ `${index}-card-img` }
              />
            </Link>

          </div>
        ))
      }
    </div>
  );
}
