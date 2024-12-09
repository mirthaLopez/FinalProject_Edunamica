// AdminContext.js
import React, { createContext, useContext, useState } from 'react';

// Crea el contexto para los datos del administrador
const AdminContext = createContext();

// Hook para consumir el contexto
export const useAdmin = () => {
  return useContext(AdminContext);
};

// Proveedor del contexto
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const setAdminData = (adminData) => {
    setAdmin(adminData);
  };

  return (
    <AdminContext.Provider value={{ admin, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};
