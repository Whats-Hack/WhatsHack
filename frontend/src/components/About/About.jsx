// ? assets
import gitRepositoryLogo from './../../assets/git-repository.png';
import gitLogo from './../../assets/github.png';
import reactLogo from './../../assets/react.png';
import apiLogo from './../../assets/rest-api-icon.png';
import svgLogo from '../../assets/whatshack.svg';

// ? styles
import './About.css';

export default function About() {
  return (
    <div className='about_container'>
      <img className='about_logo' src={svgLogo} alt="WhatsHack logo" />
      <h1 className='about_h1'>WhatsHack</h1>
      <p className='about_p'>
        WhatsHack is a web application developed by Hugo and Dima as part of
        their Module 2 project. Serving as a learning platform for web
        development with React and API integration, WhatsHack mirrors the
        functionalities of WhatsApp in a modest manner. Through WhatsHack, users
        can chat with his friend and manage his friends list The project aims to
        provide a hands-on experience in developing a real-world application
        while honing their skills in web development.
      </p>
      <h2 className='about_h2'>WhatsHack is propulsed by :</h2>
      <div className='about_image_container'>
        <img src={reactLogo} alt='logotype React' className='about_image' />
        <img src={apiLogo} alt='logotype API' className='about_image' />
      </div>
      <h2 className='about_h2'>GitHub Links :</h2>
      <div className='about_git_containers'>
        <a
          href='https://github.com/Whats-Hack/WhatsHack'
          target='_blank'
          rel='noopener noreferrer'
          className='about_a'
        >
          <button className='about_git_button'>
            WhatsHack repo
            <img
              className='about_git_image'
              alt='image of repository github'
              src={gitRepositoryLogo}
            />
          </button>
        </a>
        <a
          href='https://github.com/chyVacheck'
          target='_blank'
          rel='noopener noreferrer'
          className='about_a'
        >
          <button className='about_git_button'>
            Dima GitHub
            <img
              className='about_git_image'
              alt='logotype github'
              src={gitLogo}
            />
          </button>
        </a>
        <a
          href='https://github.com/Huguiz'
          target='_blank'
          rel='noopener noreferrer'
          className='about_a'
        >
          <button className='about_git_button'>
            Hugo GitHub
            <img
              className='about_git_image'
              alt='logotype github'
              src={gitLogo}
            />
          </button>
        </a>
      </div>
    </div>
  );
}
