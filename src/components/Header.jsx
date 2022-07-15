import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const MINUS_ONE = -1;
  const history = useHistory();
  let pageName = history.location.pathname.split('/')[1];
  let title = '';
  if (pageName.includes('-')) {
    const words = pageName.split('-');
    words.map((word) => {
      const firstLetter = word[0].toUpperCase();
      const removeFirstLetter = word.slice(1);
      title += firstLetter + removeFirstLetter;
      title += ' ';
      return 0;
    });
    title = title.slice(0, MINUS_ONE);
  } else {
    const temp = pageName[0].toUpperCase();
    pageName = pageName.slice(1);
    title = temp + pageName;
  }

  const [showMenu, setShowMenu] = useState(false);

  function redirect(url) {
    history.push(url);
  }

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  const [searchData, setSearchData] = useState({ key: '', search: '' });
  function handleChange({ target: { name, value } }) {
    setSearchData({
      ...searchData, [name]: value,
    });
  }

  // const [search, setSearch] = useState('')

  const { key } = searchData; // , search

  return (
    <header>
      <div>
        <button type="button" onClick={ () => redirect('/profile') }>
          <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
        </button>
        <h2 data-testid="page-title">{title}</h2>
        {
          !(title === 'Profile'
        || title === 'Done Recipes'
        || title === 'Favorite Recipes')
        && (
          <button type="button" onClick={ toggleMenu }>
            <img data-testid="search-top-btn" src={ searchIcon } alt="search" />
          </button>)
        }
      </div>
      {
        (showMenu)
        && (
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
        )
      }
    </header>
  );
}

export default Header;
