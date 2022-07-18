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

  function getRecipes() {
    let result = null;
    let urls = null;
    if (history.location.pathname.includes('foods')) {
      urls = {
        ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`,
        name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`,
        'first-letter': `https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`,
      };
    } else if (history.location.pathname.includes('drinks')) {
      urls = {
        ingredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${key}`,
        name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${key}`,
        'first-letter': `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${key}`,
      };
    }

    result = fetch(urls[search]);
    if (search === 'first-letter' && key.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
      result = null;
    }

    if (result !== null) {
      result
        .then((response) => response.json())
        .then((json) => {
          // data.recipes = json.meals === null ? [] : json.meals
          // console.log(json.meals);
          const typeKey = Object.keys(json)[0];
          const pageName = typeKey === 'meals' ? 'foods' : 'drinks';
          console.log('key:', typeKey);
          setData({ ...data, recipes: (json[typeKey] === null ? [] : json[typeKey]) });
          if (json[typeKey] === null) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
          } else if (json[typeKey].length === 1) {
            const subKey = Object.keys(json[typeKey][0])[0];
            history.push(`/${pageName}/${json[typeKey][0][subKey]}`);
          }
        });
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
        onClick={ getRecipes }
        type="button"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </div>
  );
}
