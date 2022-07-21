import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o Profile', () => {

    test('faz o caminho até a pagina profile', async () => {
        const { history } = renderWithRouter(<App />);
        const email = 'tryber@teste.com';
        const eInput = screen.getByTestId('email-input')
        userEvent.type(eInput, email);
        const pInput = screen.getByTestId('password-input')
        userEvent.type(pInput, '1234567');
        const lBtn = screen.getByTestId('login-submit-btn')
        userEvent.click(lBtn);
        const title = await screen.findByTestId('page-title')
        expect(title).toHaveTextContent('Food')
        const gotoProfile = screen.getByTestId('btn-profile')
        userEvent.click(gotoProfile)
        expect(history.location.pathname).toBe('/profile')

      });

  test('testa o botão de login', async () => {
    const { history } = renderWithRouter(<App />, '/profile');
    
    userEvent.click(screen.getByTestId('profile-logout-btn'))
    await waitFor(() => {
        expect(history.location.pathname).toBe('/')
    }, { timeout: 1000, interval: 100 })
  });

  test('faz o caminho até a pagina profile', async () => {
    const { history } = renderWithRouter(<App />);
    const email = 'tryber@teste.com';
    const eInput = screen.getByTestId('email-input')
    userEvent.type(eInput, email);
    const pInput = screen.getByTestId('password-input')
    userEvent.type(pInput, '1234567');
    const lBtn = screen.getByTestId('login-submit-btn')
    userEvent.click(lBtn);
    const title = await screen.findByTestId('page-title')
    expect(title).toHaveTextContent('Food')
    const gotoProfile = screen.getByTestId('btn-profile')
    userEvent.click(gotoProfile)
    expect(history.location.pathname).toBe('/profile')

  });

  test('testa o botão de done-recipes', async () => {
    const { history } = renderWithRouter(<App />, '/profile');
    
    userEvent.click(screen.getByTestId('profile-done-btn'))
    await waitFor(() => {
        expect(history.location.pathname).toBe('/done-recipes')
    }, { timeout: 1000, interval: 100 })
  });

  test('testa o botão de favorites', async () => {
    const { history } = renderWithRouter(<App />, '/profile');
    
    userEvent.click(screen.getByTestId('profile-favorite-btn'))
    await waitFor(() => {
        expect(history.location.pathname).toBe('/favorite-recipes')
    }, { timeout: 1000, interval: 100 })
  });
  
});

