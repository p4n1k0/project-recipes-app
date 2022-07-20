import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import context from '../contex/myContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const MAX_REC = 6;

function RecipeDetails({ match: { params: { id } } }) {
  const history = useHistory();
  const { data, setData } = useContext(context);
  const [recipe, setRecipe] = useState(null);
  const [recs, setRecs] = useState([]);
  const [copy, setCopy] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  function getRecomendation() {
    const ind = (history.location.pathname.includes('foods'))
      ? fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      : fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if (ind !== null) {
      ind.then((response) => response.json()).then((json) => {
        const typeKey = Object.keys(json)[0];
        setRecs(json[typeKey]);
      });
    }
  }
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
    // if (result !== null) {
    result
      .then((response) => response.json())
      .then((json) => {
        const typeKey = history.location.pathname.includes('/foods') ? 'Meal' : 'Drink';
        const pageName = typeKey === 'Meal' ? 'meals' : 'drinks';
        console.log(json);
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
          recomendacions: recs === null ? [] : recs.slice(0, MAX_REC),
        });
      });
  }
  function getIsFavorite() {
    let favoriteRecipes = localStorage.getItem('favoriteRecipes');

    if (favoriteRecipes) {
      favoriteRecipes = JSON.parse(favoriteRecipes);
    } else {
      favoriteRecipes = [];
      localStorage.setItem('favoriteRecipes', '[]');
    }

    const test = favoriteRecipes.filter((r) => r.id === id).length === 0;
    setIsFavorite(!test);
  }
  useEffect(() => {
    getRecomendation();
    getDetails();

    getIsFavorite();
  }, [data.updateRecipeDetails]);
  function renderCards() {
    const recipes = recs.slice(0, MAX_REC); // !== undefined ? data.recipes.slice(0, MAX_RECIPES) : [];// data.recipes
    const typeKey = history.location.pathname.includes('foods') ? 'Drink' : 'Meal';
    const pathname = history.location.pathname.includes('foods') ? '/drinks' : '/foods';
    const temp = recipes.map((r, index) => (
      <Link
        onClick={
          () => setData({ ...data, updateRecipeDetails: !data.updateRecipeDetails })
        }
        key={ index }
        to={ `${pathname}/${r[`id${typeKey}`]}` }
      >
        <div
          className="recipe-card"
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            alt={ r[`str${typeKey}`] }
            className="recipe-img"
            data-testid={ `${index}-card-img` }
            src={ r[`${`str${typeKey}`}Thumb`] }
          />
          <h4 data-testid={ `${index}-recomendation-title` }>
            {r[`str${typeKey}`]}
          </h4>
        </div>
      </Link>
    ));
    return temp;
  }
  function copyUrl() {
    const url = window.location.href;
    clipboardCopy(url);
    setCopy('Link copied!');
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
  function renderDetails() {
    if (recipe !== null) {
      const { img,
        title, category, ingredients, measures, instructions, video } = recipe;
      return (
        <div>
          <h2 data-testid="recipe-title">{title}</h2>
          <h3 data-testid="recipe-category">{category}</h3>
          <img
            className="details-img"
            data-testid="recipe-photo"
            alt="recipe"
            src={ img }
          />
          <button type="button" onClick={ copyUrl } data-testid="share-btn">
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
          {ingredients.map((i, index) => (
            <h4
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {`${i} ${measures[index]}`}
            </h4>))}
          <h4 data-testid="instructions">{instructions[0]}</h4>
          {video
          && <iframe
            title="recipe tutorial"
            data-testid="video"
            width="320"
            height="240"
            src={ `https://www.youtube.com/embed/${video}` }
          />}
          <div className="carro-ceu">
            {renderCards()}
          </div>
        </div>
      );
    }
  }
  function startRecipe() {
    const url = (history.location.pathname.includes('foods')) ? '/foods/' : '/drinks/';
    history.push(`${url + id}/in-progress`);
  }
  function renderStartRecipe() {
    let doneRecipes = localStorage.getItem('doneRecipes');
    if (doneRecipes) {
      doneRecipes = JSON.parse(doneRecipes);
    } else {
      doneRecipes = [];
      localStorage.setItem('doneRecipes', '[]');
    }
    const test = doneRecipes.filter((r) => r.id === id).length === 0;
    let inProgressRecipes = localStorage.getItem('doneRecipes');
    if (inProgressRecipes) {
      inProgressRecipes = JSON.parse(inProgressRecipes);
    } else {
      inProgressRecipes = [];
      localStorage.setItem('inProgressRecipes', '[]');
    }
    const inProgressTest = doneRecipes.filter((r) => r.id === id).length === 0;
    const text = inProgressTest ? 'Continue Recipe' : 'Start Recipe';
    if (test) {
      return (
        <button
          className="start-recipe-btn"
          name="Start Recipe"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ startRecipe }
        >
          {text}
        </button>);
    }
  }
  return (
    <main>
      <p>Recipe Details</p>
      {renderDetails()}
      {renderStartRecipe()}
    </main>
  );
}
RecipeDetails.propTypes = {
  match: PropTypes.object,
}.isRequired;
export default RecipeDetails;
