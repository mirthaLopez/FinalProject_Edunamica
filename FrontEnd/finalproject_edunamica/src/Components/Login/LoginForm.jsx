import React, { useState, useEffect } from 'react';

//SERVICIOS
import PostUser from '../../Services/Users/PostUsers';
import GetAdmin from '../../Services/Administrators/GetAdministrators';

//ESTILOS CSS
import '../../Styles/Login/LoginForm.css';

//IMPORTS DE LIBRERIA MUI
import {TextField, Typography, Button} from '@mui/material';

//IMPORT DE LIBRERIA SWEET ALERT
import Swal from 'sweetalert2'; 

//IMPORT DE USE NAVIGATE
import {useNavigate} from 'react-router-dom'; 

import { useAdmin } from '../Administration/AdminContext';



function FormLogin() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); 
  const [administrators, setAdministrators] = useState([]); 
  const { setAdminData } = useAdmin(); // Usamos AdminContext


  useEffect(() => {
    const fetchData = async () => {
      const adminData = await GetAdmin();
      setAdministrators(adminData);
    };
    fetchData();
  }, []);

  const handlePassword = (event) => setPassword(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);

  const cargar = async () => {
    const data = await PostUser(email, password); 
    if (data.access) {
      const admin = administrators.find(a => a.admin_email === email );
      if (admin) {
        setAdminData(admin); // Guarda los datos del admin en el AdminContext
        Swal.fire({
          title: 'Has iniciado sesión con éxito!',
          text: 'Te redirigiremos a la página principal',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 1500
        });
        setTimeout(() => {
          navigate('/Solicitudes'); 
        }, 2000);
      } else {
        Swal.fire({
          title: 'Has iniciado sesión con éxito!',
          text: 'Te redirigiremos a la página principal',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 1500
        });
        setTimeout(() => {
          navigate('/PerfilEstudiante'); 
        }, 2000);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal, verifica tus credenciales.",
        footer: '<a href="#">¿Por qué tengo este problema?</a>'
      });
    }
  };

  function validacionEspacios(event) {
    event.preventDefault();
  }

  return (
    <div className='login-edu-main-container'>
      <div className='login-edu-container'>
        <div className='login-edu-left'></div>
        <div className='login-edu-right'>
          <form className='login-edu-form' onSubmit={validacionEspacios}>
            <h1>Bienvenido a Edunámica</h1>
            <Typography>Inicia sesión con tu cuenta.</Typography>
            <TextField 
              type="email" 
              id='correo' 
              name='correo' 
              label="Correo electrónico" 
              value={email} 
              onChange={handleEmail} 
              required 
            /><br /><br />
            <TextField 
              type="password" 
              id='password' 
              name='password' 
              label="Contraseña" 
              value={password} 
              onChange={handlePassword} 
              required 
            />
            <Button type="submit" onClick={cargar}>Inicia sesión</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;

