import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import FoodRecipes from './components/FoodRecipes';
import LoginPage from './components/LoginPage';
import Provider from './contex/myProvider';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route path="/foods" component={ FoodRecipes } />

        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
