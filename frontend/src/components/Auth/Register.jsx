/* eslint-disable react/prop-types */
// ! modules
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

// ? api
import mainApi from '../../Api/main.api';

export default function Register({ setCurrentUser }) {
  // ? useStates
  const [errorMessage, setErrorMessage] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');

  const navigate = useNavigate();

  // ? functions
  function handleSubmit(e) {
    e.preventDefault();

    if (!username.length || !password.length) {
      return setErrorMessage('Username and password are required');
    }

    mainApi
      .signup({
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        avatar: avatar,
        birthday: birthday,
        city: city,
      })
      .then((res) => {
        setCurrentUser((preState) => {
          return { ...preState, ...{ token: res.token }, ...res.data };
        });
        localStorage.setItem('token', res.token);
        navigate('/users');
      })
      .catch((errRes) => {
        setErrorMessage(errRes.error);
      });
  }

  return (
    <>
      <div className='login_container'>
        <h2>Register :</h2>
        <p className='welcome_small_p'>
          Already have a account ? Click{' '}
          <NavLink to={'/login'} className='welcome_a'>
            here
          </NavLink>{' '}
          to login
        </p>
        <form className='welcome_form' onSubmit={handleSubmit}>
          <div className='welcome_form_inputs'>
            <div className='welcome_form_input'>
              <p>
                <b>Username: </b>
              </p>
              <input
                className='welcome_input'
                type='text'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='welcome_form_input'>
              <p>
                <b>Password: </b>
              </p>
              <input
                className='welcome_input'
                type='password'
                name='username'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='welcome_form_input'>
              <p>First Name: </p>
              <input
                className='welcome_input'
                type='text'
                name='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='welcome_form_input'>
              <p>Last Name: </p>
              <input
                className='welcome_input'
                type='text'
                name='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='welcome_form_input'>
              <p>Image Link: </p>
              <input
                className='welcome_input'
                type='link'
                name='avatar'
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
            <div className='welcome_form_input'>
              <p>eMail: </p>
              <input
                className='welcome_input'
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='welcome_form_input'>
              <p>Birthday: </p>
              <input
                className='welcome_input'
                type='date'
                name='birthday'
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className='welcome_form_input'>
              <p>City: </p>
              <input
                className='welcome_input'
                type='text'
                name='city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className='welcome_form_btn'>
            <button className='welcome_button' type='submit'>
              SUBMIT
            </button>
          </div>
        </form>
        <p className='setting_error'>{errorMessage}</p>
      </div>
    </>
  );
}
