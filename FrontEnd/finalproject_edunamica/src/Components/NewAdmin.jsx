import React, { useState, useEffect } from 'react';
import {TextField, Button} from '@mui/material';
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

  // Obtener los usuarios autenticados (auth_user)
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await GetUsers();
        setAdmin(data); // Guardamos los usuarios autenticados
      } catch (error) {
        console.error("Error al obtener los usuarios autenticados:", error);
      }
    };
    fetchUsuarios();
  }, []);


 // Función para agregar administrador
 const AddNewAdminButton = async () => {
  console.log("Botón agregar new admin user");
  
  try {

    // Función para generar una contraseña aleatoria
    const generateRandomPassword = () => {
      return Math.floor(10000000 + Math.random() * 90000000).toString();
    };
    

    const username = admin_name;
    const email = admin_email;
    const password = generateRandomPassword();

    console.log("username:", username);
    console.log("email:", email);
    console.log("Contraseña generada:", password);

    const auth_user = await PostAuthAdminUser(username, email, password);
    
    if (auth_user) {
      console.log("Admin Auth_User creado de manera exitosa:", auth_user);
  
      // Obtener el ID de auth_user
      const authUserId = auth_user.id;
      console.log(authUserId);
  
      // Crear el administrador con el id de auth_user como FK
      const NewAdministrador = await PostAdmin(
        admin_name, 
        admin_first_last_name, 
        admin_second_last_name, 
        admin_phone_number, 
        admin_email, 
        authUserId);
  
        if (NewAdministrador) {
            console.log("Administrador creado exitosamente");
        } else {
            console.error("No se pudo crear el administrador");
          }

    } else {
        console.error("No se pudo crear el auth_user");
    }



  } catch (error) {

      console.error("Error al agregar a un nuevo administrador", error);
  
    }
  
};



  return (

    <div>
        <h1>NewAdmin</h1>

        <TextField value={admin_name} onChange={(e) => setName(e.target.value)} label="Nombre" name="name" />
        <br />
        <br />
        <TextField value={admin_first_last_name} onChange={(e) => setFirstLastName(e.target.value)} label="Apellido1" name="name" />
        <br />
        <br />
        <TextField value={admin_second_last_name} onChange={(e) => setSecondLastName(e.target.value)} label="Apellido2" name="name" />
        <br />
        <br />
        <TextField value={admin_phone_number} onChange={(e) => setPhoneNumber(e.target.value)} type='number' label="Número de teléfono" name="name" />
        <br />
        <br />
        <TextField value={admin_email} onChange={(e) => setEmail(e.target.value)} label="Correo Electrónico" name="name" />
        <br />
        <br />
        <Button onClick={AddNewAdminButton} type="submit" variant="contained" color="success">Registrar Administrador</Button>

    </div>

  )
}
export default NewAdmin;