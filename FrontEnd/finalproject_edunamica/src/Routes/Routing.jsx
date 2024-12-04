import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../Pages/Login";
import Contacto from "../Pages/Contacto";
import Inicio from "../Pages/Inicio";
import Curso from "../Pages/CrearCurso";
import Registro from "../Pages/Registro";
import Solicitudes from "../Pages/Solicitudes";
import Administradores from "../Pages/Administradores";
import Pago from "../Pages/Pago";
import Matricula from "../Pages/Matricula";
import Alianzas from "../Pages/Alianzas";
import VerCurso from "../Pages/VerCurso"
import Prueba from "../Pages/Prueba"
import Principal from "../Pages/Principal"
import CursosAdmin from "../Pages/CursosAdmin"
import PerfilEstudiante from "../Pages/PerfilEstudiante";
import SolicitudesRechazadas from "../Pages/Solicitudes/SolicitudesRechazadas";
import SolicitudesAceptadas from "../Pages/Solicitudes/SolicitudesAceptadas";
import Estudiantes from "../../src/Pages/Estudiantes/Estudiantes";

//import ProtectedRoutes from "./ProtectedRoutes";
import ScrollToTop from "../Components/ScrollToTop";
//<ScrollToTop /> PONER ESTA ENTRE <Router><Routes>

const Routing = () => {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/Prueba" element={<Prueba />} /> 
                <Route path="/" element={<Inicio />} /> 
                <Route path="/Login" element={<Login />} /> 
                <Route path="/Contacto" element={<Contacto />} /> 
                <Route path="/Curso" element={<Curso />} /> 
                <Route path="/Registro" element={<Registro />} /> 
                <Route path="/Solicitudes" element={<Solicitudes />} /> 
                <Route path="/Administradores" element={<Administradores />} /> 
                <Route path="/Pago" element={<Pago />} /> 
                <Route path="/Matricula" element={<Matricula />} /> 
                <Route path="/Alianzas" element={<Alianzas />} /> 
                <Route path="/Cursos" element={<VerCurso />} /> 
                <Route path="/Principal" element={<Principal />} /> 
                <Route path="/CursosAdmin" element={<CursosAdmin />} /> 
                <Route path="/PerfilEstudiante" element={<PerfilEstudiante />} /> 
                <Route path="/SolicitudesRechazadas" element={<SolicitudesRechazadas />} /> 
                <Route path="/SolicitudesAceptadas" element={<SolicitudesAceptadas />} /> 
                <Route path="/Estudiantes" element={<Estudiantes />} /> 
            </Routes>
        </Router>
    );
}

export default Routing;

//<Route path="/Administracion" element={<ProtectedRoutes><Administracion /></ProtectedRoutes>} /> 
//<Route path="/Update/:id" element={<ProtectedRoutes><Update /></ProtectedRoutes>} />