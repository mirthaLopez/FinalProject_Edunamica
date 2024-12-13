import React, { useState, useEffect } from 'react';
import PostUser from '../../Services/Users/PostUsers';
import GetAdmin from '../../Services/Administrators/GetAdministrators';
import GetStudent from '../../Services/Students/GetStudents';
import '../../Styles/Login/LoginForm.css';
import { TextField, Typography, Button } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Usar el nuevo contexto
import { useUser } from '../Administration/AdminContext'; // Importar el UserContext

function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [administrators, setAdministrators] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para cargar datos
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para mostrar loading en el botón
  const { login } = useAuth(); // Usamos login del contexto
  const { setUserData } = useUser(); // Obtener la función setUserData del contexto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminData = await GetAdmin();
        setAdministrators(adminData);
        const studentData = await GetStudent();
        setStudents(studentData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false); // Cuando los datos están cargados o si ocurre un error
      }
    };
    fetchData();
  }, []);

  // Funciones para manejar los inputs
  const handlePassword = (event) => setPassword(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);

  // Función que se ejecuta al enviar el formulario
  const cargar = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return;
    }

    setIsLoading(true); // Mostrar loading en el botón

    try {
      // Realizamos la solicitud de login
      const data = await PostUser(email, password); // Se obtiene el objeto con los tokens (data)

      if (data.access) {
        // Buscar el administrador o estudiante basado en el correo
        const admin = administrators.find((a) => a.admin_email === email);
        const student = students.find((s) => s.student_email === email);

        if (admin || student) {
          // Usamos el login del contexto para guardar el usuario y los tokens
          login(admin || student, { access: data.access, refresh: data.refresh });
          
          // Establecer los datos en el contexto del usuario
          setUserData(admin || student, admin ? 'admin' : 'student');
          
          // Mostrar mensaje de éxito y redirigir
          Swal.fire({
            title: 'Has iniciado sesión con éxito!',
            text: admin ? 'Te redirigiremos a la página de administradores' : 'Te redirigiremos a tu perfil',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 1500,
          }).then(() => {
            navigate(admin ? '/Solicitudes' : '/Matricular'); // Redirigir según el tipo de usuario
          });
        } else {
          // Si no se encuentra el usuario, mostrar error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal, verifica tus credenciales.',
            footer: '<a href="#">¿Por qué tengo este problema?</a>',
          });
        }
      } else {
        // Si no se obtiene el token de acceso, mostrar error
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Credenciales incorrectas. Intenta nuevamente.',
        });
      }
    } catch (error) {
      // Manejo de errores si la conexión con el servidor falla
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'No se pudo conectar con el servidor.',
      });
    } finally {
      setIsLoading(false); // Detener el loading en el botón
    }
  };

  // Si los datos están siendo cargados, mostrar un mensaje de carga
  if (loading) {
    return <div>Cargando...</div>; // O puedes usar un spinner aquí
  }

  return (
    <div className='login-edu-main-container'>
      <div className='login-edu-container'>
        <div className='login-edu-left'></div>
        <div className='login-edu-right'>
          <form className='login-edu-form' onSubmit={cargar}>
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Inicia sesión'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
