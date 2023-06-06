import PropTypes from 'prop-types';

// importar para o header e criar estados locais
function SearchBar({ valueInputText, valueInputRadio, handleChange, fetchFood }) {
  return (
    <div>
      <label htmlFor="inputSearch">
        <input
          type="text"
          id="inputSearch"
          name="inputSearch"
          value={ valueInputText }
          placeholder="Search"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="inputRadioIngredient">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="inputRadioIngredient"
          name="inputRadioIngredient"
          value="Ingredient"
          checked={ valueInputRadio === 'Ingredient' }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="inputRadioIngredient">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          id="inputRadioName"
          name="inputRadioName"
          value="Name"
          checked={ valueInputRadio === 'Name' }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="inputFirstLetter">
        First letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="inputFirstLetter"
          name="inputFirstLetter"
          value="FirstLetter"
          checked={ valueInputRadio === 'FirstLetter' }
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ fetchFood }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  valueInputText: PropTypes.string.isRequired,
  valueInputRadio: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  fetchFood: PropTypes.func.isRequired,
};

export default SearchBar;
