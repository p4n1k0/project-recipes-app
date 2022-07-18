import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const history = useHistory();

  function redirect(url) {
    history.push(url);
  }

  return (
    <footer className="footer" data-testid="footer">
      <button type="button" onClick={ () => redirect('/foods') }>
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="profile" />
      </button>
      <button type="button" onClick={ () => redirect('/drinks') }>
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="profile" />
      </button>
    </footer>
  );
}

export default Footer;
