/* eslint-disable react/prop-types */
// ! modules
import { useState } from 'react';

// ? styles
import './Settings.css';

// ? api
import mainApi from '../../Api/main.api';

import defaultImg from './../../assets/default_avatar.png';

export default function Settings({ currentUser, setCurrentUser }) {
  const [errorMessage, setErrorMessage] = useState('');

  // form
  const [firstName, setFirstName] = useState(isExist(currentUser.firstName));
  const [lastName, setLastName] = useState(isExist(currentUser.lastName));
  const [email, setEmail] = useState(isExist(currentUser.email));
  const [avatar, setAvatar] = useState(isExist(currentUser.avatar));
  const [birthday, setBirthday] = useState(isExist(currentUser.birthday));
  const [city, setCity] = useState(isExist(currentUser.city));
  // submit button
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  function isExist(value) {
    return value !== null ? value : undefined;
  }

  function handleSubmit(e) {
    setSubmitButtonDisabled(true);
    e.preventDefault();

    const infoToModify = {
      email: isExist(email),
      avatar: isExist(avatar),
      firstName: isExist(firstName),
      lastName: isExist(lastName),
      birthday: isExist(birthday),
      city: isExist(city),
    };

    mainApi
      .modifyUserInfoById(currentUser.token, infoToModify)
      .catch((errRes) => {
        setErrorMessage(errRes.error);
      })
      .finally(() => {
        setCurrentUser({ ...currentUser, ...infoToModify });
      });
  }

  return (
    <div className='setting_container'>
      <h1 className='setting_h1'>
        Modify {currentUser.username} user settings
      </h1>

      {/* <img src={avatar} alt="" /> */}
      <form className='setting_form' onSubmit={handleSubmit}>
        <div className='setting_img_content'>
          <img
            className='setting_img'
            id={
              currentUser.avatar === '' || currentUser.avatar === null
                ? 'setting_img_none'
                : undefined
            }
            src={
              currentUser.avatar === '' || currentUser.avatar === null
                ? defaultImg
                : isExist(currentUser.avatar)
            }
            alt='Avatar picture'
          />
        </div>
        <div className='setting_form_inputs'>
          <div className='setting_form_input'>
            <p>First Name: </p>
            <input
              className='setting_input'
              type='text'
              name='firstName'
              value={firstName}
              onChange={(e) => {
                setSubmitButtonDisabled(false);
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className='setting_form_input'>
            <p>Last Name: </p>
            <input
              className='setting_input'
              type='text'
              name='lastName'
              value={lastName}
              onChange={(e) => {
                setSubmitButtonDisabled(false);
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className='setting_form_input'>
            <p>Image Link: </p>
            <input
              className='setting_input'
              type='link'
              name='avatar'
              value={avatar}
              onChange={(e) => {
                setSubmitButtonDisabled(false);
                setAvatar(e.target.value);
              }}
            />
          </div>
          <div className='setting_form_input'>
            <p>eMail: </p>
            <input
              className='setting_input'
              type='email'
              name='email'
              value={email}
              onChange={(e) => {
                setSubmitButtonDisabled(false);
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className='setting_form_input'>
            <p>Birthday: </p>
            <input
              className='setting_input'
              type='date'
              name='birthday'
              value={birthday}
              onChange={(e) => {
                setSubmitButtonDisabled(false);
                setBirthday(e.target.value);
              }}
            />
          </div>
          <div className='setting_form_input'>
            <p>City: </p>
            <input
              className='setting_input'
              type='text'
              name='city'
              value={city}
              onChange={(e) => {
                setSubmitButtonDisabled(false);
                setCity(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <button
            disabled={isSubmitButtonDisabled}
            className='button setting_button'
            type='submit'
          >
            SUBMIT
          </button>
        </div>
      </form>
      <p className='welcome_error'>{errorMessage}</p>
    </div>
  );
}
