import React, { createContext, useState, useContext, useEffect } from 'react';

// Creamos el contexto
const AuthContext = createContext();

// Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  // Al montar, obtenemos los tokens del localStorage si están disponibles
  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');
    
    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  // Función para guardar los tokens y los datos del usuario en el estado
  const setAuthData = (user, tokens) => {
    setUserData(user);
    setAccessToken(tokens.access);
    setRefreshToken(tokens.refresh);

    // Guardamos los tokens en el localStorage
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  };

  const logout = () => {
    setUserData(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return (
    <AuthContext.Provider value={{ userData, accessToken, refreshToken, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
