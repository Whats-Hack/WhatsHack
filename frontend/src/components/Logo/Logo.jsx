// ? styles
import s from './Logo.module.css';

// ? assets
import logoIcon from './../../assets/whatshack.svg';

export default function Logo() {
  return (
    <div className={s.logo}>
      <img className={s.logo_img} src={logoIcon} alt='logotype of WhatsHack' />
      <div className={s.logo_shadow} />
    </div>
  );
}
