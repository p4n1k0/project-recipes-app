import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from '../contex/myProvider';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  // console.log(history.location.pathname)
  return {
    ...render(
      <Router history={ history }>
        <Provider>
          {component}
        </Provider>
      </Router>
    ),
    history
  };
};

export default renderWithRouter;
