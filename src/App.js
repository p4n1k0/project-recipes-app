import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import FoodRecipes from './pages/FoodRecipes';
import LoginPage from './pages/Login';
import Provider from './contex/myProvider';
import DrinksRecipes from './pages/DrinksRecipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route path="/foods" component={ FoodRecipes } />
          <Route path="/drinks" component={ DrinksRecipes } />
          <Route path="/foods/:id" component={ FoodRecipes } />
          <Route path="/drinks/:id" component={ DrinksRecipes } />
          <Route path="/foods/:id/in-progress" />
          <Route path="/drinks/:id/in-progress" />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />

        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
