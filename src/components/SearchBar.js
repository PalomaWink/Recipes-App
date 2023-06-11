import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import context from '../context/Context';

// importar para o header e criar estados locais

export default function SearchBar() {
  const { searchForFoods, setSearchForFoods, fetchData } = useContext(context);
  const location = useLocation();

  const { inputSearch, inputRadio } = searchForFoods;
  const searchApi = async () => {
    if (location.pathname === '/meals') {
      await fetchData(inputRadio, inputSearch);
    }
    if (location.pathname === '/drinks') {
      await fetchData(inputRadio, inputSearch);
    }
  };

  const handleChangeColuns = ({ target }) => {
    setSearchForFoods({
      ...searchForFoods, [target.name]: target.value });
  };
  return (
    <div>
      <label htmlFor="inputSearch">
        <input
          type="text"
          id="inputSearch"
          name="inputSearch"
          data-testid="search-input"
          value={ searchForFoods.inputSearch }
          placeholder="Search"
          onChange={ handleChangeColuns }
        />
      </label>
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        id="inputRadioIngredient"
        name="inputRadio"
        value="Ingredient"
        checked={ searchForFoods.inputRadio === 'Ingredient' }
        onChange={ handleChangeColuns }
      />
      <label htmlFor="inputRadioIngredient">Ingredient</label>

      <input
        data-testid="name-search-radio"
        type="radio"
        id="inputRadioName"
        name="inputRadio"
        value="Name"
        checked={ searchForFoods.inputRadio === 'Name' }
        onChange={ handleChangeColuns }
      />
      <label htmlFor="inputRadioName">Name</label>
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        id="inputFirstLetter"
        name="inputRadio"
        value="FirstLetter"
        checked={ searchForFoods.inputRadio === 'FirstLetter' }
        onChange={ handleChangeColuns }
      />
      <label htmlFor="inputFirstLetter">First letter</label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchApi }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
}.isRequired;
