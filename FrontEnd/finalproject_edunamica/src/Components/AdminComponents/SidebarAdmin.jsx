import React, { useState } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext'; 

// ESTILOS CSS
import '../../Styles/AdminStyles/SidebarAdmin.css'; 

// IMPORTS DE LIBRERIA MUI
import ClassIcon from '@mui/icons-material/Class'; // Icono de cursos
import ChecklistIcon from '@mui/icons-material/Checklist'; // Icono de prematrícula
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // Icono de estudiantes
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'; // Icono de administración
import SchoolIcon from '@mui/icons-material/School'; // Icono de matrícula
import HandshakeIcon from '@mui/icons-material/Handshake'; // Icono de alianzas
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono de perfil
import Diversity1Icon from '@mui/icons-material/Diversity1';

// IMPORTS DE BOOTSTRAP
import {Collapse, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// IMPORT DE IMÁGENES
import logo_edunamica from "../../Img/edunamica_logo.svg"

// IMPORT DE LINK TO
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function SidebarAdmin() {
    
    const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar si el sidebar está abierto o cerrado
    const [openSection, setOpenSection] = useState(null); // Estado para controlar qué sección del sidebar está abierta
    const {setAuthData} = useAuth(); // Extrae setAuthData desde el contexto de autenticación
    const { logout } = useAuth(); // Extrae la función logout desde el contexto de autenticación
    
    // Función para manejar la apertura/cierre de las secciones del sidebar
    const handleToggle = (section) => {
        // Si la sección está abierta, la cerramos, de lo contrario la abrimos
        setOpenSection(openSection === section ? null : section);
    };

    const navigate = useNavigate(); // Instancia el hook useNavigate para la navegación programática

    // Función para manejar el logout
    const handleLogout = () => {
        console.log('Logout function called'); // Muestra un mensaje en consola cuando se llama la función de logout
        logout();  // Llama a la función logout del contexto de autenticación
        window.location.href = '/Login'; // Redirige al usuario a la página de login
    };
    
    return (
        
        <div style={{position: 'relative', zIndex: 2 }}> 
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
                            <li><Link to="/Eventos" className="submenu-item link-dark rounded"><p className="large-text">Eventos</p></Link></li>
                            <li> 
                                <Link to="/Blog" className="submenu-item link-dark rounded" >
                                    <p className="large-text">Visualizar Blog</p>
                                 </Link>
                            </li>
                            <li><Link to="/AgregarBlog" className="submenu-item link-dark rounded"><p className="large-text">Agregar Blog</p></Link></li>
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
                            <li> 
                                <Link to="#" className="submenu-item link-dark rounded" onClick={handleLogout}>
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