import React, { useState } from 'react';

export default function SearchBar() {
  const [searchData, setSearchData] = useState({ key: '', search: '' });
  function handleChange({ target: { name, value } }) {
    setSearchData({
      ...searchData, [name]: value,
    });
  }

  const { key, search } = searchData; // , search
  function getRecipes() {
    if (search === ingredient) {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
        .then((response) => response.json());
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
          name="search"
          type="radio"
          data-testid="first-letter-search-radio"
          value="first-letter"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">Pesquisar</button>
    </div>
  );
}
