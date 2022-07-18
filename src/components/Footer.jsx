import React from 'react'; // , { useState }
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  // const MINUS_ONE = -1;
  const history = useHistory();
  // let pageName = history.location.pathname.split('/')[1];
  // let title = '';
  // if (pageName.includes('-')) {
  //   const words = pageName.split('-');
  //   words.map((word) => {
  //     const firstLetter = word[0].toUpperCase();
  //     const removeFirstLetter = word.slice(1);
  //     title += firstLetter + removeFirstLetter;
  //     title += ' ';
  //     return 0;
  //   });
  //   title = title.slice(0, MINUS_ONE);
  // } else {
  //   const temp = pageName[0].toUpperCase();
  //   pageName = pageName.slice(1);
  //   title = temp + pageName;
  // }

  // const [showMenu, setShowMenu] = useState(false);

  function redirect(url) {
    history.push(url);
  }

  // const [search, setSearch] = useState('')

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
