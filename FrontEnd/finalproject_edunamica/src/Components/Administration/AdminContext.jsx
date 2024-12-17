// UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crea el contexto para los datos del usuario (admin o estudiante)
const UserContext = createContext();

// Hook para consumir el contexto
export const useUser = () => {
  return useContext(UserContext);
};

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  // Lee los datos del usuario desde el localStorage si existen
  const storedUser = localStorage.getItem('user');
  const storedUserType = localStorage.getItem('userType');

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null); // El usuario puede ser admin o estudiante
  const [userType, setUserType] = useState(storedUserType || null); // 'admin' o 'student'

  // Guarda los datos del usuario en localStorage cada vez que cambien
  useEffect(() => {
    if (user && userType) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', userType);
    } else {
      // Si no hay usuario, limpia el localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
    }
  }, [user, userType]);

  const setUserData = (userData, type) => {
    setUser(userData);
    setUserType(type); // Establece el tipo de usuario (admin o student)
  };

  return (
    <UserContext.Provider value={{ user, userType, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

