// import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import context from '../context/Context';

// importar para o header e criar estados locais
function SearchBar() {
  const { searchForFoods, setSearchForFoods } = useContext(context);

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
          value={ searchForFoods.inputTextSearchFoods }
          placeholder="Search"
          onChange={ handleChangeColuns }
        />
      </label>
      <label htmlFor="inputRadioIngredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="inputRadioIngredient"
          name="inputRadio"
          value="Ingredient"
          checked={ searchForFoods.inputRadio === 'Ingredient' }
          onChange={ handleChangeColuns }
        />
      </label>
      <label htmlFor="inputRadioIngredient">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          id="inputRadioName"
          name="inputRadio"
          value="Name"
          checked={ searchForFoods.inputRadio === 'Name' }
          onChange={ handleChangeColuns }
        />
      </label>
      <label htmlFor="inputFirstLetter">
        First letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="inputFirstLetter"
          name="inputRadio"
          value="FirstLetter"
          checked={ searchForFoods.inputRadio === 'FirstLetter' }
          onChange={ handleChangeColuns }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {} }
      >
        Search
      </button>
    </div>
  );
}

// SearchBar.propTypes = {
//   valueInputText: PropTypes.string.isRequired,
//   valueInputRadio: PropTypes.string.isRequired,
//   handleChange: PropTypes.func.isRequired,
//   fetchFood: PropTypes.func.isRequired,
// };

export default SearchBar;
