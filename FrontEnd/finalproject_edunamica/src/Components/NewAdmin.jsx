import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { TextField, Button } from '@mui/material';
import GetUsers from '../Services/Users/GetUsers';
import PostAuthAdminUser from '../Services/Users/PostAdminUser';
import PostAdmin from '../Services/Administrators/postAdmin';

function NewAdmin() {
  // Estados del formulario
  const [admin_name, setName] = useState('');
  const [admin_first_last_name, setFirstLastName] = useState('');
  const [admin_second_last_name, setSecondLastName] = useState('');
  const [admin_phone_number, setPhoneNumber] = useState('');
  const [admin_email, setEmail] = useState('');

  const [admin, setAdmin] = useState([]);
  console.log(admin);
  

  // Obtener los usuarios autenticados (auth_user)
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await GetUsers();
        setAdmin(data); // Guardamos los usuarios autenticados
      } catch (error) {
        console.error('Error al obtener los usuarios autenticados:', error);
      }
    };
    fetchUsuarios();
  }, []);

  // Función para agregar administrador
  const AddNewAdminButton = async () => {
    console.log('Botón agregar new admin user');

    try {
      // Función para generar una contraseña aleatoria
      const generateRandomPassword = () => Math.floor(10000000 + Math.random() * 90000000).toString();

      const username = admin_email;
      const email = admin_email;
      const password = generateRandomPassword();

      console.log('username:', username);
      console.log('email:', email);
      console.log('Contraseña generada:', password);

      // Crear auth_user
      const auth_user = await PostAuthAdminUser(username, email, password);

      if (auth_user) {
        console.log('Admin Auth_User creado de manera exitosa:', auth_user);

        const authUserId = auth_user.id;
        const admin_auth_user_fk = authUserId;

        // Crear administrador
        const NewAdministrador = await PostAdmin(
          admin_name,
          admin_first_last_name,
          admin_second_last_name,
          admin_phone_number,
          admin_email,
          admin_auth_user_fk
        );

        if (NewAdministrador) {
          console.log('Administrador creado exitosamente');

          // Preparar los parámetros para enviar el correo
          const templateParams = {
            user_name: admin_name, // Nombre del usuario
            to_email: email, // Correo del destinatario
            verification_code: password, // Código de verificación
          };

          // Enviar el correo usando EmailJS
          emailjs
            .send('service_lgmm5so', 'template_wv3sdno', templateParams, 'xKYQea8wmj0LgY5FG')
            .then(
              (response) => {
                console.log('Correo enviado con éxito!', response);
                alert(`El código de verificación se ha enviado a ${email}`);
              },
              (error) => {
                console.error('Error al enviar el correo:', error.text);
              }
            );
        } else {
          console.error('No se pudo crear el administrador');
        }
      } else {
        console.error('No se pudo crear el auth_user');
      }
    } catch (error) {
      console.error('Error al agregar a un nuevo administrador', error);
    }
  };

  return (
    <div>
      <h1>Registrar Nuevo Administrador</h1>

      <TextField
        value={admin_name}
        onChange={(e) => setName(e.target.value)}
        label="Nombre"
        name="name"
      />
      <br />
      <br />
      <TextField
        value={admin_first_last_name}
        onChange={(e) => setFirstLastName(e.target.value)}
        label="Primer Apellido"
        name="firstLastName"
      />
      <br />
      <br />
      <TextField
        value={admin_second_last_name}
        onChange={(e) => setSecondLastName(e.target.value)}
        label="Segundo Apellido"
        name="secondLastName"
      />
      <br />
      <br />
      <TextField
        value={admin_phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
        type="number"
        label="Número de Teléfono"
        name="phoneNumber"
      />
      <br />
      <br />
      <TextField
        value={admin_email}
        onChange={(e) => setEmail(e.target.value)}
        label="Correo Electrónico"
        name="email"
      />
      <br />
      <br />
      <Button
        onClick={AddNewAdminButton}
        type="submit"
        variant="contained"
        color="success"
      >
        Registrar Administrador
      </Button>
    </div>
  );
}

export default NewAdmin;
