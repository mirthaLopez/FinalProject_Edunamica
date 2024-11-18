import React, { useState } from 'react'; // Importa React y hooks de estado y efecto
import { useNavigate } from 'react-router-dom'; // Importa el hook para la navegación
//import { useAuth } from './AuthContext'; // Importa el contexto de autenticación
import Swal from 'sweetalert2'; 
import { TextField, Typography, Button} from '@mui/material';
import '../Styles/LoginForm.css'; // Importa estilos CSS para el formulario de inicio de sesión CREAR
import PostUser from '../Services/Users/PostUsers';


function FormLogin() {
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const navigate = useNavigate(); // Hook para la navegación

  // Funciones para manejar los cambios de estado
  const handlePassword = (event) => setPassword(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);

  // Función para manejar el inicio de sesión
  const cargar = async () => {
    const data = await PostUser(email, password); // Enviamos el correo y la contraseña
    console.log("Soy la respuesta del server:", data);
    if (data.access) {
      // Si la autenticación es exitosa, mostramos el mensaje de éxito
      Swal.fire({
        title: 'Has iniciado sesión con éxito!',
        text: 'Te redirigiremos a la página principal',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 1500
      });
      setTimeout(() => {
        navigate('/Pago'); // Redirige a la página de cursos
      }, 2000);
    } else {
      // Si la autenticación falla, mostramos un mensaje de error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal, verifica tus credenciales.",
        footer: '<a href="#">¿Por qué tengo este problema?</a>'
      });
    }
  };

  // Función para prevenir el envío del formulario
  function validacionEspacios(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario
  }

  return (
    <div className='MainContainer'> {/* Contenedor principal */}
      <div className='login-container'> {/* Contenedor del formulario de login */}
        <div className='login-left'></div>
        <div className='login-right'>
          <form className='login-form' onSubmit={validacionEspacios}> {/* Formulario de login */}
            <h1>Bienvenido</h1>
            <Typography>Inicia sesión en tu cuenta</Typography>
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
