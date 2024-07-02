import React from "react";
import { Link } from "react-router-dom"; // Importar el componente Link de react-router-dom

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          {/* Enlace para ir a la página principal */}
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Enlace para ir a la página de inicio de sesión */}
          <li>
            <Link to="/login">Login</Link>
          </li>
          {/* Enlace para ir a la página de registro */}
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
