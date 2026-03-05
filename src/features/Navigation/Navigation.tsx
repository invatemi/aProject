import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';

export const Navigation: FC = () => (
  <nav className={style.nav}>
    <ul className={style.navList}>
      <li>
        <NavLink 
          to="/posts" 
          className={({ isActive }) => 
            [style.navLink, isActive ? style.navLinkActive : ''].filter(Boolean).join(' ')
          }
          end
        >
          Posts
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/users" 
          className={({ isActive }) => 
            [style.navLink, isActive ? style.navLinkActive : ''].filter(Boolean).join(' ')
          }
        >
          Users
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/albums"
          className={({ isActive }) => 
            [style.navLink, isActive ? style.navLinkActive : ''].filter(Boolean).join(' ')
          }
        >
          Albums
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;