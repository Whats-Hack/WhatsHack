// ? styles
import './Settings.css';

// ! modules
import { useState } from 'react';

export default function Settings({ currentUser }) {

  const [errorMessage, setErrorMessage] = useState('');

  
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [birthday, setBirthday] = useState(currentUser.birthday);
  const [city, setCity] = useState(currentUser.city);

  function handleSubmit(e) {
    e.preventDefault();

    
  }

  return (
    <div className='setting_container'>
      <h1 className='setting_h1'>Modify {currentUser.username} user settings</h1>
      <form className='setting_form' onSubmit={handleSubmit}>
        <div className='setting_form_inputs'>
          
          <div className='setting_form_input'>
            <p>First Name: </p>
            <input
              className='setting_input'
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className='setting_form_input'>
            <p>Last Name: </p>
            <input
              className='setting_input'
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className='setting_form_input'>
            <p>Image Link: </p>
            <input
              className='setting_input'
              type='link'
              name='avatar'
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div className='setting_form_input'>
            <p>eMail: </p>
            <input
              className='setting_input'
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='setting_form_input'>
            <p>Birthday: </p>
            <input
              className='setting_input'
              type='date'
              name='birthday'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className='setting_form_input'>
            <p>City: </p>
            <input
              className='setting_input'
              type='text'
              name='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className='setting_button' type='submit'>
            SUBMIT
          </button>
        </div>
      </form>
      <p className='welcome_error'>{errorMessage}</p>
    </div>
  );
}
