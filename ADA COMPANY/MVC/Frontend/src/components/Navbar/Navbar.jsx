import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";  


import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const handleMenu = () => {
    const decodedToken = jwt_decode(token);
    const userRole = decodedToken.role;
    if (userRole === 'cliente') {
      navigate('/client');
    } else if (userRole === 'admin') {
      navigate('/admin');
  }
  }
  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        AdaCompany
      </a>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <Link to="/about">Serviços</Link>
          </li>
          <li>
            <Link to="/projects">Exemplos</Link>
          </li>
          {token ? (
            <>
              <li>
                <a onClick={handleLogout} href="#">Logout</a>
              </li>
              <li>
              <a onClick={handleMenu} href="#">Menu</a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signin">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
