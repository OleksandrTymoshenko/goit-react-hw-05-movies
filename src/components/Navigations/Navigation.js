import s from './navigation.module.css';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <header className={s.header}>
      <nav>
        <ul className={s.navList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `${isActive ? s.active : s.link}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) => `${isActive ? s.active : s.link}`}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
