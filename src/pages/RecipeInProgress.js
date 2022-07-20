import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState(null);
  const history = useHistory()
  const [copy, setCopy] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

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
    const url = window.location.href;
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

    const test = favoriteRecipes.filter((r) => r.id === id).length === 0;
    setIsFavorite(!test);
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
    const url = (history.location.pathname.includes('foods')) ? '/foods/' : '/drinks/';
    history.push(`${url + id}/in-progress`);
  }
  function renderEndRecipe() {
    // let doneRecipes = localStorage.getItem('doneRecipes');
    // if (doneRecipes) {
    //   doneRecipes = JSON.parse(doneRecipes);
    // } else {
    //   doneRecipes = [];
    //   localStorage.setItem('doneRecipes', '[]');
    // }
    // const test = doneRecipes.filter((r) => r.id === id).length === 0;
    // let inProgressRecipes = localStorage.getItem('doneRecipes');
    // if (inProgressRecipes) {
    //   inProgressRecipes = JSON.parse(inProgressRecipes);
    // } else {
    //   inProgressRecipes = [];
    //   localStorage.setItem('inProgressRecipes', '[]');
    // }
    // const inProgressTest = doneRecipes.filter((r) => r.id === id).length === 0;
    // const text = inProgressTest ? 'Continue Recipe' : 'Start Recipe';
    const test = true
    if (test) {
      return (
        <button
          className="finish-recipe-btn"
          name="Finish Recipe"
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ endRecipe }
        >
          Finish Recipe
        </button>);
    }
  }
  
  function renderDetails() {
    if (recipe !== null) {
      const { img,
        title, category, ingredients, measures, instructions, video } = recipe;
      return (
        <div>
          <img data-testid="recipe-photo" className="details-img" src={img} />
          <h3 data-testid="recipe-title" >{title}</h3>
          <h3 data-testid="recipe-category" >{category}</h3>
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
          {console.log(ingredients)}
          {ingredients.map((i, index) => {
            return (
            <label key={index} htmlFor={i}>
              {i + '-' + measures[index]}
              <input data-testid={`${index}-ingredient-step`} type="checkbox" value={i} />

            </label>
            )
          })}
          <h4 data-testid="instructions" >{instructions}</h4>
        </div>
      );
    }
  }

  useEffect(() => {
    getDetails();
    getIsFavorite();
  }, []);

  return (
    <main>
      {renderDetails()}
      {renderEndRecipe()}
    </main>
  );
}

export default RecipeInProgress;
