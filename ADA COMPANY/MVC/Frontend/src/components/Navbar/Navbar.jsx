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
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    console.log(decodedToken)
    console.log(userRole);
    if (userRole === 'cliente') {
      navigate('/client');
    } else if (userRole === 'admin') {
      navigate('/admin');
    }
  }

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
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
            <a onClick={() => handleScrollToSection("servicos")}>Serviços</a>
          </li>
          <li>
            <a onClick={() => handleScrollToSection("projects")}>Exemplos</a>
          </li>
          {token ? (
            <>
              <li>
                <a onClick={handleLogout} >Logout</a>
              </li>
              <li>
              <a onClick={handleMenu} >Menu</a>
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
