/* eslint-disable react/prop-types */
// ? styles
import './Welcome.css';

import svgLogo from '../../assets/whatshack.svg';

export default function Welcome({ children }) {
  return (
    <>
      <div className='welcome_bg' />
      <div className='welcome_bg welcome_bg2' />
      <div className='welcome_bg welcome_bg3' />
      <div className='container'>
        <div className='container_header'>
          <img className='container_header_img' src={svgLogo} alt="WhatsHack logo" />
          <h1 className='welcome_h1'>WhatsHack</h1>
        </div>
        <p>
          The most famous social network for <b>IronHackers!</b>
        </p>
        {children}
      </div>
    </>
  );
}
