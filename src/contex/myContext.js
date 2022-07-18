import { createContext } from 'react';

const context = createContext({
  btnDisabled: true,
  recipes: [],
});

export default context;
