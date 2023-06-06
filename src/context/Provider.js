import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const INICIAL_STATE = {
  email: '',
  name: '',
};

const INICIAL_STATE_FOOD = {
  inputTextSearchFoods: '',
  inputRadioFoods: '',
  ingredientFoods: [],
  nameFoods: [],
  firstLatterFoods: [],
};

const INICIAL_STATE_DRINKS = {
  inputTextSearchDrinks: '',
  inputRadioDrinks: '',
  ingredientDrinks: [],
  nameDrinks: [],
  firstLatterDrinks: [],
};

const message = 'Sorry, we haven\'t found any recipes for these filters.';

function Provider({ children }) {
  const [state, setState] = useState(INICIAL_STATE);
  const [searchForFoods, setSearchForFoods] = useState(INICIAL_STATE_FOOD);
  const [searchForDrinks, setSearchForDrinks] = useState(INICIAL_STATE_DRINKS);

  // chamar a função no botão e compartilhar o estado nos headers adjacentes
  const fetchDataFoods = async (search, inputText) => {
    // além de pegar o valor do inputradio, deve linkar do input txt
    const URL_INGREDIENT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`;
    const URL_NAME = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    const URL_FIRST_LETTER = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`;

    if (search === 'Ingredient') {
      const result = await fetch(URL_INGREDIENT);
      const data = await result.json();
      // console.log(searchForFoods);
      if (data.length === 0) {
        global.alert(message);
      }
      setSearchForFoods([{ ingredientFoods: data.meals[0] }]);
    }
    if (search === 'Name') {
      const result = await fetch(URL_NAME);
      const data = await result.json();
      if (data.length === 0) {
        global.alert(message);
      }
      setSearchForFoods([{ nameFoods: data.meals[0] }]);
    }
    if (search === 'FirstLetter') {
      if (inputText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const result = await fetch(URL_FIRST_LETTER);
      const data = await result.json();
      setSearchForFoods([{ firstLatterFoods: data.meals[0] }]);
    }
  };

  // chamar a função no botão e compartilhar o estado nos headers adjacentes
  const fetchDataDrinks = async (search, inputText) => {
    // além de pegar o valor do inputradio, dv linkar do input txt
    const URL_INGREDIENT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`;
    const URL_NAME = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;
    const URL_FIRST_LETTER = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`;
    if (search === 'Ingredient') {
      const result = await fetch(URL_INGREDIENT);
      const data = await result.json();
      if (data.length === 0) {
        global.alert(message);
      }
      setSearchForFoods([{ ingredientFoods: data.meals[0] }]);
    }
    if (search === 'Name') {
      const result = await fetch(URL_NAME);
      const data = await result.json();
      if (data.length === 0) {
        global.alert(message);
      }
      setSearchForFoods([{ nameFoods: data.meals[0] }]);
    }
    if (search === 'FirstLetter') {
      if (inputText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const result = await fetch(URL_FIRST_LETTER);
      const data = await result.json();
      setSearchForFoods([{ firstLatterFoods: data.meals[0] }]);
    }
  };

  // teste da função para ver se está sendo chamada corretamente
  useEffect(() => {
    fetchDataFoods('Ingredient', 'chicken');
  }, []);

  const value = useMemo(() => ({
    state,
    setState,
    searchForFoods,
    setSearchForFoods,
    searchForDrinks,
    setSearchForDrinks,
    fetchDataDrinks,
    fetchDataFoods,
  }), [state, searchForFoods, searchForDrinks]);

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default Provider;
