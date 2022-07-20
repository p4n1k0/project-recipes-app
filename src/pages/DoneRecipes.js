import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  return (
    <div>
      <Header />
      <div>
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
        {
          doneRecipes.map((recipe, index) => (
            recipe.type === 'food' ? (
              <div key={ index }>
                <img
                  src={ `${recipe.image}` }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { `${recipe.nationality} - ${recipe.category}` }
                </p>
                <p data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  { recipe.doneDate }
                </p>
                {
                  recipe.tags.map((tagType) => (
                    <div
                      key={ tagType }
                      data-testid={ `${index}-${tagType}-horizontal-tag` }
                    >
                      { tagType }
                    </div>
                  ))
                }
                <button type="button">
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Botão de compartilhamento"
                  />
                </button>
              </div>
            ) : (
              <div key={ index }>
                <img
                  src={ `${recipe.image}` }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { recipe.alcoholicOrNot }
                </p>
                <p data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>
                  { recipe.doneDate }
                </p>
                <button type="button">
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Botão de compartilhamento"
                  />
                </button>
              </div>
            )
          ))
        }
      </div>
    </div>
  );
}
