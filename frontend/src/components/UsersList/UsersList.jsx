/* eslint-disable react/prop-types */
// ! modules
import { NavLink, Link } from 'react-router-dom';

// ? styles
import './UsersList.css';

// ? assets
import arrowImg from './../../assets/arrow.png';
import defaultIcon from './../../assets/default_avatar.png';

export default function UsersList({ currentUser, allUsers }) {
  console.log('deb', allUsers);

  return (
    <>
      <input type='checkbox' id='toggleButton' />
      <label htmlFor='toggleButton' id='sideButton'>
        <img src={arrowImg} alt='arrow-image' />
      </label>
      <div className='userslist_container' id='panel'>
        <div className='userslist_h2_container'>
          <h2 className='userslist_h2'>Users List</h2>
        </div>
        <div className='userslist_container_limited'>
          {allUsers.map((user, index) => {
            return (
              <div key={index} className='userslist_user_container'>
                <NavLink
                  to={`/users/${user.id}`}
                  key={index}
                  className='userslist_user_info_container'
                >
                  <img
                    className='userslist_avatar'
                    src={user.avatar || defaultIcon}
                    alt={`avatar of ${user.username}`}
                  />
                  <div className='userslist_text_container'>
                    <p className='userslist_name'>{user.username}</p>
                  </div>
                </NavLink>
                <div className='userslist_button_container'>
                  <Link
                    to={'/'}
                    className='userslist_button'
                    id='userslist_button_chat'
                  >
                    Open chat
                  </Link>
                  <Link
                    to={'/'}
                    className='userslist_button'
                    id='userslist_button_add'
                  >
                    Add friend
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
