import React, { useState } from 'react'; // useContext,
import { useHistory } from 'react-router-dom';
// import MyContext from '../contex/myContext';

function LoginPage() {
  // const setState = useContext(MyContext); // recebe o value provido pelo Contexto
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  function handleChange({ target }) {
    setLogin({
      ...login, [target.name]: target.value,
    });
  }

  function onClickButton() {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  }

  function isButtonDisabled() {
    const SIX = 6;
    const test = /^(\w|\.)+@[a-z]+\.com$/
      .test(login.email);
    return !(login.password.length > SIX && test);
  }

  return (
    <main>
      {/* { console.log('login', login)} */}
      <form>
        <h2>Login</h2>
        <input
          autoComplete="current-email"
          name="email"
          data-testid="email-input"
          id="login"
          type="email"
          value={ login.email }
          placeholder="Digite seu email"
          onChange={ handleChange }
        />
        <input
          autoComplete="current-password"
          name="password"
          data-testid="password-input"
          id="password"
          value={ login.password }
          type="password"
          placeholder="Digite sua senha"
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled() }
          onClick={ onClickButton }
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
