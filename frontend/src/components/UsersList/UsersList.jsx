/* eslint-disable react/prop-types */
// ! modules
import { Link } from 'react-router-dom';

// ? styles
import './UsersList.css';

// ? assets
import arrowImg from './../../assets/arrow.png';
import defaultIcon from './../../assets/default_avatar.png';
import chatImg from './../../assets/chat.png';
import addUser from './../../assets/add-user.png';

export default function UsersList({ currentUser, allUsers }) {
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
            if (user.id === currentUser.id) return;
            return (
              <div key={index} className='userslist_user_container'>
                <Link
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
                </Link>
                <div className='userslist_img_container'>
                  <Link
                    to={'/'}
                    className='userslist_img_box'
                  >
                    <img className="userslist_img" src={chatImg} alt="Chat logo" />
                  </Link>
                  <Link
                    to={'/'}
                    className='userslist_img_box'
                  >
                    <img className="userslist_img" src={addUser} alt="Add user logo" />
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
