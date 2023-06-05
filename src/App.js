import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      {/*  <Route path="/meals" component={} /> //Tela principal de receitas de comidas
      <Route path="/drinks" component={} /> //Tela principal de receitas de bebidas
      <Route path="/meals/:id-da-receita" component={} /> //Tela de detalhes de uma receita de comida
      <Route path="/drinks/:id-da-receita" component={} /> //Tela de detalhes de uma receita de bebida
      <Route path="/meals/:id-da-receita/in-progress" component={} /> //Tela de receita em progresso de comida
      <Route path="/drinks/:id-da-receita/in-progress" component={} /> //Tela de receita em progresso de bebida
      <Route path="/perfil" component={} /> //Tela de perfil
      <Route path="/done-recipes" component={} /> //Tela de receitas feitas
      <Route path="/favorite-recipes" component={} /> //Tela de favoritos */}
    </Switch>
  );
}

export default App;
