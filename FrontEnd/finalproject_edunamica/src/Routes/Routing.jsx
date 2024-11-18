import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../Pages/Login";
import Contacto from "../Pages/Contacto";
import Inicio from "../Pages/Inicio";
import Curso from "../Pages/Curso";
import Registro from "../Pages/Registro";
import Solicitudes from "../Pages/Solicitudes";
import Administradores from "../Pages/Administradores";
import Pago from "../Pages/Pago";


//import ProtectedRoutes from "./ProtectedRoutes";
//import ScrollToTop from "../Components/ScrollToTop";
//<ScrollToTop /> PONER ESTA ENTRE <Router><Routes>

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} /> 
                <Route path="/Login" element={<Login />} /> 
                <Route path="/Contacto" element={<Contacto />} /> 
                <Route path="/Curso" element={<Curso />} /> 
                <Route path="/Registro" element={<Registro />} /> 
                <Route path="/Solicitudes" element={<Solicitudes />} /> 
                <Route path="/Administradores" element={<Administradores />} /> 
                <Route path="/Pago" element={<Pago />} /> 
            </Routes>
        </Router>
    );
}

export default Routing;

//<Route path="/Administracion" element={<ProtectedRoutes><Administracion /></ProtectedRoutes>} /> 
//<Route path="/Update/:id" element={<ProtectedRoutes><Update /></ProtectedRoutes>} />