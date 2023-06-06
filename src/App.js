import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import InProgress from './pages/InProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

function App() {
  const location = useLocation();
  const matchMeals = location.pathname.includes('/meals');
  const matchDrinks = location.pathname.includes('/drinks');
  const matchProfile = location.pathname === '/profile';

  const showFooter = matchMeals
    || matchDrinks
    || matchProfile;
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Meals } /> //Tela principal de receitas de comidas
        <Route path="/drinks" component={ Drinks } /> //Tela principal de receitas de bebidas
        <Route path="/meals/:id-da-receita" component={ RecipeDetails } /> //Tela de detalhes de uma receita de comida
        <Route path="/drinks/:id-da-receita" component={ RecipeDetails } /> //Tela de detalhes de uma receita de bebida
        <Route path="/meals/:id-da-receita/in-progress" component={ InProgress } /> //Tela de receita em progresso de comida
        <Route path="/drinks/:id-da-receita/in-progress" component={ InProgress } /> //Tela de receita em progresso de bebida
        <Route path="/perfil" component={ Profile } /> //Tela de perfil
        <Route path="/done-recipes" component={ DoneRecipes } /> //Tela de receitas feitas
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
