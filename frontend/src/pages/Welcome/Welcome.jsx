/* eslint-disable react/prop-types */
// ? styles
import './Welcome.css';

export default function Welcome({ children }) {
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
        {children}
      </div>
    </>
  );
}
