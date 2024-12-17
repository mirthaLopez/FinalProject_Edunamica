import React, { useState, useEffect } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../AuthContext'; // Contexto de autenticación
import { useUser } from '../Administration/AdminContext'; // Contexto para los datos del usuario

// SERVICIOS
import PostUser from '../../Services/Users/PostUsers'; // Servicio para realizar el login de usuario
import GetAdmin from '../../Services/Administrators/GetAdministrators'; // Servicio para obtener los administradores
import GetStudent from '../../Services/Students/GetStudents'; // Servicio para obtener los estudiantes

// ESTILOS CSS
import '../../Styles/Login/LoginForm.css'; // Estilos específicos para el formulario de login

// IMPORTS DE LIBRERIA MUI
import { TextField, Typography, Button } from '@mui/material'; // Componentes de Material UI

// IMPORT DE LINK TO
import { useNavigate } from 'react-router-dom'; // Hook de React Router para la navegación

// IMPORT DE SWEET ALERT
import Swal from 'sweetalert2'; // Librería para mostrar alertas

function FormLogin() {
  // Definir estados locales para el formulario
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const [administrators, setAdministrators] = useState([]); // Estado para almacenar los administradores
  const [students, setStudents] = useState([]); // Estado para almacenar los estudiantes
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos (administradores y estudiantes)
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar "cargando..." en el botón durante el login
  const { login } = useAuth(); // Función para realizar login desde el contexto de autenticación
  const { setUserData } = useUser(); // Función para guardar los datos del usuario en el contexto

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
        setLoading(false); 
      }
    };
    fetchData(); 
  }, []); 

  // Funciones para manejar los cambios en los campos de entrada
  const handlePassword = (event) => setPassword(event.target.value); // Actualiza el estado de la contraseña
  const handleEmail = (event) => setEmail(event.target.value); // Actualiza el estado del correo electrónico

  // Función que se ejecuta al enviar el formulario
  const cargar = async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario (recarga de página)

    // Validación de campos vacíos
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos.',
      });
      return; // Salir de la función si faltan campos
    }

    setIsLoading(true); // Activar el estado de carga en el botón

    try {
      // Llamada al servicio de autenticación con el correo y contraseña
      const data = await PostUser(email, password); // Se obtiene el objeto con los tokens (data)

      if (data.access) {
        // Si el token de acceso está presente, intentar encontrar al usuario correspondiente
        const admin = administrators.find((a) => a.admin_email === email); // Buscar el administrador con el correo
        const student = students.find((s) => s.student_email === email); // Buscar el estudiante con el correo

        if (admin || student) {
          // Si el usuario (administrador o estudiante) es encontrado, realizar login
          login(admin || student, { access: data.access, refresh: data.refresh }); // Llamar a la función de login del contexto

          // Establecer los datos del usuario en el contexto
          setUserData(admin || student, admin ? 'admin' : 'student');
          
          // Mostrar un mensaje de éxito con Swal
          Swal.fire({
            title: 'Has iniciado sesión con éxito!',
            text: admin ? 'Te redirigiremos a la página de administradores' : 'Te redirigiremos a tu perfil',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 1500, 
          }).then(() => {
            // Redirigir según el tipo de usuario
            navigate(admin ? '/Solicitudes' : '/Matricular');
          });
        } else {
          // Si el usuario no es encontrado, mostrar un error
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
      setIsLoading(false); 
    }
  };

 
  if (loading) {
    return <div>Cargando...</div>; 
  }

  return (
    <div className='login-edu-main-container'>
      <div className='login-edu-container'>
        <div className='login-edu-left'></div>
        <div className='login-edu-right'>
          <form className='login-edu-form' onSubmit={cargar}>
            <h1>Bienvenido a Edunámica</h1>
            <Typography>Inicia sesión con tu cuenta.</Typography>
            {/* Campo de correo electrónico */}
            <TextField
              type="email"
              id='correo'
              name='correo'
              label="Correo electrónico"
              value={email}
              onChange={handleEmail} 
              required
            /><br /><br />
            {/* Campo de contraseña */}
            <TextField
              type="password"
              id='password'
              name='password'
              label="Contraseña"
              value={password}
              onChange={handlePassword} 
              required
            />
            {/* Botón de inicio de sesión */}
            <Button type="submit" disabled={isLoading}> 
              {isLoading ? 'Cargando...' : 'Inicia sesión'} {/* Muestra "Cargando..." si está en estado de carga */}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;