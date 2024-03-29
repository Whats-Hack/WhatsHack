/* eslint-disable react/prop-types */
// ! modules
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// ? api
import mainApi from '../../Api/main.api';

export default function Login({ setCurrentUser }) {
  // ? useStates
  const [errorMessage, setErrorMessage] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // ? functions
  function handleSubmit(e) {
    e.preventDefault();

    if (!username.length || !password.length) {
      return setErrorMessage('Username and password are required');
    }

    mainApi
      .signin({
        username: username,
        password: password,
      })
      .then((res) => {
        setCurrentUser((preState) => {
          return { ...preState, ...{ token: res.token }, ...res.data };
        });
        localStorage.setItem('token', res.token);

        navigate('/chats');
      })
      .catch((errRes) => {
        setErrorMessage(errRes.error);
      });
  }

  return (
    <div className='login_container'>
      <h2>Login :</h2>
      <p className='welcome_small_p'>
        You don&apos;t have a account ? Click{' '}
        <NavLink to={'/register'} className='welcome_a'>
          here
        </NavLink>{' '}
        to create one
      </p>
      <form className='welcome_form' onSubmit={handleSubmit}>
        <div className='welcome_form_input'>
          <p>Username: </p>
          <input
            className='welcome_input'
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='welcome_form_input'>
          <p>Password: </p>
          <input
            className='welcome_input'
            type='password'
            name='username'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='welcome_button' type='submit'>
          CONNECT
        </button>
      </form>
      <p className='welcome_error'>{errorMessage}</p>
    </div>
  );
}
