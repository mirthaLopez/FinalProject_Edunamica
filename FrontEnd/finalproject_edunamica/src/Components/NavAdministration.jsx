import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import logo_edunamica from "../Img/edunamica_logo.svg"
import '../Styles/NavAdministration.css'

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