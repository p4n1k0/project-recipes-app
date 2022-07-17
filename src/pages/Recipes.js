import React, { useContext, useState, useEffect } from 'react';
import context from '../contex/myContext';
import Header from '../components/Header';

function Recipes() {

  const data = useContext(context)

  function getCards() {
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
      setRecipes(data.recipes)
    }, []);
    console.log(data.recipes)
    return data.recipes
  }

  const recipes = getCards()

  return (
    <main>
      <Header />
      {recipes !== [] &&
      recipes.map((recipe) => {
        console.log()
      })}
    </main>
  );
}

export default Recipes;
