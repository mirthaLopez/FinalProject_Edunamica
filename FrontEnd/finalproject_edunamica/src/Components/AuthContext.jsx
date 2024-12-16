import React, { createContext, useState, useContext, useEffect } from 'react';
import { refreshAccessToken as refreshAccessTokenService } from '../../src/Services/Users/Refreshtoken'; // Importa el servicio de refresco

// Creamos el contexto
const AuthContext = createContext();

// Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token') || null);

  // Al montar, intentamos refrescar el token de acceso si existe
  useEffect(() => {
    if (refreshToken) {
      refreshAccessToken(); // Intentar refrescar el token de acceso cuando el refreshToken esté disponible
    }
  }, [refreshToken]);

  // Función para refrescar el token de acceso usando el refresh token
  const refreshAccessToken = async () => {
    if (!refreshToken) {
      console.log('No refresh token found');
      logout(); // Si no hay refresh token, realizar logout
      return;
    }

    try {
      // Llamada al servicio de refresco de token
      const newAccessToken = await refreshAccessTokenService(refreshToken);
      setAccessToken(newAccessToken); // Establecer el nuevo token de acceso
      localStorage.setItem('access_token', newAccessToken); // Actualizar en localStorage

      console.log('Access token refreshed:', newAccessToken);
    } catch (error) {
      console.error('Error al refrescar el token', error);
      logout(); // Si no se pudo refrescar, cerrar sesión
    }
  };

  // Función para guardar los tokens y los datos del usuario en el estado
  const setAuthData = (user, tokens) => {
    setUserData(user);
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);

    // Guardamos los tokens en el localStorage
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  };

  // Función de logout
  const logout = () => {
    console.log('Logout exitoso');
    setUserData(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  // Función de login que puede establecer los datos del usuario
  const login = (user, tokens) => {
    setAuthData(user, tokens);
  };

  return (
    <AuthContext.Provider value={{ userData, accessToken, refreshToken, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};