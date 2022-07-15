import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '../pages/Login';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a tela de Login', () => {
  test('testa os inputs e o botão', () => {
    render(<LoginPage />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(inputPassword).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });

  test('testa se o button esta habilitado', async () => {
    renderWithRouter(<App />);
    const email = 'tryber@teste.com';
    const eInput = screen.getByTestId('email-input')
    userEvent.type(eInput, email);
    const pInput = screen.getByTestId('password-input')
    userEvent.type(pInput, '1234567');
    const lBtn = screen.getByTestId('login-submit-btn')
    userEvent.click(lBtn);
    const title = await screen.findByTestId('page-title')
    expect(title).toHaveTextContent('Food')
  });
});
