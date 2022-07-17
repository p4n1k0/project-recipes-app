import React, { useContext } from 'react';
import context from '../contex/myContext';

function RecipeCard({ index }) {

  return (
    <div data-testid={`${index}-recipe-card`}>
      <img data-testid={`${index}-card-img`} src={srcUrl} />
      <h4 data-testid={`${index}-card-name`} >{name}</h4>
    </div>
  );
}

export default RecipeCard;