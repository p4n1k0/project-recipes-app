// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  // const [state, setState] = useState({
  //   btnDisabled: true,
  //   recipes: []
  // });
  // useEffect(() => {
  //   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`)
  //     .then((response) => response.json());
  // }, []);
  const data = {
    recipes: []
  };

  return (
    // <MyContext.Provider value={ { ...state, setState } }>
    <MyContext.Provider value={ data }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
