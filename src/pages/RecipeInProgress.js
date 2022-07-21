import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState(null);
  const history = useHistory();
  const [copy, setCopy] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [usedIngredients, setUsedIngredients] = useState([]);

  function setArray(r, array, key) {
    Object.entries(r).map((entrie) => {
      if (entrie[0].includes(key) && entrie[1] !== null && entrie[1] !== '') {
        array.push(entrie[1]);
      }
      return 0;
    });
  }

  function getDetails() {
    const result = (history.location.pathname.includes('foods'))
      ? fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      : fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    result
      .then((response) => response.json())
      .then((json) => {
        const typeKey = history.location.pathname.includes('/foods') ? 'Meal' : 'Drink';
        const pageName = typeKey === 'Meal' ? 'meals' : 'drinks';
        // console.log(json);
        const r = json[pageName][0];
        const ingredients = [];
        setArray(r, ingredients, 'strIngredient');
        const measures = [];
        setArray(r, measures, 'strMeasure');
        const instructions = [];
        setArray(r, instructions, 'strInstructions');
        setRecipe({
          type: typeKey === 'Meal' ? 'food' : 'drink',
          nationality: r.strArea,
          img: r[`str${typeKey}Thumb`],
          title: r[`str${typeKey}`],
          category: pageName === 'meals' ? r.strCategory : r.strAlcoholic,
          drinkCategory: r.strCategory,
          ingredients,
          measures,
          instructions,
          video: pageName === 'meals' ? r.strYoutube.split('=')[1] : null,
        });
      });
  }

  function copyUrl() {
    const url = window.location.href.replace('/in-progress', '');
    clipboardCopy(url);
    setCopy('Link copied!');
  }

  function getIsFavorite() {
    let favoriteRecipes = localStorage.getItem('favoriteRecipes');

    if (favoriteRecipes) {
      favoriteRecipes = JSON.parse(favoriteRecipes);
    } else {
      favoriteRecipes = [];
      localStorage.setItem('favoriteRecipes', '[]');
    }

    const test = favoriteRecipes.filter((r) => r.id === id).length !== 0;
    setIsFavorite(test);
  }

  function favorite() {
    let favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      favoriteRecipes = JSON.parse(favoriteRecipes);
    } else {
      favoriteRecipes = [];
      localStorage.setItem('favoriteRecipes', '[]');
    }
    const test = favoriteRecipes.filter((r) => r.id === id).length === 0;
    const { img, type, nationality, title, category, drinkCategory } = recipe;
    if (test) {
      favoriteRecipes.push({
        id,
        type,
        nationality: type === 'food' ? nationality : '',
        category: type === 'food' ? category : drinkCategory,
        alcoholicOrNot: type === 'food' ? '' : category,
        name: title,
        image: img,
      });
    } else {
      favoriteRecipes = favoriteRecipes.filter((r) => (r.id !== id));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setIsFavorite(test);
  }

  function endRecipe() {
    history.push('/done-recipes');
  }
  function renderEndRecipe() {
    if (recipe) {
      const { ingredients } = recipe;
      console.log(usedIngredients.length === ingredients.length);
      const test = usedIngredients.length !== ingredients.length;
      return (
        <button
          className="start-recipe-btn"
          name="Finish Recipe"
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ endRecipe }
          disabled={ test }
        >
          Finish Recipe
        </button>);
    }
  }

  function getChecked(name) {
    return usedIngredients.filter((i) => i === name).length !== 0;
  }

  function saveIngredients({ target }) {
    const { type } = recipe;
    let used = localStorage.getItem('inProgressRecipes');
    used = JSON.parse(used);
    if (getChecked(target.value)) {
      const temp = usedIngredients.filter((i) => i !== target.value);
      setUsedIngredients(temp);
      used[type === 'food' ? 'meals' : 'cocktails'][id] = temp;
    } else {
      const temp = [...usedIngredients];
      temp.push(target.value);
      setUsedIngredients(temp);
      used[type === 'food' ? 'meals' : 'cocktails'][id] = temp;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(used));
  }

  function renderDetails() {
    if (recipe !== null) {
      const { img,
        title, category, ingredients, measures, instructions } = recipe;
      return (
        <div>
          <img
            alt={ title }
            data-testid="recipe-photo"
            className="details-img"
            src={ img }
          />
          <h3 data-testid="recipe-title">{title}</h3>
          <h3 data-testid="recipe-category">{category}</h3>
          <button
            src={ shareIcon }
            type="button"
            onClick={ copyUrl }
            data-testid="share-btn"
          >
            {copy === '' ? <img alt="share icon" src={ shareIcon } /> : <h4>{copy}</h4>}
          </button>
          <button
            type="button"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            onClick={ favorite }
            data-testid="favorite-btn"
          >
            <img alt="fav icon" src={ isFavorite ? blackHeartIcon : whiteHeartIcon } />
          </button>
          <ul>
            {ingredients.map((i, index) => (
              <li data-testid={ `${index}-ingredient-step` } key={ index } htmlFor={ i }>
                <input
                  checked={ getChecked(i) }
                  onChange={ saveIngredients }
                  id={ i }
                  type="checkbox"
                  value={ i }
                />
                {`${i}-${measures[index]}`}
              </li>
            ))}
          </ul>
          <h4 data-testid="instructions">{instructions}</h4>
        </div>
      );
    }
  }

  useEffect(() => {
    getDetails();
    getIsFavorite();

    const type = history.location.pathname.includes('foods') ? 'meals' : 'cocktails';
    let used = localStorage.getItem('inProgressRecipes');
    if (used) {
      used = JSON.parse(used)[type][id];
    } else {
      used = [];
      const obj = {
        cocktails: {},
        meals: {},
      };
      obj[type][id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    setUsedIngredients(used);
  }, []);

  return (
    <main>
      {renderDetails()}
      {renderEndRecipe()}
    </main>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.object,
}.isRequired;
export default RecipeInProgress;
