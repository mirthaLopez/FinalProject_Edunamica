// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Crea el contexto para los datos del usuario (admin o estudiante)
const UserContext = createContext();

// Hook para consumir el contexto
export const useUser = () => {
  return useContext(UserContext);
};

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // El usuario puede ser admin o estudiante
  const [userType, setUserType] = useState(null); // 'admin' o 'student'

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
