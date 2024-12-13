import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

const ProtectedRoutes = ({ children }) => {
  const { accessToken } = useAuth();

  // Si no hay datos de usuario o no hay token de acceso, redirigir a la página de login
  if (!accessToken) {
    return <Navigate to="/Login" />;
  }

  // Si hay usuario y token de acceso, mostrar el contenido protegido
  return children;
};

export default ProtectedRoutes;
