import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

//SERVICIOS
import PostAuthAdminUser from '../../Services/Users/PostAdminUser';
import PostAdmin from '../../Services/Administrators/postAdmin';

//ESTILOS CSS
import '../../Styles/Administration/NewAdmin.css';

//IMPORTS DE LIBRERÍA MUI
import { TextField, Button } from '@mui/material';

//IMPORT DE LIBRERÍA EMAIL JS
import emailjs from '@emailjs/browser';

//IMPORT DE LIBRERÍA NOTYF
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function NewAdmin() {
  // Estados del formulario
  const [admin_name, setName] = useState('');
  const [admin_first_last_name, setFirstLastName] = useState('');
  const [admin_second_last_name, setSecondLastName] = useState('');
  const [admin_phone_number, setPhoneNumber] = useState('');
  const [admin_email, setEmail] = useState('');
  const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } }));
  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
  

  // Función para agregar administrador
  const AddNewAdminButton = async () => {
    console.log('Botón agregar new admin user');
    
    // Validación de campos
    if (!admin_name || !admin_first_last_name || !admin_second_last_name || !admin_phone_number || !admin_email) {
      notyf.error('Por favor, completa todos los campos');
      return;
    }

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
          notyf.success('Administrador creado exitosamente!');

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
                notyf.success(`El código de verificación se ha enviado a: ${email}`);
              },
              (error) => {
                console.error('Error al enviar el correo:', error.text);
                notyf.error(`Error al enviar el correo: ${email}`);
              }
            );
        } else {
          console.error('No se pudo crear el administrador');
          notyf.error(`Error no se pudo crear el administrador`);
        }
      } else {
        console.error('No se pudo crear el auth_user');
        notyf.error(`Error no se pudo crear la autorización para el administrador`);
      }
    } catch (error) {
      console.error('Error al agregar a un nuevo administrador', error);
      notyf.error(`Error al agregar a un nuevo administrador`);
    } 
  };

  return (
    <div className="admin-registration">
      <h1 className="admin-registration-title">Registrar Nuevo Administrador</h1>

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