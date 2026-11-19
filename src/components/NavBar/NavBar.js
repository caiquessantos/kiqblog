import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import { useState, useEffect, useRef } from "react";
import { useAuthentication } from "../../hooks/auth/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { useNotification } from "../../context/Notifications/Notification";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const { showNotification } = useNotification();
  const navRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    showNotification("Logout efetuado com sucesso!");
  };

  return (
    <nav ref={navRef} className={style.navbarContainer}>
      <h1>
        <span className={style.logoHighlight}>Kiq</span>
        <span>Blog</span>
      </h1>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className={style.hamburguerMenu}
        aria-label="Abrir menu"
        aria-expanded={menuOpen}
      >
        <span className={style.bar}></span>
        <span className={style.bar}></span>
        <span className={style.bar}></span>
      </button>

      <div className={`${style.menu} ${menuOpen ? style.open : ""}`}>
        <NavLink
          to="/"
          className={style.title}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>
        {!user && (
          <>
            <NavLink
              to="/login"
              className={style.title}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={style.title}
              onClick={() => setMenuOpen(false)}
            >
              Cadastrar
            </NavLink>
          </>
        )}
        {user && (
          <>
            <NavLink
              to="/dashboard"
              className={style.title}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/createpost"
              className={style.title}
              onClick={() => setMenuOpen(false)}
            >
              Postar
            </NavLink>
            <NavLink to="/login" className={style.title} onClick={handleLogout}>
              Sair
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
