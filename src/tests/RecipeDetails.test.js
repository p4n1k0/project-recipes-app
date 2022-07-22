import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa a tela RecipeDetails', () => {
  test('Testa a página de detalhes de comidas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const firstImg = await screen.findByTestId('0-card-img');
    fireEvent.click(firstImg);

    const imgMeal = await screen.findByRole('img', {  name: /corba/i});
    const ingredients = screen.getAllByRole('list');
    const video = screen.getByTitle(/embedded youtube/i);
    const startRecipeBtn = screen.getByRole('button', { name: /start recipe/i });    
    
    expect(imgMeal).toBeInTheDocument();    
    expect(ingredients).toHaveLength(1);    
    expect(video).toBeInTheDocument();    
    expect(startRecipeBtn).toBeInTheDocument();
  });

  test('Testa a página de detalhes de bebidas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const firstImg = await screen.findByTestId('0-card-img');
    fireEvent.click(firstImg);

    const imgDrink = await screen.findByRole('img', {  name: /gg/i});
    const ingredients = screen.getAllByRole('list');
    const startRecipeBtn = screen.getByRole('button', {  name: /start recipe/i});

    expect(imgDrink).toBeInTheDocument();    
    expect(ingredients).toHaveLength(1);   
    expect(startRecipeBtn).toBeInTheDocument();
  });
});