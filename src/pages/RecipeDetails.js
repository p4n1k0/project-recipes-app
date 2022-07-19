import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import context from '../contex/myContext';

const MAX_REC = 6;

function RecipeDetails({ match: { params: { id } } }) {
  const history = useHistory();
  const { data, setData } = useContext(context);
  const [recipe, setRecipe] = useState(null);
  const [recs, setRecs] = useState([]);

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
      if (entrie[0].includes(key) && entrie[1] !== null) {
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
        // const typeKey = Object.keys(json)[0];
        const typeKey = history.location.pathname.includes('/foods') ? 'Meal' : 'Drink';
        const pageName = typeKey === 'Meal' ? 'meals' : 'drinks';
        // console.log(json);
        // console.log(json[pageName][0], pageName);
        const r = json[pageName][0];
        // console.log(r);
        const ingredients = [];
        setArray(r, ingredients, 'strIngredient');
        const measures = [];
        setArray(r, measures, 'strMeasure');
        const instructions = [];
        setArray(r, instructions, 'strInstructions');
        setRecipe({
          img: r[`str${typeKey}Thumb`],
          title: r[`str${typeKey}`],
          category: pageName === 'meals' ? r.strCategory : r.strAlcoholic,
          ingredients,
          measures,
          instructions,
          video: pageName === 'meals' ? r.strYoutube.split('=')[1] : null,
          recomendacions: recs === null ? [] : recs.slice(0, MAX_REC),
        });
      });
    // }
  }

  useEffect(() => {
    getRecomendation();
    getDetails();
  }, [data.updateRecipeDetails]);

  function renderCards() {
    const recipes = recs.slice(0, MAX_REC); // !== undefined ? data.recipes.slice(0, MAX_RECIPES) : [];// data.recipes
    const typeKey = history.location.pathname.includes('foods') ? 'Drink' : 'Meal';
    const pathname = history.location.pathname.includes('foods') ? '/drinks' : '/foods';
    console.log(recipes, history.location.pathname, typeKey);
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
          <h4 data-testid={ `${index}-card-name` }>
            {' '}
            {r[`str${typeKey}`]}
            {' '}
          </h4>
        </div>
      </Link>
    ));
    return temp;
  }

  function renderDetails() {
    if (recipe !== null) {
      const { img,
        title, category, ingredients, measures, instructions, video } = recipe;
      return (
        <div>
          <h2 data-testid="recipe-title">{title}</h2>
          <h3 data-testid="recipe-category">{category}</h3>
          <img data-testid="recipe-photo" alt="recipe" src={ img } />
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
            width="420"
            height="315"
            src={ `https://www.youtube.com/embed/${video}` }
          />}

          {renderCards()}

        </div>
      );
    }
  }

  return (
    <main>
      <p>Recipe Details</p>
      {renderDetails()}
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default RecipeDetails;
