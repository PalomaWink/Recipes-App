// import React, { useContext, useEffect, useState } from 'react';
// import shareIcon from '../images/shareIcon.svg';
// import Header from '../components/Header';
// import context from '../context/Context';

// export default function DoneRecipes() {
//   const { headerState, setHeaderState } = useContext(context);
//   // criei um mock para testar
//   const results = [
//     {
//       idMeal: '52777',
//       strMeal: 'Mediterranean Pasta Salad',
//       strDrinkAlternate: null,
//       strCategory: 'Seafood',
//       strArea: 'Italian',
//       strInstructions: 'Bring a large saucepan of salted water to the boil\r\nAdd the pasta, stir once and cook for about 10 minutes or as directed on the packet.\r\nMeanwhile, wash the tomatoes and cut into quarters. Slice the olives. Wash the basil.\r\nPut the tomatoes into a salad bowl and tear the basil leaves over them. Add a tablespoon of olive oil and mix.\r\nWhen the pasta is ready, drain into a colander and run cold water over it to cool it quickly.\r\nToss the pasta into the salad bowl with the tomatoes and basil.\r\nAdd the sliced olives, drained mozzarella balls, and chunks of tuna. Mix well and let the salad rest for at least half an hour to allow the flavours to mingle.\r\nSprinkle the pasta with a generous grind of black pepper and drizzle with the remaining olive oil just before serving.',
//       strMealThumb: 'https:\/\/www.themealdb.com\/images\/media\/meals\/wvqpwt1468339226.jpg',
//       strTags: 'Pasta,Baking',
//       strYoutube: 'https:\/\/www.youtube.com\/watch?v=e52IL8zYmaE',
//       strIngredient1: 'mozzarella balls',
//       strIngredient2: 'baby plum tomatoes',
//       strIngredient3: 'fresh basil',
//       strIngredient4: 'farfalle',
//       strIngredient5: 'extra virgin olive oil',
//       strIngredient6: 'Green Olives',
//       strIngredient7: 'tuna',
//       strIngredient8: 'salt',
//       strIngredient9: 'pepper',
//       strIngredient10: '',
//       strIngredient11: '',
//       strIngredient12: '',
//       strIngredient13: '',
//       strIngredient14: '',
//       strIngredient15: '',
//       strIngredient16: null,
//       strIngredient17: null,
//       strIngredient18: null,
//       strIngredient19: null,
//       strIngredient20: null,
//       strMeasure1: '200 g',
//       strMeasure2: '250 g',
//       strMeasure3: '1  bunch',
//       strMeasure4: '350 g',
//       strMeasure5: '3  tablespoons',
//       strMeasure6: '40 g',
//       strMeasure7: '200 g',
//       strMeasure8: 'to taste',
//       strMeasure9: 'to taste',
//       strMeasure10: '',
//       strMeasure11: '',
//       strMeasure12: '',
//       strMeasure13: '',
//       strMeasure14: '',
//       strMeasure15: '',
//       strMeasure16: null,
//       strMeasure17: null,
//       strMeasure18: null,
//       strMeasure19: null,
//       strMeasure20: null,
//       strSource: 'https:\/\/thelemonsqueezy.com\/recipe\/mediterranean-pasta-salad\/',
//       strImageSource: null,
//       strCreativeCommonsConfirmed: null,
//       dateModified: null,
//     },
//   ];

//   const [filter, setFilter] = useState('all');
//   const [filteredRecipes, setFilteredRecipes] = useState(results);

//   // Atualiza o estado do filtro
//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   useEffect(() => {
//     const updateState = () => {
//       setHeaderState({ ...headerState,
//         title: 'Done Recipes',
//         renderHeader: false });
//     };
//     // Filtra as receitas com base no filtro selecionado
//     const filterRecipes = () => {
//       if (filter === 'all') {
//         setFilteredRecipes(results);
//       } else if (filter === 'meals') {
//         const filteredMeals = results.filter((recipe) => 'strMeal' in recipe);
//         setFilteredRecipes(filteredMeals);
//       } else if (filter === 'drinks') {
//         const filteredDrinks = results.filter((recipe) => 'strDrink' in recipe);
//         setFilteredRecipes(filteredDrinks);
//       }
//     };
//     filterRecipes();
//     updateState();
//   }, []);

//   return (
//     <div>
//       <div>
//         <Header />
//       </div>
//       <h1>Done Recipes</h1>
//       <span>
//         <button
//           data-testid="filter-by-all-btn"
//           onClick={ () => handleFilterChange('all') }
//         >
//           All
//         </button>
//         <button
//           data-testid="filter-by-meal-btn"
//           onClick={ () => handleFilterChange('meals') }
//         >
//           Meals
//         </button>
//         <button
//           data-testid="filter-by-drink-btn"
//           onClick={ () => handleFilterChange('drinks') }
//         >
//           Drinks
//         </button>
//       </span>
//       {filteredRecipes.map((recipe, index) => (
//         <div key={ index }>
//           <h2 data-testid={ `${index}-horizontal-name` }>
//             {recipe.strMeal || recipe.strDrink}
//           </h2>
//           <img
//             width={ 300 }
//             src={ recipe.strMealThumb || recipe.strDrinkThumb }
//             alt={ recipe.strMeal || recipe.strDrink }
//             data-testid={ `${index}-horizontal-image` }
//           />
//           <p data-testid={ `${index}-horizontal-top-text` }>
//             {`${recipe.strArea} - ${recipe.strCategory}`}
//           </p>
//           <p data-testid={ `${index}-horizontal-done-date` }>
//             {recipe.dateModified}
//           </p>
//           <button data-testid={ `${index}-horizontal-share-btn` }>
//             <img src={ shareIcon } alt="Compartilhar" />
//           </button>
//           <div>
//             {recipe.strTags
//               && (
//                 <span
//                   key={ index }
//                   data-testid={ `${index}-${recipe.strTags}-horizontal-tag` }
//                 >
//                   {recipe.strTags}
//                 </span>
//               )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
