import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import context from '../context/Context';

export default function Profile() {
  const { headerState, setHeaderState, email } = useContext(context);

  useEffect(() => {
    const updateState = () => {
      setHeaderState({ ...headerState,
        title: 'Profile',
        renderHeader: false });
    };
    updateState();
  }, []);
  return (
    <div>
      <Header />

      <h3 data-testid="profile-email">{email}</h3>

      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <br />

      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <br />

      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
    </div>
  );
}
