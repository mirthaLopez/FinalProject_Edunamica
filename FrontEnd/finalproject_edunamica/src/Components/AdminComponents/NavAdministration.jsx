import React from 'react'

//ESTILOS CSS
import '../../Styles/AdminStyles/NavAdministration.css'

//IMPORTS DE LIBRERIA MUI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

//IMPORT DE IMÁGENES
import logo_edunamica from "../../Img/edunamica_logo.svg"

function NavAdministration() {
    ///Navbar Administracion
  return (
    <div>
    <div className='header-admin'>
    <div className='div-logo-header'><img src={logo_edunamica} className='logo-header-admin' /></div>
    <div className='div-icon-mui'>
    <AccountCircleIcon sx={{ fontSize: 30 }}/>
    <LogoutIcon sx={{ fontSize: 30 }}/>
    </div>
  </div>
  </div>
  )
}

export default NavAdministration