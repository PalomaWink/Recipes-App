import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import context from '../context/Context';
import SearchBar from '../components/SearchBar';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

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
      {
        (headerState.title === 'Meals') ? <Meals />
          : <Drinks />
      }

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
