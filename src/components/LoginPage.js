import React from 'react';

function LoginPage() {
  return (
    <main>
      <form>
        <label htmlFor="login">
          <input
            name="email"
            data-testid="email-input"
            id="login"
            type="email"
            placeholder="Digite seu email"
          />
          <input
            name="password"
            data-testid="password-input"
            id="login"
            type="password"
            placeholder="Digite sua senha"
          />
          <button
            type="button"
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </label>
      </form>
    </main>
  );
}

export default LoginPage;
