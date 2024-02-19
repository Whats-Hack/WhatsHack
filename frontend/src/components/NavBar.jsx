// ! modules
import { Link } from 'react-router-dom';

// ? assets
import chatImg from './../assets/chat.png';
import addUserImg from './../assets/add-user.png';
import about from './../assets/about.png';
import param from './../assets/param.png';
import logout from './../assets/logout.png';

// ? styles
import './NavBar.css';

export default function NavBar({ setLogged, setCurrentUser }) {
  function logoutUser() {
    setCurrentUser({
      email: '',
      avatar: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      birthday: '',
      city: '',
    });

    setLogged(false);
  }
  return (
    <div className='navbar_container'>
      <Link to={'/chat'}>
        <div className='navbar_image_container'>
          <img className='navbar_image' src={chatImg} alt='ChatImg' />
        </div>
      </Link>

      <Link to={'/friends'}>
        <div className='navbar_image_container'>
          <img className='navbar_image' src={addUserImg} alt='ChatImg' />
        </div>
      </Link>

      <Link to={'/settings'}>
        <div className='navbar_image_container'>
          <img className='navbar_image' src={param} alt='ChatImg' />
        </div>
      </Link>

      <Link to={'/about'}>
        <div className='navbar_image_container'>
          <img className='navbar_image' src={about} alt='ChatImg' />
        </div>
      </Link>

      <div className='navbar_image_container logout_image' onClick={logoutUser}>
        <img className='navbar_image' src={logout} alt='ChatImg' />
      </div>
    </div>
  );
}
