import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function RecipeInProgress({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState(null);
  const history = useHistory()

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
  
  function renderDetails() {
    if (recipe !== null) {
      const { img,
        title, category, ingredients, measures, instructions, video } = recipe;
      return (
        <div>
          <img data-testid="recipe-photo" className="details-img" src={img} />
        </div>
      );
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <main>
      {renderDetails()}
    </main>
  );
}

export default RecipeInProgress;
