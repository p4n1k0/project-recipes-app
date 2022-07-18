import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import context from '../contex/myContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

// {
//   "strMeal": " Bubble & Squeak",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/xusqvw1511638311.jpg",
//   "idMeal": "52885"
// }

const MAX_RECIPES = 12;
const MAX_CATEGORIES = 5;

function Recipes() {
  const { data, setData } = useContext(context);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const temp = (history.location.pathname.includes('foods'))
      ? fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      : fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    temp
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const typeKey = Object.keys(json)[0];
        setCategories(json[typeKey] === null ? [] : json[typeKey]);
      });

    const result = (history.location.pathname.includes('foods'))
      ? fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      : fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    if (result !== null) {
      result
        .then((response) => response.json())
        .then((json) => {
          const typeKey = Object.keys(json)[0];
          const pageName = typeKey === 'meals' ? 'foods' : 'drinks';
          setData({ ...data, recipes: json[typeKey] === null ? [] : json[typeKey] });
          if (json[typeKey] === null) {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
          } else if (json[typeKey].length === 1) {
            const subKey = Object.keys(json[typeKey][0])[0];
            history.push(`/${pageName}/${json[typeKey][0][subKey]}`);
          }
        });
    }
  }, [data.updateRecipes]);

  function getCards() {
    const recipes = data !== undefined ? data.recipes.slice(0, MAX_RECIPES) : [];// data.recipes
    const typeKey = history.location.pathname === '/foods' ? 'Meal' : 'Drink';
    console.log(recipes, history.location.pathname, typeKey);
    const temp = recipes.map((r, index) => (
      <Link key={ index } to={ `${history.location.pathname}/${r[`id${typeKey}`]}` }>
        <div
          className="recipe-card"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            alt={ r[`str${typeKey}`] }
            className="recipe-img"
            data-testid={ `${index}-card-img` }
            src={ r[`${`str${typeKey}`}Thumb`] }
          />
          <h4 data-testid={ `${index}-card-name` }>
            {' '}
            {r[`str${typeKey}`]}
            {' '}
          </h4>
        </div>
      </Link>
    ));
    // getCategories();

    return temp;
  }

  function getButton({ target }) {
    let result = null;

    if (target.innerText === 'All' || target.innerText === category) {
      result = (history.location.pathname.includes('foods'))
        ? fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        : fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    } else {
      setCategory(target.innerText);
      result = (history.location.pathname.includes('foods'))
        ? fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.innerText}`)
        : fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.innerText}`);
    }

    if (result !== null) {
      result
        .then((response) => response.json())
        .then((json) => {
          const typeKey = Object.keys(json)[0];
          setData({ ...data, recipes: json[typeKey] === null ? [] : json[typeKey] });
        });
    }
  }

  function getCategories() {
    const cat = categories.slice(0, MAX_CATEGORIES);
    // const typeKey = history.location.pathname === '/foods' ? 'strMeal' : 'strDrink';
    const temp = cat.map((r, index) => (
      <div
        key={ index }
        data-testid={ `${r.strCategory}-category-filter` }
      >
        {console.log(`${r.strCategory}-category-filter`)}
        <button className="category-btn" onClick={ getButton } type="button">
          {r.strCategory}
        </button>
      </div>
    ));

    temp.unshift(
      <div key="5" data-testid="All-category-filter">
        <button className="category-btn" onClick={ getButton } type="button">All</button>
      </div>,
    );

    return temp;
  }

  return (
    <main>
      <Header />
      <div className="category-container">
        {getCategories()}
      </div>
      {getCards()}
      <Footer />
    </main>
  );
}

export default Recipes;
