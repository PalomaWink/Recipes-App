import React, { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import context from '../context/Context';

export default function RecipeDetails() {
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const location = useLocation();
  const { id } = useContext(context);
  const [fetchApi, setFetchApi] = useState([]);
  useEffect(() => {
    const fetchRecipe = async () => {
      if (location.pathname === `/meals/${id}`) {
        const result = await fetch(`${URL_FOOD}${id}`);
        const data = await result.json();
        setFetchApi(data.meals);
      }
      if (location.pathname === `/drinks/${id}`) {
        const result = await fetch(`${URL_DRINK}${id}`);
        const data = await result.json();
        setFetchApi(data.drinks);
      }
    };
    fetchRecipe();
  }, [id, location.pathname]);
  return (
    <div>
      <h1>TROQUEI DE ROTA</h1>
      { fetchApi.map((recipes) => (
        <div key={ recipes.idMeal || recipes.idDrink }>
          <p data-testid="recipe-title">{ recipes.strMeal || recipes.strDrink }</p>
          <img
            width="100px"
            height="100px"
            src={ recipes.strMealThumb || recipes.strDrinkThumb }
            alt={ recipes.strMeal || recipes.strDrink }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-category">{ recipes.strCategory }</p>
        </div>
      ))}
    </div>
  );
}
