import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Provider from '../contex/myProvider';

describe('Testa a barra de pesquisa para /foods', () => {
  const renderFoodsPage = () => {
    renderWithRouter(<Provider><App /></Provider>, '/foods');
    const sBtn = screen.getByTestId('search-top-btn')
    userEvent.click(sBtn)
  }
  test('testa o botão de pesquisa para varios items', async () => {
    renderFoodsPage()
    const iBtn = screen.getByTestId('ingredient-search-radio')
    userEvent.click(iBtn)
    const sInput = screen.getByTestId('search-input')
    userEvent.type(sInput, 'onion')
    const sBtn = screen.getByTestId('exec-search-btn')
    userEvent.click(sBtn)
    expect() //Recipe Cards
  });
  test('testa o botão de pesquisa para um unico item', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>, '/foods');
    userEvent.click(screen.getByTestId('search-top-btn'))

    const iBtn = screen.getByTestId('name-search-radio')
    userEvent.click(iBtn)
    const sInput = screen.getByTestId('search-input')
    userEvent.type(sInput, 'big mac')
    const sBtn = screen.getByTestId('exec-search-btn')
    userEvent.click(sBtn)
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/53013')
    }, { timeout: 1000, interval: 100 })
  });
  test('testa os radio buttons de pesquisa', async () => {
    renderFoodsPage()
    const sInput = screen.getByTestId('search-input')
    const sBtn = screen.getByTestId('exec-search-btn')

    userEvent.click(screen.getByTestId('first-letter-search-radio'))
    userEvent.type(sInput, 'o')
    userEvent.click(sBtn)

    userEvent.click(screen.getByTestId('ingredient-search-radio'))
    userEvent.type(sInput, 'nion')
    userEvent.click(sBtn)

    userEvent.click(screen.getByTestId('name-search-radio'))
    userEvent.click(sBtn)
  });
  test('testa o alerta de first-letter-search-radio', async () => {
    renderFoodsPage()
    jest.spyOn(global, 'alert').mockImplementation((message) => message);

    const sInput = screen.getByTestId('search-input')
    const sBtn = screen.getByTestId('exec-search-btn')

    userEvent.click(screen.getByTestId('first-letter-search-radio'))
    userEvent.type(sInput, 'onion')
    userEvent.click(sBtn)
    await waitFor(() => expect(alert).toHaveBeenCalledWith("Your search must have only 1 (one) character"))

  });
  test('testa o alerta de null result para /foods', async () => {
    renderFoodsPage()
    jest.spyOn(global, 'alert').mockImplementation((message) => message);

    userEvent.click(screen.getByTestId('name-search-radio'))
    userEvent.type(screen.getByTestId('search-input'), 'hgdxfgs')
    userEvent.click(screen.getByTestId('exec-search-btn'))

    await waitFor(() => expect(alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'))
  });
  test('testa o alerta de null result para /drinks', async () => {
    renderWithRouter(<Provider><App /></Provider>, '/drinks');
    const sBtn = screen.getByTestId('search-top-btn')
    userEvent.click(sBtn)

    jest.spyOn(global, 'alert').mockImplementation((message) => message);

    userEvent.click(screen.getByTestId('name-search-radio'))
    userEvent.type(screen.getByTestId('search-input'), 'hgdxfgs')
    userEvent.click(screen.getByTestId('exec-search-btn'))

    await waitFor(() => expect(alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'))
  });
});
//Testa a barra de pesquisa para /drinks

describe('Testa a barra de pesquisa para /drinks', () => {
  const renderFoodsPage = () => {
    renderWithRouter(<Provider><App /></Provider>, '/drinks');
    const sBtn = screen.getByTestId('search-top-btn')
    userEvent.click(sBtn)
  }
  test('testa o botão de pesquisa para varios items', async () => {
    renderFoodsPage()
    const iBtn = screen.getByTestId('ingredient-search-radio')
    userEvent.click(iBtn)
    const sInput = screen.getByTestId('search-input')
    userEvent.type(sInput, 'onion')
    const sBtn = screen.getByTestId('exec-search-btn')
    userEvent.click(sBtn)
    expect() //Recipe Cards
  });
  test('testa o botão de pesquisa para um unico item', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>, '/drinks');
    userEvent.click(screen.getByTestId('search-top-btn'))

    const iBtn = screen.getByTestId('name-search-radio')
    userEvent.click(iBtn)
    const sInput = screen.getByTestId('search-input')
    userEvent.type(sInput, 'boston sour')
    const sBtn = screen.getByTestId('exec-search-btn')
    userEvent.click(sBtn)
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/11129'), {timeout: 1000, interval: 200})
    
  });
  test('testa os radio buttons de pesquisa', async () => {
    renderFoodsPage()
    const sInput = screen.getByTestId('search-input')
    const sBtn = screen.getByTestId('exec-search-btn')

    userEvent.click(screen.getByTestId('first-letter-search-radio'))
    userEvent.type(sInput, 'l')
    userEvent.click(sBtn)

    userEvent.click(screen.getByTestId('ingredient-search-radio'))
    userEvent.type(sInput, 'emon')
    userEvent.click(sBtn)

    userEvent.click(screen.getByTestId('name-search-radio'))
    userEvent.click(sBtn)
  });
  test('testa o alerta de first-letter-search-radio', async () => {
    renderFoodsPage()
    jest.spyOn(global, 'alert').mockImplementation((message) => message);

    const sInput = screen.getByTestId('search-input')
    const sBtn = screen.getByTestId('exec-search-btn')

    userEvent.click(screen.getByTestId('first-letter-search-radio'))
    userEvent.type(sInput, 'lemon')
    userEvent.click(sBtn)
    await waitFor(() => expect(alert).toHaveBeenCalledWith("Your search must have only 1 (one) character"))

  });
  // test('testa o alerta de null result', async () => {
  //   renderFoodsPage()
  //   jest.spyOn(global, 'alert').mockImplementation((message) => message);

  //   userEvent.click(screen.getByTestId('name-search-radio'))
  //   userEvent.type(screen.getByTestId('search-input'), 'hgdxfgs')
  //   userEvent.click(screen.getByTestId('exec-search-btn'))

  //   await waitFor(() => expect(alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.'))
  // });
});