import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import Provider from './contex/myProvider';

function App() {
  return (
    <Provider>
      <LoginPage />
    </Provider>
  );
}

export default App;
