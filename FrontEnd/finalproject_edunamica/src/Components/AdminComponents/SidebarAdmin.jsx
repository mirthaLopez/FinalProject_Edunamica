import React, { useState } from 'react';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto
import { useNavigate } from 'react-router-dom';

//ESTILOS CSS
import '../../Styles/AdminStyles/SidebarAdmin.css'; 

//IMPORTS DE LIBRERIA MUI
import ClassIcon from '@mui/icons-material/Class'; //cursos
import ChecklistIcon from '@mui/icons-material/Checklist'; //prematrícula
import PersonAddIcon from '@mui/icons-material/PersonAdd'; //estudiantes
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'; //admin
import SchoolIcon from '@mui/icons-material/School'; // matrícula
import HandshakeIcon from '@mui/icons-material/Handshake'; // alianzas
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // perfil

//IMPORTS DE BOOTSTRAP
import {Collapse, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//IMPORT DE IMÁGENES
import logo_edunamica from "../../Img/edunamica_logo.svg"

//IMPORT DE LINK TO
import {Link} from "react-router-dom";

function SidebarAdmin() {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar la visibilidad del sidebar
    const [openSection, setOpenSection] = useState(null);
    const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
    const { logout } = useAuth();
    
    const handleToggle = (section) => {
        // Si la sección está ya abierta, la cerramos, sino la abrimos
        setOpenSection(openSection === section ? null : section);
    };

    const navigate = useNavigate();

// Handler del logout usando el contexto
const handleLogout = () => {
    console.log('Logout function called');
    logout();  // Llamamos a la función de logout definida en el contexto
    window.location.href = '/Login'; // Redirigimos a la página de login
};
    
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
                    
                    <ClassIcon />  {/* Icono en su propia columna */}
                    Cursos
                </Button>
                    <Collapse in={openSection === 'courses'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="/Curso" className="submenu-item link-dark rounded"><p className="large-text">Añadir Curso</p></Link></li>
                            <li><Link to="/CursosAdmin" className="submenu-item link-dark rounded"><p className="large-text">Editar Cursos</p></Link></li>
                        </ul>
                    </Collapse>
                </li>

                <li className="menu-item mb-1">
                    <Button
                        className="btn btn-toggle align-items-center rounded styles-btn"
                        onClick={() => handleToggle('preenrollment')}
                        aria-expanded={openSection === 'preenrollment'}
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
                        <ChecklistIcon />  
                        Solicitudes
                    </Button>
                    <Collapse in={openSection === 'preenrollment'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="/Solicitudes" className="submenu-item link-dark rounded"><p className="large-text">Pendientes</p></Link></li>
                            <li><Link to="/SolicitudesAceptadas" className="submenu-item link-dark rounded"><p className="large-text">Aceptadas</p></Link></li>
                            <li><Link to="/SolicitudesRechazadas" className="submenu-item link-dark rounded"><p className="large-text">Denegadas</p></Link></li>
                        </ul>
                    </Collapse>
                </li>

                <li className="menu-item mb-1">
                    <Button
                        className="btn btn-toggle align-items-center rounded styles-btn"
                        onClick={() => handleToggle('students')}
                        aria-expanded={openSection === 'students'}
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
                        <PersonAddIcon />
                        Estudiantes
                    </Button>
                    <Collapse in={openSection === 'students'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="/RegistrarEstudiante" className="submenu-item link-dark rounded"><p className="large-text">Nuevo Estudiante</p></Link></li>
                            <li><Link to="/Estudiantes" className="submenu-item link-dark rounded"><p className="large-text">Ver Estudiantes</p></Link></li>
                        </ul>
                    </Collapse>
                </li>

                <li className="menu-item mb-1">
                    <Button
                        className="btn btn-toggle align-items-center rounded styles-btn"
                        onClick={() => handleToggle('admin')}
                        aria-expanded={openSection === 'admin'}
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
                        <SupervisorAccountIcon />
                        Administración
                    </Button>
                    <Collapse in={openSection === 'admin'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="/Administradores" className="submenu-item link-dark rounded"><p className="large-text">Crear Nuevo Administrador</p></Link></li>
                            <li><Link to="/Administracion" className="submenu-item link-dark rounded"><p className="large-text">Ver Administradores</p></Link></li>
                       </ul>
                    </Collapse>
                </li>

                <li className="menu-item mb-1">
                    <Button
                        className="btn btn-toggle align-items-center rounded styles-btn"
                        onClick={() => handleToggle('enrollment')}
                        aria-expanded={openSection === 'enrollment'}
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
                        Matrícula
                    </Button>
                    <Collapse in={openSection === 'enrollment'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="/Matricula" className="submenu-item link-dark rounded"><p className="large-text">Habilitar Matrícula</p></Link></li>

                        </ul>
                    </Collapse>
                </li>

                <li className="menu-item mb-1">
                    <Button
                        className="btn btn-toggle align-items-center rounded styles-btn"
                        onClick={() => handleToggle('partners')}
                        aria-expanded={openSection === 'partners'}
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
                        <HandshakeIcon />
                        Alianzas
                    </Button>
                    <Collapse in={openSection === 'partners'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="/Alianzas" className="submenu-item link-dark rounded"><p className="large-text">Añadir Alianza</p></Link></li>
                            <li><Link to="/VerAlianzas" className="submenu-item link-dark rounded"><p className="large-text">Ver / Eliminar Alianza</p></Link></li>
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
                            <li><Link to="/PerfilAdministrador" className="submenu-item link-dark rounded"><p className="large-text">Mi Perfil</p></Link></li>
                            <li> <Link to="#" className="submenu-item link-dark rounded" onClick={handleLogout}>
                             <p className="large-text">Cerrar Sesión</p>
                                 </Link>
                            </li>
                        </ul>
                    </Collapse>
                </li>
            </ul>
        </div>
    </div>
    
    );
};

export default SidebarAdmin;