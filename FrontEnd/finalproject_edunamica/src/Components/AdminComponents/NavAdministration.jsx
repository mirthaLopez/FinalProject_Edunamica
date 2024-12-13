import React from 'react';

// ESTILOS CSS
import '../../Styles/AdminStyles/NavAdministration.css';

// IMPORTS DE LIBRERÍA MUI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

// IMPORT DE IMÁGENES
import logo_edunamica from "../../Img/edunamica_logo.svg";

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../AuthContext';  // Ajusta la ruta al archivo donde está tu contexto

function NavAdministration() {
  // Usamos el contexto para obtener la función de logout
  const { logout } = useAuth();
  

  // Handler del logout usando el contexto
  const handleLogout = () => {
    console.log('Logout function called');
    logout();  // Llamamos a la función de logout definida en el contexto
    window.location.href = '/Login'; // Redirigimos a la página de login
  };

  return (
    <div>
      <div className='header-admin-2'>
        <div className='div-logo-header-2'>
          <img src={logo_edunamica} className='logo-header-admin-2' />
        </div>
        <div className='div-icon-mui-2'>
          <AccountCircleIcon sx={{ fontSize: 30 }} />
          <LogoutIcon sx={{ fontSize: 30 }} onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default NavAdministration;

