import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login(props) {
  const { history } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    const regex = /\w+@\w+\.\w{2,8}(\.\w{0,2})?/g;
    const validateEmail = regex.test(email);
    const minPass = 6;

    if (!(validateEmail && password.length >= minPass)) return true;
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <section>
      <input
        type="email"
        value={ email }
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
        placeholder="Insira seu Email"
      />
      <br />
      <input
        type="password"
        value={ password }
        data-testid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
        placeholder="Insira sua Senha"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ validateInputs() }
        onClick={ handleSubmit }
      >
        Entrar
      </button>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string,
  }),
}.isRequired;

export default Login;
