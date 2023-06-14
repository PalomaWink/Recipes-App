import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { CarouselProvider,
  Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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
  const path = location.pathname.split('/')[1];
  console.log(scrollPosition);

  const recommendation = async () => {
    const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const URL_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    if (path === 'meals') {
      const result = await fetch(URL_DRINKS);
      const data = await result.json();
      console.log(data.drinks);
      return setrecommendationMeals(data.drinks);
    }

    if (path === 'drinks') {
      const result = await fetch(URL_MEALS);
      const data = await result.json();
      return setrecommendationDrinks(data.meals);
    }
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

  console.log(recommendationMeals);
  console.log(recommendationDrinks);
  /* const handleDoneRecipes = () => {
    const pathLocation = location.pathname.split('/')[1];
    const { id,
      strArea,
      strCategory,
      strAlcoholic,
      strMeal,
      strDrink,
      strMealThumb,
      strDrinkThumb,
      strTags } = fetchApi[0];
    const dados = [{
      id,
      type: pathLocation,
      nationality: strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
      name: strDrink || strMeal,
      image: strMealThumb || strDrinkThumb,
      doneDate: 'quando-a-receita-foi-concluida',
      tags: [strTags] || [],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify([...dados, dados]));
  }; */

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
    const pathId = location.pathname.split('/')[2];
    setReceipeInProgress(true);
    history.push(`${pathId}/in-progress`);
  };
  // const number = 6;
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
      {recommendationMeals && recommendationMeals.length > 0 && (
        <div>
          <h2>Recomendações de Refeições</h2>
          <CarouselProvider
            naturalSlideWidth={ 100 }
            naturalSlideHeight={ 125 }
            totalSlides={ recommendationMeals.length }
            visibleSlides={ 3 }
            dragEnabled={ false }
            ref={ recommendationContainerRef }
            onDragStart={ handleScroll }
          >
            <Slider>
              {recommendationMeals.map((meal, index) => (
                <Slide index={ index } key={ meal.idMeal }>
                  <div>
                    <h3>{meal.strMeal}</h3>
                    <img src={ meal.strMealThumb } alt={ meal.strMeal } />
                  </div>
                </Slide>
              ))}
            </Slider>
            <ButtonBack>Anterior</ButtonBack>
            <ButtonNext>Próximo</ButtonNext>
          </CarouselProvider>
        </div>
      )}
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

      >
        compartilhar
      </button>
      <button
        data-testid="favorite-btn"

      >
        favorita
      </button>
    </div>
  );
}
