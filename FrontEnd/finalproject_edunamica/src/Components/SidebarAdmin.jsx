import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Collapse, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/SidebarAdmin.css'; // Importa el archivo CSS con estilos personalizados
import logo_edunamica from "../Img/edunamica_logo.svg"

// iconos para sidebar
import ClassIcon from '@mui/icons-material/Class'; //cursos
import ChecklistIcon from '@mui/icons-material/Checklist'; //prematrícula
import PersonAddIcon from '@mui/icons-material/PersonAdd'; //estudiantes
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'; //admin
import SchoolIcon from '@mui/icons-material/School'; // matrícula
import HandshakeIcon from '@mui/icons-material/Handshake'; // alianzas
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // perfil

function SidebarAdmin() {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar la visibilidad del sidebar
    const [openSection, setOpenSection] = useState(null);
  
    const handleToggle = (section) => {
        // Si la sección está ya abierta, la cerramos, sino la abrimos
        setOpenSection(openSection === section ? null : section);
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
                    >
                        <PersonAddIcon />
                        Estudiantes
                    </Button>
                    <Collapse in={openSection === 'students'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="/Registro" className="submenu-item link-dark rounded"><p className="large-text">Nuevo Estudiante</p></Link></li>
                            <li><Link to="/Estudiantes" className="submenu-item link-dark rounded"><p className="large-text">Ver Estudiantes</p></Link></li>
                        </ul>
                    </Collapse>
                </li>

                <li className="menu-item mb-1">
                    <Button
                        className="btn btn-toggle align-items-center rounded styles-btn"
                        onClick={() => handleToggle('admin')}
                        aria-expanded={openSection === 'admin'}
                    >
                        <SupervisorAccountIcon />
                        Administración
                    </Button>
                    <Collapse in={openSection === 'admin'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="/Administradores" className="submenu-item link-dark rounded"><p className="large-text">Crear Nuevo Administrador</p></Link></li>
                            <li><Link to="#" className="submenu-item link-dark rounded"><p className="large-text">Ver Administradores</p></Link></li>
                       </ul>
                    </Collapse>
                </li>

                <li className="menu-item mb-1">
                    <Button
                        className="btn btn-toggle align-items-center rounded styles-btn"
                        onClick={() => handleToggle('enrollment')}
                        aria-expanded={openSection === 'enrollment'}
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
                    >
                        <HandshakeIcon />
                        Alianzas
                    </Button>
                    <Collapse in={openSection === 'partners'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="#" className="submenu-item link-dark rounded"><p className="large-text">Ver Alianzas</p></Link></li>
                            <li><Link to="/Alianzas" className="submenu-item link-dark rounded"><p className="large-text">Añadir Alianza</p></Link></li>
                            <li><Link to="#" className="submenu-item link-dark rounded"><p className="large-text">Modificar / Eliminar Alianza</p></Link></li>
                        </ul>
                    </Collapse>
                </li>

                <li className="separator border-top my-3"></li>
                <li className="menu-item mb-1">
                    <Button
                        className="btn btn-toggle align-items-center rounded styles-btn"
                        onClick={() => handleToggle('account')}
                        aria-expanded={openSection === 'account'}
                    >
                        <AccountCircleIcon />
                        Mi Cuenta
                    </Button>
                    <Collapse in={openSection === 'account'}>
                        <ul className="submenu list-unstyled fw-normal pb-1 small">
                            <li><Link to="#" className="submenu-item link-dark rounded"><p className="large-text">Mi Perfil</p></Link></li>
                            <li><Link to="#" className="submenu-item link-dark rounded"><p className="large-text">Ajustes</p></Link></li>
                            <li><Link to="#" className="submenu-item link-dark rounded"><p className="large-text">Cerrar Sesión</p></Link></li>
                        </ul>
                    </Collapse>
                </li>
            </ul>
        </div>
    </div>
    
    );
};

export default SidebarAdmin;