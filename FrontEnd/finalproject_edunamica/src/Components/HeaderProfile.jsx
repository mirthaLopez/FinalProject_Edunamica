import React, { useState } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/HeaderProfile.css'; // Importa el archivo CSS con estilos personalizados

function HeaderProfile() {
    const [openHome, setOpenHome] = useState(false);
    const [openDashboard, setOpenDashboard] = useState(false);
    const [openOrders, setOpenOrders] = useState(false);
    const [openAccount, setOpenAccount] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false); // Estado para controlar la visibilidad del sidebar

    return (
        <div>
            {/* Botón de hamburguesa para pantallas pequeñas */}
            <button 
                className="sidebar-toggle-btn" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div className={`sidebar p-3 bg-light ${sidebarOpen ? 'open' : ''}`} style={{ width: '280px' }}>
                <a href="/" className="brand-link d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                    <svg className="bi me-2" width="30" height="24">
                        <use xlinkHref="#bootstrap" />
                    </svg>
                    <span className="brand-text fs-5 fw-semibold">Collapsible</span>
                </a>
                <ul className="menu list-unstyled ps-0">
                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded home-btn"
                            onClick={() => setOpenHome(!openHome)}
                            aria-expanded={openHome}
                        >
                            Cursos
                        </Button>
                        <Collapse in={openHome}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="submenu-item link-dark rounded">Ver Cursos</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Añadir Categoría</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Añadir Curso</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Modificar / Eliminar Curso</a></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded dashboard-btn"
                            onClick={() => setOpenDashboard(!openDashboard)}
                            aria-expanded={openDashboard}
                        >
                            Prematrícula
                        </Button>
                        <Collapse in={openDashboard}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="submenu-item link-dark rounded">Historial</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Pendientes</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Aceptadas</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Denegadas</a></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded orders-btn"
                            onClick={() => setOpenOrders(!openOrders)}
                            aria-expanded={openOrders}
                        >
                            Estudiantes
                        </Button>
                        <Collapse in={openOrders}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="submenu-item link-dark rounded">Nuevo Estudiante</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Ver Estudiantes</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Shipped</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Returned</a></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded orders-btn"
                            onClick={() => setOpenOrders(!openOrders)}
                            aria-expanded={openOrders}
                        >
                            Administración
                        </Button>
                        <Collapse in={openOrders}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="submenu-item link-dark rounded">Crear Nuevo Administrador</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Ver Administradores</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Shipped</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Returned</a></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded orders-btn"
                            onClick={() => setOpenOrders(!openOrders)}
                            aria-expanded={openOrders}
                        >
                            Matrícula
                        </Button>
                        <Collapse in={openOrders}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="submenu-item link-dark rounded">Habilitar Matrícula</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Ver Matrícula</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Shipped</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Returned</a></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded orders-btn"
                            onClick={() => setOpenOrders(!openOrders)}
                            aria-expanded={openOrders}
                        >
                            Alianzas
                        </Button>
                        <Collapse in={openOrders}>
                            <ul className="submenu list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="submenu-item link-dark rounded">Ver Alianzas</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Añadir Alianza</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Modificar / Eliminar Alianza</a></li>
                                <li><a href="#" className="submenu-item link-dark rounded">Returned</a></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className="separator border-top my-3"></li>
                    <li className="menu-item mb-1">
                        <Button
                            className="btn btn-toggle align-items-center rounded account-btn"
                            onClick={() => setOpenAccount(!openAccount)}
                            aria-expanded={openAccount}
                        >
                            Account
                        </Button>
                        <Collapse in={openAccount}>
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
    );
};

export default HeaderProfile;

