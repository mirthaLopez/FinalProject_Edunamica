import React from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../AuthContext';

// ESTILOS CSS
import '../../Styles/AdminStyles/NavAdministration.css'; 

// IMPORTS DE LIBRERÍA MUI
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono para la cuenta de usuario
import LogoutIcon from '@mui/icons-material/Logout'; // Icono para el logout

// IMPORT DE IMÁGENES
import logo_edunamica from "../../Img/edunamica_logo.svg"; 

function NavAdministration() {
  
  // Usamos el contexto para obtener la función de logout
  const { logout } = useAuth();  // Recuperamos la función de logout desde el contexto de autenticación
  
  // Handler del logout usando el contexto
  const handleLogout = () => {
    console.log('Logout function called'); // Imprime un mensaje en la consola cuando se llama a logout
    logout();  // Llamamos a la función de logout definida en el contexto
    window.location.href = '/Login'; // Redirigimos a la página de login después de hacer logout
  };

  return (
    <div>
      <div className='header-admin-2'>  {/* Contenedor principal del header */}
        <div className='div-logo-header-2'>  {/* Contenedor para el logo */}
          <img src={logo_edunamica} className='logo-header-admin-2' />  {/* Muestra el logo de la aplicación */}
        </div>
        <div className='div-icon-mui-2'>  {/* Contenedor para los iconos de MUI */}
          <AccountCircleIcon sx={{ fontSize: 30 }} />  {/* Icono de cuenta de usuario con tamaño personalizado */}
          <LogoutIcon sx={{ fontSize: 30 }} onClick={handleLogout} />  {/* Icono de logout con evento de clic para hacer logout */}
        </div>
      </div>
    </div>
  );
}

export default NavAdministration;  // Exporta el componente para usarlo en otras partes de la aplicación