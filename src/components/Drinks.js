import React, { useContext, useEffect, useState } from 'react';
import context from '../context/Context';

export default function Drinks() {
  const { searchForFoods, setSearchForFoods } = useContext(context);
  const { results } = searchForFoods;
  const [category, setCategory] = useState([]);
  const [activeFilter, setActiveFilter] = useState(true);

  const twelve = 12;
  const returnsTwelve = results ? results.slice(0, twelve) : [];

  const five = 5;
  const categoryFive = category ? category.slice(0, five) : [];

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const urlFilter = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const fetchApi = async () => {
    const result = await fetch(url);
    const data = await result.json();
    setSearchForFoods({ ...searchForFoods, results: data.drinks });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await fetch(urlCategory);
      const data = await result.json();
      const { drinks } = data;
      setCategory(drinks);
    };
    fetchApi();
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
            <h3 data-testid={ `${index}-card-name` }>{intem.strDrink}</h3>
            <img
              src={ intem.strDrinkThumb }
              alt="Profile"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))
      }
    </div>
  );
}
