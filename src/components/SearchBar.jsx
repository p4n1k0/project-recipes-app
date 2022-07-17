import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../contex/myContext';

export default function SearchBar() {
  const [searchData, setSearchData] = useState({ key: '', search: '' });
  function handleChange({ target: { name, value } }) {
    setSearchData({
      ...searchData, [name]: value,
    });
  }

  const { key, search } = searchData; // , search
  const { data, setData } = useContext(context);
  const history = useHistory();

  function getFoodRecipes() {
    let result = null;
    if (search === 'ingredient') {
      result = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`);
    } else if (search === 'name') {
      result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`);
    } else if (search === 'first-letter') {
      if (key.length === 1) {
        result = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
    if (result !== null) {
      result
        .then((response) => response.json())
        .then((json) => {
          // data.recipes = json.meals === null ? [] : json.meals
          console.log(json.meals);
          setData({ ...data, recipes: (json.meals === null ? [] : json.meals) });
          if (json.meals === null) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
          } else if (json.meals.length === 1) {
            history.push(`/foods/${json.meals[0].idMeal}`);
          }
        });
    }
  }
  function getDrinksRecipes() {
    let result = null;
    if (search === 'ingredient') {
      result = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${key}`);
    } else if (search === 'name') {
      result = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${key}`);
    } else if (search === 'first-letter') {
      if (key.length === 1) {
        result = fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${key}`);
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    }
    if (result !== null) {
      result
        .then((response) => response.json())
        .then((json) => {
          // data.recipes = json.drinks === null ? [] : json.drinks
          setData({ ...data, recipes: json.drinks === null ? [] : json.drinks });
          if (json.drinks === null) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
          } else if (json.drinks.length === 1) {
            history.push(`/drinks/${json.drinks[0].idDrink}`);
          }
        });
    }
  }

  function handleClick() {
    if (history.location.pathname.includes('foods')) {
      getFoodRecipes();
    } else if (history.location.pathname.includes('drinks')) {
      getDrinksRecipes();
    }
  }

  return (
    <div>
      <input
        onChange={ handleChange }
        name="key"
        value={ key }
        type="text"
        data-testid="search-input"
      />
      <label htmlFor="ingredient">
        Ingedientes
        <input
          id="ingredient"
          onClick={ handleChange }
          name="search"
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingredient"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          id="name"
          onClick={ handleChange }
          name="search"
          type="radio"
          data-testid="name-search-radio"
          value="name"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          id="first-letter"
          onClick={ handleChange }
          name="search"
          type="radio"
          data-testid="first-letter-search-radio"
          value="first-letter"
        />
      </label>
      <button
        onClick={ handleClick }
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </div>
  );
}
