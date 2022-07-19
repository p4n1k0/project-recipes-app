import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

jest.spyOn(global, 'alert').mockImplementation(fetch);

describe('Testa a tela de receitas', () => {
  test('testa os botões de categoria de /foods', async () => {
    renderWithRouter(<App />, '/foods')
    const beefBtn = await screen.findByTestId('Beef-category-filter')
    userEvent.click(beefBtn)

    const allBtn = await screen.findByTestId('All-category-filter')
    userEvent.click(allBtn)
    
    userEvent.click(beefBtn)
    userEvent.click(beefBtn)

  });
  test('testa os botões de categoria de /drinks', async () => {
    renderWithRouter(<App />, '/drinks')
    const ordBtn = await screen.findByTestId('Ordinary Drink-category-filter')
    userEvent.click(ordBtn)

    const allBtn = await screen.findByTestId('All-category-filter')
    userEvent.click(allBtn)

    userEvent.click(ordBtn)
    userEvent.click(ordBtn)

  });
});