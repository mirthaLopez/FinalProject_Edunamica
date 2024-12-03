import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2'; 
import { TextField, Typography, Button } from '@mui/material';
import '../Styles/LoginForm.css'; // Importa los estilos CSS
import PostUser from '../Services/Users/PostUsers';
import GetAdmin from '../Services/Administrators/GetAdministrators';

function FormLogin() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); 
  const [administrators, setAdministrators] = useState([]); 

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

