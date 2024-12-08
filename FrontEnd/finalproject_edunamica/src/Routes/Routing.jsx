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

//IMPORT DE ALIANZAS (AGREGAR ALIANZA)
import Alianzas from "../Pages/Alianzas/Alianzas";

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


import Inicio from "../Pages/Inicio";
import Principal from "../Pages/Principal"


//import ProtectedRoutes from "./ProtectedRoutes";
import ScrollToTop from "../Components/ScrollToTop";

const Routing = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Inicio />} /> 
                <Route path="/Login" element={<Login />} /> 
                <Route path="/Contacto" element={<Contacto />} /> 
                <Route path="/Curso" element={<Curso />} /> 
                <Route path="/Registro" element={<Registro />} /> 
                <Route path="/Solicitudes" element={<Solicitudes />} /> 
                <Route path="/Administradores" element={<Administradores />} /> 
                <Route path="/Matricula" element={<Matricula />} /> 
                <Route path="/Alianzas" element={<Alianzas />} /> 
                <Route path="/Cursos" element={<VerCurso />} /> 
                <Route path="/Principal" element={<Principal />} /> 
                <Route path="/CursosAdmin" element={<CursosAdmin />} /> 
                <Route path="/PerfilEstudiante" element={<PerfilEstudiante />} /> 
                <Route path="/SolicitudesRechazadas" element={<SolicitudesRechazadas />} /> 
                <Route path="/SolicitudesAceptadas" element={<SolicitudesAceptadas />} /> 
                <Route path="/Estudiantes" element={<Estudiantes />} /> 
                <Route path="/RegistrarEstudiante" element={<RegistrarEstudiante />} /> 
                <Route path="/Administracion" element={<Administracion />} /> 
            </Routes>
        </Router>
    );
}

export default Routing;

//<Route path="/Administracion" element={<ProtectedRoutes><Administracion /></ProtectedRoutes>} /> 
//<Route path="/Update/:id" element={<ProtectedRoutes><Update /></ProtectedRoutes>} />