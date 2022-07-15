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

  test('testa se o button esta habilitado', () => {
    renderWithRouter(<App />);
    const email = 'main-group-18@gmail.com';
    userEvent.type(screen.getByTestId('email-input'), email);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });
});
