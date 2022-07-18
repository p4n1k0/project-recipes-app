import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o Header', () => {
  test('testa se o titulo esta correto', () => {
    renderWithRouter(<App />, '/foods');
    const title = screen.getByTestId('page-title')
    expect(title).toHaveTextContent('Foods')
  });
  test('testa o botão de profile', () => {
    const { history } = renderWithRouter(<App />, '/foods');
    const pBtn = screen.getByTestId('profile-top-btn')
    userEvent.click(pBtn)
    expect(history.location.pathname).toBe('/profile')
    const title = screen.getByTestId('page-title')
    expect(title).toHaveTextContent('Profile')
  });
  test('testa o botão de pesquisa', () => {
    renderWithRouter(<App />, '/foods');
    const sBtn = screen.getByTestId('search-top-btn')
    userEvent.click(sBtn)
    const sBar = screen.getByTestId('search-input')
    expect(sBar).toBeInTheDocument()
  });
  test('testa o titulo com mais de uma palavra', () => {
    const { history } = renderWithRouter(<App />, '/done-recipes');
    expect(history.location.pathname).toBe('/done-recipes')
    const title = screen.getByTestId('page-title')
    expect(title).toHaveTextContent('Done Recipes')
  });
});
