import './Welcome.css';
import Login from '../components/Login';
import Register from '../components/Register';
import { useState } from 'react';

export default function Welcome({
  setLogged,
  setCurrentUser,
  defaultLogin = true,
}) {
  const [showLoginPage, setShowLoginPage] = useState(defaultLogin);

  return (
    <>
      <div className='welcome_bg' />
      <div className='welcome_bg welcome_bg2' />
      <div className='welcome_bg welcome_bg3' />
      <div className='container'>
        <h1 className='welcome_h1'>WhatsHack</h1>
        <p>
          The most famous social network for <b>IronHackers!</b>
        </p>
        {showLoginPage ? (
          <Login
            setShowLoginPage={setShowLoginPage}
            setLogged={setLogged}
            setCurrentUser={setCurrentUser}
          />
        ) : (
          <Register
            setShowLoginPage={setShowLoginPage}
            setLogged={setLogged}
            setCurrentUser={setCurrentUser}
          />
        )}
      </div>
    </>
  );
}
