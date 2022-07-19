import React, { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import context from '../contex/myContext';

const MAX_REC = 6

function RecipeDetails({ match: {params: { id} } }) {
  const history = useHistory();
  const { data, setData } = useContext(context);
  const [recipe, setRecipe] = useState(null)
  const [recs, setRecs] = useState([])

  useEffect(() => {
    const ind = (history.location.pathname.includes('foods'))
      ? fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=`)
      : fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
      let recs = null
    if (ind !== null) {
      ind
        .then((response) => response.json())
        .then((json) => {
          const typeKey = Object.keys(json)[0];
          // console.log(json)
          // recs = json[typeKey]
          setRecs(json[typeKey])
        });
    }

    const result = (history.location.pathname.includes('foods'))
      ? fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      : fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (result !== null) {
      result
        .then((response) => response.json())
        .then((json) => {
          // const typeKey = Object.keys(json)[0];
          const typeKey = history.location.pathname.includes('/foods') ? 'Meal' : 'Drink';
          const pageName = typeKey === 'Meal' ? 'meals' : 'drinks';
          console.log(json)
          console.log(json[pageName][0], pageName)
          const r = json[pageName][0]
          console.log(r)
          const ingredients = []
          Object.entries(r).map((entrie) => {
            if (entrie[0].includes('strIngredient') && entrie[1] !== null) {
              ingredients.push(entrie[1])
            }
          })
          const measures = []
          Object.entries(r).map((entrie) => {
            if (entrie[0].includes('strMeasure') && entrie[1] !== null) {
              measures.push(entrie[1])
            }
          })
          const instructions = []
          Object.entries(r).map((entrie) => {
            if (entrie[0].includes('strInstructions') && entrie[1] !== null) {
              instructions.push(entrie[1])
            }
          })
          setRecipe({
            img: r['str' + typeKey + 'Thumb'],
            title: r['str' + typeKey],
            category: pageName === 'meals' ? r.strCategory : r.strAlcoholic,
            ingredients,
            measures,
            instructions,
            video: pageName === 'meals' ? r.strYoutube.split('=')[1] : null,
            recomendacions: recs === null ? [] : recs.slice(0, MAX_REC)
          })
        });
    }
  }, [data.updateRecipeDetails]);

  function getCards() {
    const recipes = recs.slice(0, MAX_REC) // !== undefined ? data.recipes.slice(0, MAX_RECIPES) : [];// data.recipes
    const typeKey = history.location.pathname.includes('foods') ? 'Drink' : 'Meal';
    const pathname = history.location.pathname.includes('foods') ? '/drinks' : '/foods';
    console.log(recipes, history.location.pathname, typeKey);
    const temp = recipes.map((r, index) => (
      <Link onClick={() => setData({...data, updateRecipeDetails: !data.updateRecipeDetails})} key={ index } to={ `${pathname}/${r[`id${typeKey}`]}` }>
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

  function getDetails() {
    if (recipe !== null) {
      const { img, title, category, ingredients, measures, instructions, video, recomendacions } = recipe
      return (
        <div>
          <h2 data-testid="recipe-title" >{title}</h2>
          <h3 data-testid="recipe-category" >{category}</h3>
          <img data-testid="recipe-photo" alt="recipe" src={img} />
          {ingredients.map((i, index) => {
            return <h4 data-testid={`${index}-ingredient-name-and-measure`} key={index} >{i + ' ' + measures[index]}</h4>
          })}
          <h4 data-testid="instructions" >{instructions[0]}</h4>
          {video &&
          <iframe data-testid="video" width="420" height="315"
          src={`https://www.youtube.com/embed/${video}`}>
          </iframe>}

          {getCards()}

        </div>
      )
    }
  }

  return (
    <main>
      <p>Recipe Details</p>
      {getDetails()}
    </main>
  );
}

export default RecipeDetails;
