import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  let userEmail = localStorage.getItem('user');
  if (userEmail) {
    userEmail = JSON.parse(userEmail).email;
  } else {
    userEmail = 'test@test.com';
    localStorage.setItem('user', '{"email": "test@test.com"}');
  }

  // const userKey = localStorage.getItem('user');
  // const userEmail = JSON.parse(userKey);
  console.log(userEmail);

  function onLogoutClick() {
    history.push('/');
    localStorage.clear();
  }
  return (
    <main className="main-profile">
      <Header />
      <div className="profile-buttons">
        <h2 data-testid="profile-email">{userEmail}</h2>
        <div>
          <button
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => history.push('done-recipes') }
          >
            Done Recipes

          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => history.push('favorite-recipes') }
          >
            Favorite Recipes

          </button>
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ onLogoutClick }
          >
            Logout

          </button>

        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Profile;
