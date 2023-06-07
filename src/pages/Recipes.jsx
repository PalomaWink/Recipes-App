import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import context from '../context/Context';
import SearchBar from '../components/SearchBar';

export default function Recipes(props) {
  const { history: { location: { pathname } } } = props;
  const { headerState,
    setHeaderState, notSearch } = useContext(context);

  useEffect(() => {
    const updateState = () => {
      setHeaderState({ ...headerState,
        title: pathname === '/meals' ? 'Meals' : 'Drinks' });
    };
    updateState();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      <Header />
      { notSearch && <SearchBar />}
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
