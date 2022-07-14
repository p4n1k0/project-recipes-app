import React, { useContext, useState } from 'react';
import MyContext from '../contex/myContext';

function LoginPage() {
  const setState = useContext(MyContext); // recebe o value provido pelo Contexto
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  function handleChange({ target }) {
    setLogin({
      ...login, [target.name]: target.value,
    //   email: target.value,
    //   password: target.value,
    });
  }

  function onClickButton() {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  }

  function isButtonDisabled() {
    const SIX = 6;
    const test = /^(\w|\.)+@[a-z]+\.com$/
      .test(login.email);
    return !(login.password.length > SIX && test);
  }

  return (
    <main>
      { console.log('login', login)}
      <form>
        <label htmlFor="login">
          <input
            name="email"
            data-testid="email-input"
            id="login"
            type="email"
            value={ login.email }
            placeholder="Digite seu email"
            onChange={ (e) => handleChange(e) }
          />
          <input
            name="password"
            data-testid="password-input"
            id="login"
            value={ login.password }
            type="password"
            placeholder="Digite sua senha"
            onChange={ (e) => handleChange(e) }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ isButtonDisabled() }
            onClick={ onClickButton }
          >
            Entrar
          </button>
        </label>
      </form>
    </main>
  );
}

export default LoginPage;
