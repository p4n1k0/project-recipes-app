import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  // console.log(history.location.pathname)
  return {
    ...render(
      <Router history={ history }>
        {component}
      </Router>
    ),
    history
  };
};

export default renderWithRouter;
