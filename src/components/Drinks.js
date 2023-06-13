import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import context from '../context/Context';

export default function Drinks() {
  const { searchForFoods,
    setSearchForFoods,
    fetchData, requestApi } = useContext(context);
  const { results } = searchForFoods;
  const [category, setCategory] = useState([]);
  const [activeFilter, setActiveFilter] = useState(true);

  const twelve = 12;
  const returnsTwelve = results ? results.slice(0, twelve) : [];

  const five = 5;
  const categoryFive = category ? category.slice(0, five) : [];

  const urlCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const urlFilter = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await fetch(urlCategory);
      const data = await result.json();
      const { drinks } = data;
      setCategory(drinks);
    };
    fetchData();
    fetchCategory();
  }, []);

  const handlClickDrink = async (filter) => {
    setActiveFilter(!activeFilter);
    if (activeFilter) {
      const searchApi = `${urlFilter}${filter}`;
      const result = await fetch(searchApi);
      const data = await result.json();
      const { drinks } = data;
      setSearchForFoods({ ...searchForFoods, results: drinks });
    } else {
      setSearchForFoods({ ...searchForFoods, results: requestApi });
    }
  };

  const handlClickAll = async () => {
    setSearchForFoods({ ...searchForFoods, results: requestApi });
  };

  return (
    <div>
      {
        categoryFive.map((categor, index) => (
          <button
            data-testid={ `${categor.strCategory}-category-filter` }
            key={ index }
            onClick={ () => handlClickDrink(categor.strCategory) }
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
          <div key={ intem.idDrink } data-testid={ `${index}-recipe-card` }>
            <Link to={ `/drinks/${intem.idDrink}` }>
              <h3 data-testid={ `${index}-card-name` }>{intem.strDrink}</h3>
              <img
                src={ intem.strDrinkThumb }
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
