import React from 'react';
import { Switch, Route } from 'react-router-dom'; //BrowserRouter, 
import './App.css';
// import FoodRecipes from './pages/FoodRecipes';
import LoginPage from './pages/Login';
// import Provider from './contex/myProvider';
// import DrinksRecipes from './pages/DrinksRecipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';

function App() {
  return (
    // <Provider>
    //   <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ LoginPage } />
      <Route path="/foods" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/foods/:id" component={ Recipes } />
      <Route path="/drinks/:id" component={ Recipes } />
      <Route path="/foods/:id/in-progress" />
      <Route path="/drinks/:id/in-progress" />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
    //   </BrowserRouter>
    // </Provider>
  );
}

export default App;
