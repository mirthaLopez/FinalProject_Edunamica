import React, {useState} from 'react';

//ESTILOS CSS
import '../Styles/SidebarStudent.css';

//IMPORTS DE LIBRERIA MUI
import Diversity1Icon from '@mui/icons-material/Diversity1';
import SchoolIcon from '@mui/icons-material/School';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//IMPORTS DE BOOTSTRAP
import {Collapse, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//IMPORT DE IMÁGENES
import logo_edunamica from "../Img/edunamica_logo.svg"

//IMPORT DE LINK TO
import {Link, useNavigate} from "react-router-dom";

function SidebarStudent() {

    const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar la visibilidad del sidebar
    const [openSection, setOpenSection] = useState(null);
 
    const handleToggle = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const navigate = useNavigate();

  return (
    <div style={{position: 'relative', zIndex: 2 }}>

            {/* Botón de hamburguesa para pantallas pequeñas */}
            <button
                className="sidebar-toggle-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div className={`sidebar p-3 ${sidebarOpen ? 'open' : ''}`} style={{ backgroundColor: '#444444', width: '280px' }}>
                <a href="/" className="brand-link d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                    <svg className="bi me-2" width="30" height="24">
                        <use xlinkHref="#bootstrap" />
                    </svg>
                    <span className="brand-text fs-5 fw-semibold">
                        <img src={logo_edunamica} alt="Edunamica Logo" className="brand-logo" />
                    </span>
                </a>


                <ul className="menu list-unstyled ps-0">
                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded styles-btn"
                            onClick={() => handleToggle('community')}
                            aria-expanded={openSection === 'community'}
                            style={{
                                backgroundColor: 'white',  // Fondo blanco por defecto
                                color: 'black',            // Color del texto
                                width: '100%',             // Ancho completo
                                textAlign: 'left',         // Alineación del texto a la izquierda
                                padding: '0.75rem 1.25rem', // Espaciado interno
                                fontSize: '20px',          // Tamaño de la fuente
                                fontWeight: '300',         // Peso de la fuente
                                borderRadius: '0.5rem',    // Bordes redondeados
                                border: '1px solid transparent', // Borde definido
                                display: 'grid',           // Usar grid
                                gridTemplateColumns: 'auto 1fr', // Dos columnas, una para el icono y otra para el texto
                                gap: '10px',               // Espacio entre icono y texto
                                alignItems: 'center',      // Alineación centrada verticalmente
                                cursor: 'pointer',        // Cambiar el cursor al pasar el ratón
                                transition: 'all 0.3s ease',  // Transición suave para hover, focus, active
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra suave
                                fontFamily: '"Bebas Neue", sans-serif',  // Fuente personalizada
                            }}
                        >
                            <Diversity1Icon />
                            Comunidad Edunámica
                        </Button>
                        <Collapse in={openSection === 'community'}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="submenu-item link-dark rounded">Boletines Informativos</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Calendario de Actividades</a></li>
                            </ul>
                        </Collapse>
                    </li>


                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded styles-btn"
                            onClick={() => handleToggle('courses')}
                            aria-expanded={openSection === 'courses'}
                            style={{
                                backgroundColor: 'white',  // Fondo blanco por defecto
                                color: 'black',            // Color del texto
                                width: '100%',             // Ancho completo
                                textAlign: 'left',         // Alineación del texto a la izquierda
                                padding: '0.75rem 1.25rem', // Espaciado interno
                                fontSize: '20px',          // Tamaño de la fuente
                                fontWeight: '300',         // Peso de la fuente
                                borderRadius: '0.5rem',    // Bordes redondeados
                                border: '1px solid transparent', // Borde definido
                                display: 'grid',           // Usar grid
                                gridTemplateColumns: 'auto 1fr', // Dos columnas, una para el icono y otra para el texto
                                gap: '10px',               // Espacio entre icono y texto
                                alignItems: 'center',      // Alineación centrada verticalmente
                                cursor: 'pointer',        // Cambiar el cursor al pasar el ratón
                                transition: 'all 0.3s ease',  // Transición suave para hover, focus, active
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra suave
                                fontFamily: '"Bebas Neue", sans-serif',  // Fuente personalizada
                            }}
                        >
                            <SchoolIcon />
                            Cursos
                        </Button>
                        <Collapse in={openSection === 'courses'}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><Link to="/MisCursos" className="submenu-item link-dark rounded"><p className="large-text">Mis Cursos</p></Link></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Matricular</a></li>
                            </ul>
                        </Collapse>
                    </li>


                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded styles-btn"
                            onClick={() => handleToggle('payments')}
                            aria-expanded={openSection === 'payments'}
                            style={{
                                backgroundColor: 'white',  // Fondo blanco por defecto
                                color: 'black',            // Color del texto
                                width: '100%',             // Ancho completo
                                textAlign: 'left',         // Alineación del texto a la izquierda
                                padding: '0.75rem 1.25rem', // Espaciado interno
                                fontSize: '20px',          // Tamaño de la fuente
                                fontWeight: '300',         // Peso de la fuente
                                borderRadius: '0.5rem',    // Bordes redondeados
                                border: '1px solid transparent', // Borde definido
                                display: 'grid',           // Usar grid
                                gridTemplateColumns: 'auto 1fr', // Dos columnas, una para el icono y otra para el texto
                                gap: '10px',               // Espacio entre icono y texto
                                alignItems: 'center',      // Alineación centrada verticalmente
                                cursor: 'pointer',        // Cambiar el cursor al pasar el ratón
                                transition: 'all 0.3s ease',  // Transición suave para hover, focus, active
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra suave
                                fontFamily: '"Bebas Neue", sans-serif',  // Fuente personalizada
                            }}
                        >
                            <CreditCardIcon />
                            Pagos
                        </Button>
                        <Collapse in={openSection === 'payments'}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="submenu-item link-dark rounded">Historial de Pagos</a></li>
                            </ul>
                        </Collapse>
                    </li>


                    <li className="separator border-top my-3"></li>
                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded styles-btn"
                            onClick={() => handleToggle('account')}
                            aria-expanded={openSection === 'account'}
                            style={{
                                backgroundColor: 'white',  // Fondo blanco por defecto
                                color: 'black',            // Color del texto
                                width: '100%',             // Ancho completo
                                textAlign: 'left',         // Alineación del texto a la izquierda
                                padding: '0.75rem 1.25rem', // Espaciado interno
                                fontSize: '20px',          // Tamaño de la fuente
                                fontWeight: '300',         // Peso de la fuente
                                borderRadius: '0.5rem',    // Bordes redondeados
                                border: '1px solid transparent', // Borde definido
                                display: 'grid',           // Usar grid
                                gridTemplateColumns: 'auto 1fr', // Dos columnas, una para el icono y otra para el texto
                                gap: '10px',               // Espacio entre icono y texto
                                alignItems: 'center',      // Alineación centrada verticalmente
                                cursor: 'pointer',        // Cambiar el cursor al pasar el ratón
                                transition: 'all 0.3s ease',  // Transición suave para hover, focus, active
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Sombra suave
                                fontFamily: '"Bebas Neue", sans-serif',  // Fuente personalizada
                            }}
                        >
                            <AccountCircleIcon />
                            Mi Cuenta
                        </Button>
                        <Collapse in={openSection === 'account'}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="submenu-item link-dark rounded">Mi Perfil</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Ajustes</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Cerrar Sesión</a></li>
                            </ul>
                        </Collapse>
                    </li>
                </ul>
            </div>


    </div>
  )
}

export default SidebarStudent