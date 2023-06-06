import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const INICIAL_STATE = {
  email: '',
  name: '',
};

function Provider({ children }) {
  const [state, setState] = useState(INICIAL_STATE);

  const value = useMemo(() => ({ state, setState }), [state, setState]);

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
