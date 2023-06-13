import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeDetails() {
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const location = useLocation();
  const [fetchApi, setFetchApi] = useState([]);
  const [isMeals, setIsMeals] = useState('');
  useEffect(() => {
    const urlParts = location.pathname.split('/');
    const conditional = urlParts[1] === 'meals';
    const urlId = urlParts[urlParts.length - 1];

    setIsMeals(conditional);
    const fetchRecipe = async (id) => {
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
    fetchRecipe(urlId);
  }, [location.pathname]);

  const getIngredientsList = (recipe) => {
    const ingredientsList = [];
    const number = 20;
    for (let i = 1; i <= number; i += 1) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        ingredientsList.push(`${ingredient} - ${measure}`);
      }
    }
    console.log(fetchApi);

    return ingredientsList;
  };
  return (
    <div>
      <h1>Tela de detalhes</h1>
      { fetchApi.map((recipes, index) => (
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
          <ul data-testid={ `${index}-ingredient-name-and-measure` }>
            <strong>Ingredients:</strong>
            {getIngredientsList(recipes).map((ingredient, i) => (
              <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {ingredient}
              </li>
            ))}
          </ul>
          <section data-testid="instructions">
            { recipes.strInstructions}
          </section>
          {
            isMeals ? (
              <div>

                <video src={ recipes.strYoutube } data-testid="video" controls>
                  <track
                    kind="captions"
                    src="legenda.vtt"
                    srcLang="pt"
                    label="Português"
                    default
                  />
                </video>
              </div>
            ) : (
              <p data-testid="recipe-category">{ recipes.strAlcoholic}</p>
            )
          }
        </div>
      ))}
    </div>
  );
}
