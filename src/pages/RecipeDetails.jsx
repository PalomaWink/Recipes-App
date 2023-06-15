import React, { useEffect, useState, useRef } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useLocation, useHistory } from 'react-router-dom';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const URL_FOOD = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const URL_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  const location = useLocation();
  const history = useHistory();
  const [fetchApi, setFetchApi] = useState([]);
  const [isMeals, setIsMeals] = useState('');
  const [recommendationMeals, setrecommendationMeals] = useState([]);
  const [recommendationDrinks, setrecommendationDrinks] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [receipeInProgress, setReceipeInProgress] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const path = location.pathname.split('/')[1];
  console.log(scrollPosition);
  console.log(setFavorite);
  const recommendation = async () => {
    const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (path === 'meals') {
      const result = await fetch(URL_DRINKS);
      const data = await result.json();
      return setrecommendationMeals(data.drinks);
    }
    if (path === 'drinks') {
      const result = await fetch(URL_MEALS);
      const data = await result.json();
      return setrecommendationDrinks(data.meals);
    }
  };

  const handleShare = () => {
    const recipeLink = window.location.href;
    clipboardCopy(recipeLink)
      .then(() => setCopySuccess(true))
      .catch((error) => console.log(error));
  };

  const recommendationContainerRef = useRef(null);

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
    recommendation();
  }, [location.pathname]);

  const handleFavorite = () => {
    const pathId = location.pathname.split('/')[2];
    const favoriteRecipe = fetchApi
      .find((recipe) => recipe.idMeal === pathId || recipe.idDrink === pathId);
    if (favoriteRecipe) {
      // Verifica se a receita já está favoritada
      const isAlreadyFavorited = favoriteRecipes.some(
        (recipe) => recipe.id === favoriteRecipe.idMeal
        || recipe.id === favoriteRecipe.idDrink,
      );
      if (!isAlreadyFavorited) {
        // Adiciona a receita aos favoritos
        const { idMeal, idDrink, strArea,
          strCategory, strAlcoholic, strMeal,
          strDrink, strMealThumb, strDrinkThumb } = favoriteRecipe;
        const newFavoriteRecipe = {
          id: idMeal || idDrink,
          type: isMeals ? 'meal' : 'drink',
          nationality: strArea || '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic || '',
          name: strMeal || strDrink,
          image: strMealThumb || strDrinkThumb,
        };
        // Atualiza o estado favoriteRecipes
        setFavoriteRecipes(
          (prevFavoriteRecipes) => [...prevFavoriteRecipes, newFavoriteRecipe],
        );
        // Salva no localStorage
        localStorage.setItem('favoriteRecipes', JSON
          .stringify([...favoriteRecipes, newFavoriteRecipe]));
      }
    }
  };
  const handleScroll = () => {
    const { scrollLeft } = recommendationContainerRef.current;
    setScrollPosition(scrollLeft);
  };

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
    return ingredientsList;
  };
  const btn = () => {
    const pathId2 = location.pathname.split('/')[2];
    setReceipeInProgress(true);
    history.push(`${pathId2}/in-progress`);
  };
  const number = 6;
  const teste = ['block', 'block', 'none', 'none', 'none', 'none'];
  return (
    <div>
      <h1>Tela de detalhes</h1>
      {fetchApi.map((recipes, index) => (
        <div key={ recipes.idMeal || recipes.idDrink }>
          <p data-testid="recipe-title">{recipes.strMeal || recipes.strDrink}</p>
          <img
            width="100px"
            height="100px"
            src={ recipes.strMealThumb || recipes.strDrinkThumb }
            alt={ recipes.strMeal || recipes.strDrink }
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-category">{recipes.strCategory}</p>
          <ul data-testid={ `${index}-ingredient-name-and-measure` }>
            <strong>Ingredients:</strong>
            {getIngredientsList(recipes).map((ingredient, i) => (
              <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {ingredient}
              </li>
            ))}
          </ul>
          <section data-testid="instructions">{recipes.strInstructions}</section>
          {isMeals ? (
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
            <p data-testid="recipe-category">{recipes.strAlcoholic}</p>
          )}
        </div>
      ))}
      {copySuccess && <p>Link copied!</p>}
      <h2>Recommended</h2>
      <div
        className="recommendation-container"
        ref={ recommendationContainerRef }
        onScroll={ handleScroll }
      >
        {recommendationMeals.slice(0, number).map((recipe, index) => (
          <div
            key={ recipe.idDrink }
            data-testid={ `${index}-recommendation-card` }
            style={ { display: teste[index] } }
          >
            <img
              width="150px"
              height="150px"
              src={ recipe.strDrinkThumb }
              alt="Recipe"
            />
            <p data-testid={ `${index}-recommendation-title` }>{recipe.strDrink}</p>
          </div>
        ))}
        {recommendationDrinks.slice(0, number).map((recipe, index) => (
          <div
            key={ recipe.idMeal }
            data-testid={ `${index}-recommendation-card` }
            style={ { display: teste[index] } }
          >
            <img
              width="200px"
              height="200px"
              src={ recipe.strMealThumb }
              alt="Recipe"
            />
            <p data-testid={ `${index}-recommendation-title` }>{recipe.strMeal}</p>
          </div>
        ))}
      </div>
      { receipeInProgress ? (
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0 } }
          onClick={ btn }
        >
          Start Recipe
        </button>
      ) : (
        <button
          data-testid="start-recipe-btn"
          style={ { position: 'fixed', bottom: 0 } }
          onClick={ btn }
        >
          Continue Recipe
        </button>)}
      <button
        data-testid="share-btn"
        onClick={ handleShare }
        style={ { marginBottom: '10%' } }
      >
        compartilhar
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ handleFavorite }
      >
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt="favorite"
          style={ { cursor: 'pointer' } }
        />
      </button>
    </div>
  );
}
