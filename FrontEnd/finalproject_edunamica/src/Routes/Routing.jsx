import React from "react";

//IMPORT DE REACT ROUTER DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//IMPORTS DE SOLICITUDES
import Solicitudes from "../Pages/Solicitudes/Solicitudes";
import SolicitudesRechazadas from "../Pages/Solicitudes/SolicitudesRechazadas";
import SolicitudesAceptadas from "../Pages/Solicitudes/SolicitudesAceptadas";

//IMPORTS DE ADMINISTRACIÓN
import Administradores from "../../src/Pages/Admistracion/Administradores";
import Administracion from "../../src/Pages/Admistracion/Administracion";
import PerfilAdministrador from "../Pages/Admistracion/PerfilAdministrador";

//IMPORT DE ALIANZAS (AGREGAR ALIANZA)
import Alianzas from "../Pages/Alianzas/Alianzas";
import VerAlianzas from "../Pages/Alianzas/VerAlianza"

//IMPORTS DE CURSOS
import VerCurso from "../Pages/Cursos/VerCurso";
import CursosAdmin from "../Pages/Cursos/CursosAdmin";
import Curso from "../Pages/Cursos/CrearCurso";

//IMPORTS DE REGISTRO (FORM)
import RegistrarEstudiante from "../Pages/Registro/RegistrarEstudiante";
import Registro from "../Pages/Registro/Registro";

//IMPORT CONTACTO
import Contacto from "../Pages/Contacto/Contacto";

//IMPORT DE MATRÍCULA
import Matricula from "../Pages/Matricula/Matricula";

//IMPORT DE LOGIN
import Login from "../Pages/Login/Login";

//IMPORT DE ESTUDIANTE
import PerfilEstudiante from "../Pages/PerfilEstudiante";
import Estudiantes from "../../src/Pages/Estudiantes/Estudiantes";
import MisCursos from "../Pages/MisCursos";
import MisPagos from "../Pages/MisPagos";
import Matricular from "../Pages/Matricular"

import Inicio from "../Pages/Inicio";
import Principal from "../Pages/Principal"

import ProtectedRoutes from "./ProtectedRoutes";
import ScrollToTop from "../Components/ScrollToTop";

const Routing = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Inicio />} /> 
                <Route path="/Login" element={<Login />} /> 
                <Route path="/Contacto" element={<Contacto />} /> 
                <Route path="/Curso" element={<ProtectedRoutes><Curso /></ProtectedRoutes>} /> 
                <Route path="/Registro" element={<Registro />} /> 
                <Route path="/Solicitudes" element={<ProtectedRoutes><Solicitudes /> </ProtectedRoutes>} /> 
                <Route path="/Administradores" element={<ProtectedRoutes><Administradores /> </ProtectedRoutes>} /> 
                <Route path="/Matricula" element={<ProtectedRoutes><Matricula /> </ProtectedRoutes>} /> 
                <Route path="/Alianzas" element={<ProtectedRoutes><Alianzas /></ProtectedRoutes>} /> 
                <Route path="/Cursos" element={<VerCurso />} /> 
                <Route path="/Principal" element={<Principal />} /> 
                <Route path="/CursosAdmin" element={<ProtectedRoutes><CursosAdmin /></ProtectedRoutes>} /> 
                <Route path="/PerfilEstudiante" element={<ProtectedRoutes><PerfilEstudiante /></ProtectedRoutes>} /> 
                <Route path="/SolicitudesRechazadas" element={<ProtectedRoutes><SolicitudesRechazadas /></ProtectedRoutes>} /> 
                <Route path="/SolicitudesAceptadas" element={<ProtectedRoutes><SolicitudesAceptadas /></ProtectedRoutes>} /> 
                <Route path="/Estudiantes" element={<ProtectedRoutes><Estudiantes /></ProtectedRoutes>} /> 
                <Route path="/RegistrarEstudiante" element={<ProtectedRoutes><RegistrarEstudiante /></ProtectedRoutes>} /> 
                <Route path="/Administracion" element={<ProtectedRoutes><Administracion /></ProtectedRoutes>} /> 
                <Route path="/PerfilAdministrador" element={<ProtectedRoutes><PerfilAdministrador /></ProtectedRoutes>} /> 
                <Route path="/VerAlianzas" element={<ProtectedRoutes><VerAlianzas /></ProtectedRoutes>} /> 
                <Route path="/MisCursos" element={<ProtectedRoutes><MisCursos /></ProtectedRoutes>} /> 
                <Route path="/Matricular" element={<ProtectedRoutes><Matricular /></ProtectedRoutes>} /> 
                <Route path="/MisPagos" element={<ProtectedRoutes><MisPagos /></ProtectedRoutes>} /> 
            </Routes>
        </Router>
    );
}

export default Routing;

//<Route path="/Administracion" element={<ProtectedRoutes><Administracion /></ProtectedRoutes>} /> 
//<Route path="/Update/:id" element={<ProtectedRoutes><Update /></ProtectedRoutes>} />