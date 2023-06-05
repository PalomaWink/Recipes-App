import React, { useMemo, useState } from 'react';
import Context from './Context';
import profileIcon from '../images/profileIcon.svg'
import searchIcon from '../images/searchIcon.svg'

const INICIAL_STATE = {
  email: '',
  name: '',
};

function Provider({ children }) {
  const [state, setState] = useState(INICIAL_STATE);
  const [notSearch, setNotSearch] = useState(true);
  const [headerState, setHeaderState] = useState({
    profile: profileIcon, search: searchIcon, renderHeader: true, title: '' });

  const value = useMemo(
    () => ({
      state, setState, headerState, setHeaderState, notSearch, setNotSearch }),
    [state, setState, headerState, setHeaderState, notSearch, setNotSearch],
  );
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
