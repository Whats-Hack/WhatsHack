/* eslint-disable react/prop-types */
// ! modules
import { NavLink } from 'react-router-dom';

// ? assets
import chatImg from './../../assets/chat.png';
import addUserImg from './../../assets/add-user.png';
import about from './../../assets/about.png';
import param from './../../assets/param.png';
import logout from './../../assets/logout.png';

// ? styles
import './NavBar.css';

export default function NavBar({ setCurrentUser }) {
  function logoutUser() {
    setCurrentUser({
      token: null,
      id: null, // number
      creationDate: null, // date
      lastConnection: null, // date
      friends: [],
      chats: [],
      email: null,
      avatar: null, // url
      username: null,
      password: null,
      firstName: null,
      lastName: null,
      birthday: null, // date
      city: null,
      isActive: false,
    });
    localStorage.clear();
  }

  return (
    <div className='navbar_container'>
      <NavLink to={'/chat'} className='navbar_image_container'>
        <div>
          <img className='navbar_image' src={chatImg} alt='ChatImg' />
        </div>
      </NavLink>

      <NavLink to={'/users'} className='navbar_image_container'>
        <div>
          <img className='navbar_image' src={addUserImg} alt='ChatImg' />
        </div>
      </NavLink>

      <NavLink to={'/settings'} className='navbar_image_container'>
        <div>
          <img className='navbar_image' src={param} alt='ChatImg' />
        </div>
      </NavLink>

      <NavLink to={'/about'} className='navbar_image_container'>
        <div>
          <img className='navbar_image' src={about} alt='ChatImg' />
        </div>
      </NavLink>

      <div className='navbar_image_container logout_image' onClick={logoutUser}>
        <img className='navbar_image' src={logout} alt='ChatImg' />
      </div>
    </div>
  );
}
