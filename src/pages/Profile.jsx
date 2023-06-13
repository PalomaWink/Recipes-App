import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import context from '../context/Context';

export default function Profile(props) {
  const { history } = props;
  const { headerState, setHeaderState } = useContext(context);
  const { email } = JSON.parse(localStorage.user);

  useEffect(() => {
    const updateState = () => {
      setHeaderState({ ...headerState,
        title: 'Profile',
        renderHeader: false });
    };
    updateState();
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div>
      <Header />

      <h3 data-testid="profile-email">{email}</h3>

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <br />

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <br />

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Logout
      </button>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string,
  }),
}.isRequired;
