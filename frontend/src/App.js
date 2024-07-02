import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Importa componentes necesarios de react-router-dom
import HomeScreen from "./screens/HomeScreen"; // Importa el componente HomeScreen desde la ruta especificada
import LoginScreen from "./screens/LoginScreen"; // Importa el componente LoginScreen desde la ruta especificada
import RegisterScreen from "./screens/RegisterScreen"; // Importa el componente RegisterScreen desde la ruta especificada
import { Container, Navbar, Nav } from "react-bootstrap"; // Importa componentes necesarios de react-bootstrap
import "./App.css"; // Importa estilos CSS específicos para App

function App() {
  return (
    <Router>
      {" "}
      {/* Configura el Router como componente principal */}
      <div className="App">
        {" "}
        {/* Contenedor principal de la aplicación */}
        <Navbar bg="dark" variant="dark" expand="lg">
          {" "}
          {/* Barra de navegación con estilos dark y expandible en pantallas grandes */}
          <Container>
            {" "}
            {/* Contenedor para la barra de navegación */}
            <Navbar.Brand href="/">Task Manager</Navbar.Brand>{" "}
            {/* Marca del navbar que enlaza al inicio */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
            {/* Botón para mostrar el menú en pantallas pequeñas */}
            <Navbar.Collapse id="basic-navbar-nav">
              {" "}
              {/* Contenido colapsable del navbar */}
              <Nav className="me-auto">
                {" "}
                {/* Alineación a la derecha para los elementos del navbar */}
                <Nav.Link href="/">Home</Nav.Link>{" "}
                {/* Enlace para ir a la pantalla de inicio */}
                <Nav.Link href="/login">Login</Nav.Link>{" "}
                {/* Enlace para ir a la pantalla de login */}
                <Nav.Link href="/register">Register</Nav.Link>{" "}
                {/* Enlace para ir a la pantalla de registro */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="mt-5">
          {" "}
          {/* Contenedor principal de la aplicación con margen superior */}
          <Switch>
            {" "}
            {/* Componente Switch para renderizar rutas exclusivamente */}
            <Route path="/" component={HomeScreen} exact />{" "}
            {/* Ruta exacta para HomeScreen */}
            <Route path="/login" component={LoginScreen} />{" "}
            {/* Ruta para LoginScreen */}
            <Route path="/register" component={RegisterScreen} />{" "}
            {/* Ruta para RegisterScreen */}
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
