import React, { useState, useEffect } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext'; 

// SERVICIOS
import PostAuthAdminUser from '../../Services/Users/PostAdminUser'; // Servicio para crear el auth_user
import PostAdmin from '../../Services/Administrators/postAdmin'; // Servicio para crear el administrador

// ESTILOS CSS
import '../../Styles/Administration/NewAdmin.css'; 

// IMPORTS DE LIBRERÍA MUI
import { TextField, Button } from '@mui/material'; 

// IMPORT DE LIBRERÍA EMAIL JS
import emailjs from '@emailjs/browser'; 

// IMPORT DE LIBRERÍA NOTYF
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 

function NewAdmin() {
  // Declaración de los estados para manejar los valores del formulario
  const [admin_name, setName] = useState(''); // Nombre del administrador
  const [admin_first_last_name, setFirstLastName] = useState(''); // Primer apellido
  const [admin_second_last_name, setSecondLastName] = useState(''); // Segundo apellido
  const [admin_phone_number, setPhoneNumber] = useState(''); // Número de teléfono
  const [admin_email, setEmail] = useState(''); // Correo electrónico
  const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } })); // Instancia de Notyf para mostrar notificaciones
  const { setAuthData } = useAuth(); // Usamos el contexto de autenticación

  // Función que se ejecuta al hacer clic en el botón para agregar un nuevo administrador
  const AddNewAdminButton = async () => {
    console.log('Botón agregar new admin user');
    
    // Validación de los campos del formulario para asegurarse de que no están vacíos
    if (!admin_name || !admin_first_last_name || !admin_second_last_name || !admin_phone_number || !admin_email) {
      notyf.error('Por favor, completa todos los campos'); // Muestra una notificación de error si algún campo está vacío
      return;
    }

    try {
      // Función para generar una contraseña aleatoria de 8 dígitos
      const generateRandomPassword = () => Math.floor(10000000 + Math.random() * 90000000).toString();

      const username = admin_email; // Usamos el correo electrónico como nombre de usuario
      const email = admin_email; // El correo también es el email del usuario
      const password = generateRandomPassword(); // Generamos una contraseña aleatoria

      console.log('username:', username);
      console.log('email:', email);
      console.log('Contraseña generada:', password);

      // Crear el usuario de autenticación llamando a la API de PostAuthAdminUser
      const auth_user = await PostAuthAdminUser(username, email, password);

      // Si la creación del usuario fue exitosa
      if (auth_user) {
        console.log('Admin Auth_User creado de manera exitosa:', auth_user);

        const authUserId = auth_user.id; // Obtener el ID del usuario creado
        const admin_auth_user_fk = authUserId; // Establecer la relación con el administrador

        // Crear el administrador 
        const NewAdministrador = await PostAdmin(
          admin_name,
          admin_first_last_name,
          admin_second_last_name,
          admin_phone_number,
          admin_email,
          admin_auth_user_fk
        );

        // Si la creación del administrador fue exitosa
        if (NewAdministrador) {
          console.log('Administrador creado exitosamente');
          notyf.success('Administrador creado exitosamente!'); // Notificación de éxito

          // Parámetros para el correo electrónico que se enviará al nuevo administrador
          const templateParams = {
            user_name: admin_name, // Nombre del usuario
            to_email: email, // Correo del destinatario
            verification_code: password, // Código de verificación (contraseña generada)
          };

          // Enviar el correo usando EmailJS
          emailjs
            .send('service_lgmm5so', 'template_wv3sdno', templateParams, 'xKYQea8wmj0LgY5FG')
            .then(
              (response) => {
                console.log('Correo enviado con éxito!', response);
                notyf.success(`El código de verificación se ha enviado a: ${email}`); // Notificación de éxito en el envío del correo
              },
              (error) => {
                console.error('Error al enviar el correo:', error.text);
                notyf.error(`Error al enviar el correo: ${email}`); // Notificación de error en el envío del correo
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
      notyf.error(`Error al agregar a un nuevo administrador`); // Notificación de error general si ocurre un fallo en el proceso
    } 
  };

  return (
    <div className="admin-registration">
      <h1 className="admin-registration-title">Registrar Nuevo Administrador</h1>

      {/* Campos del formulario para registrar un nuevo administrador */}
      <TextField
        value={admin_name} 
        onChange={(e) => setName(e.target.value)} 
        label="Nombre"
        name="name"
        className="admin-registration__input admin-registration__input--name" 
      />
      <br />
      <br />
      <TextField
        value={admin_first_last_name} 
        onChange={(e) => setFirstLastName(e.target.value)}
        label="Primer Apellido"
        name="firstLastName"
        className="admin-registration__input admin-registration__input--first-last-name"
      />
      <br />
      <br />
      <TextField
        value={admin_second_last_name} 
        onChange={(e) => setSecondLastName(e.target.value)}
        label="Segundo Apellido"
        name="secondLastName"
        className="admin-registration__input admin-registration__input--second-last-name"
      />
      <br />
      <br />
      <TextField
        value={admin_phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)} 
        type="number"
        label="Número de Teléfono"
        name="phoneNumber"
        className="admin-registration__input admin-registration__input--phone-number"
      />
      <br />
      <br />
      <TextField
        value={admin_email}
        onChange={(e) => setEmail(e.target.value)} 
        label="Correo Electrónico"
        name="email"
        className="admin-registration__input admin-registration__input--email"
      />
      <br />
      <br />
      {/* Botón para enviar el formulario */}
      <div className="divButtonNewAdmin">
        <button
          onClick={AddNewAdminButton} 
          type="submit" 
          variant="contained"
          color="success" 
          className="admin-registration__button" 
        >
          ENVIAR
        </button>
      </div>
    </div>
  );
}

export default NewAdmin;