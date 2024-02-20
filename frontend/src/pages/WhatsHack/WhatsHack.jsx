/* eslint-disable react/prop-types */
// ? styles
import './WhatsHack.css';

// ? components
import NavBar from '../../components/NavBar/NavBar';

export default function WhatsHack({ children, setLogged, setCurrentUser }) {
  return (
    <div className='whatshack_container'>
      <NavBar setLogged={setLogged} setCurrentUser={setCurrentUser} />
      {children}
    </div>
  );
}
