import React, { useState, useEffect } from 'react';
import PostUser from '../../Services/Users/PostUsers';
import GetAdmin from '../../Services/Administrators/GetAdministrators';
import GetStudent from '../../Services/Students/GetStudents';
import '../../Styles/Login/LoginForm.css';
import { TextField, Typography, Button } from '@mui/material';
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../AuthContext'; // Usar el nuevo contexto

function FormLogin() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate(); 
  const [administrators, setAdministrators] = useState([]); 
  const [students, setStudents] = useState([]); 
  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación

  useEffect(() => {
    const fetchData = async () => {
      const adminData = await GetAdmin();
      setAdministrators(adminData);

      const studentData = await GetStudent();
      setStudents(studentData);
    };
    fetchData();
  }, []); 

  const handlePassword = (event) => setPassword(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);

  const cargar = async (event) => {
    event.preventDefault();

    try {
      const data = await PostUser(email, password);
      if (data.access) {
        const admin = administrators.find(a => a.admin_email === email);
        const student = students.find(s => s.student_email === email);

        if (admin) {
          setAuthData(admin, { access: data.access, refresh: data.refresh }); // Guardamos el usuario y tokens en el contexto
          Swal.fire({
            title: 'Has iniciado sesión con éxito!',
            text: 'Te redirigiremos a la página principal',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 1500
          });
          navigate('/Solicitudes');
        } else if (student) {
          setAuthData(student, { access: data.access, refresh: data.refresh });
          Swal.fire({
            title: 'Has iniciado sesión con éxito!',
            text: 'Te redirigiremos a tu perfil',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 1500
          });
          navigate('/Matricular');
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo salió mal, verifica tus credenciales.",
            footer: '<a href="#">¿Por qué tengo este problema?</a>'
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Credenciales incorrectas. Intenta nuevamente.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'No se pudo conectar con el servidor.',
      });
    }
  };

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
            <Button type="submit">Inicia sesión</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;

