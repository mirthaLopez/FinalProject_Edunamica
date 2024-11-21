import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Header.css';
import logo from '../Img/edunamica_logo.svg';

function HeaderNav() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          <img
            src={logo}
            alt="Logo"
            width="140"
            height="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '180px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to='/' className={`custom-navlink ${location.pathname === '/' ? 'active' : ''}`} style={{ fontSize: '15px' }}>INICIO</Nav.Link>
            <Nav.Link as={Link} to='/Contacto' className={`custom-navlink ${location.pathname === '/Contacto' ? 'active' : ''}`} style={{ fontSize: '15px' }}>CURSOS</Nav.Link>
            <Nav.Link as={Link} to='/Contacto' className={`custom-navlink ${location.pathname === '/Contacto' ? 'active' : ''}`} style={{ fontSize: '15px' }}>CONTACTO</Nav.Link>
            <Nav.Link as={Link} to='/Contacto' className={`custom-navlink ${location.pathname === '/Contacto' ? 'active' : ''}`} style={{ fontSize: '15px' }}>BLOG</Nav.Link>
          </Nav>
          <div className="navbar-buttons">
            <button className="navbar-btn login-btn">Inicia sesión</button>
            <button className="navbar-btn register-btn">Regístrate</button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;


