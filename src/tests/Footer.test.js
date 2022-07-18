import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Provider from '../contex/myProvider';

describe('Testa a barra de navegação', () => {
  test('testa o botão meal', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>, '/foods');
    userEvent.click(screen.getByTestId('drinks-bottom-btn'))
    // expect(history.location.pathname).toBe('/drinks')
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks')
    }, { timeout: 1000, interval: 100 })

    userEvent.click(screen.getByTestId('food-bottom-btn'))
    expect(history.location.pathname).toBe('/foods')
  });
});