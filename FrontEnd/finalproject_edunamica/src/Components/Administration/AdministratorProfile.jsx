import React, { useState } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useUser } from '../Administration/AdminContext'; // Contexto para el usuario administrador
import { useAuth } from '../../Components/AuthContext'; // Contexto para la autenticación

// SERVICIOS
import PutAdministrator from '../../Services/Administrators/PutAdministrators'; // Servicio para actualizar datos del administrador
import PatchAdminPass from '../../Services/Users/PatchAdminPass'; // Servicio para actualizar la contraseña
import PatchAdminEmail from '../../Services/Users/PatchAdminEmail'; // Servicio para actualizar el correo electrónico

// ESTILOS CSS
import '../../Styles/Administration/AdministratorProfile.css' 

// IMPORTS DE LIBRERIA MUI
import { TextField, Button, Modal, Box, Typography } from '@mui/material'; 

// IMPORT DE SWEET ALERT
import Swal from 'sweetalert2';
// IMPORT DE IMÁGENES
import error from '../../Img/computer.png' 

function AdministratorProfile() {

  const { user, setUserData } = useUser();  // Extraemos los datos del usuario desde el contexto
  const { setAuthData } = useAuth(); // Extraemos la función de autenticación desde el contexto
  
  const [open, setOpen] = useState(false); // Estado que controla si el modal está abierto o cerrado
  const formData = {
    ...user,  // Los datos del usuario (admin o estudiante)
    admin_name: user?.admin_name || '',  // Nombre del administrador
    admin_first_last_name: user?.admin_first_last_name || '', // Primer apellido
    admin_second_last_name: user?.admin_second_last_name || '', // Segundo apellido
    admin_email: user?.admin_email || '',  // Correo electrónico
    admin_phone_number: user?.admin_phone_number || '',  // Número de teléfono
  };
  
  const [newPassword, setNewPassword] = useState(''); // Estado para almacenar la nueva contraseña
  const [passwordEnabled, setPasswordEnabled] = useState(false); // Controla si el campo de nueva contraseña está habilitado
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false); // Estado que indica si la contraseña fue actualizada

  // Función para abrir el modal de edición
  const handleOpen = () => setOpen(true);

  // Función para cerrar el modal de edición
  const handleClose = () => setOpen(false);

  // Actualiza los datos del formulario al modificar los campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario de datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparamos los datos actualizados del formulario
    const updatedFormData = {
      ...formData,
      id: user.id, 
      admin_auth_user_fk: user.admin_auth_user_fk, 
    };

    // Verificar si el correo electrónico ha cambiado
    const emailChanged = formData.admin_email !== user.admin_email;

    try {
      // Si el correo electrónico ha cambiado, primero se hace el cambio de correo
      if (emailChanged) {
        console.log("email cambió");
        console.log(user.admin_auth_user_fk);
        
        console.log(formData.admin_email);
        
        // Llamamos al servicio de cambio de correo
        await PatchAdminEmail(user.admin_auth_user_fk, formData.admin_email); 
      }

      // Después de actualizar el correo (si es necesario), actualizamos los demás datos
      await PutAdministrator(user.id, updatedFormData); // Ejecuta el servicio para actualizar los datos del administrador
      setAdminData(updatedFormData); // Actualiza los datos en el contexto de usuario
      Swal.fire('Éxito', 'Datos actualizados correctamente', 'success'); // Muestra alerta de éxito
      handleClose(); // Cierra el modal
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar los datos', 'error'); // Muestra alerta de error
    }
  };

  // Función para manejar el cambio de contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Verificar si se ingresó una nueva contraseña
    if (!newPassword) {
      Swal.fire('Error', 'Por favor ingrese una nueva contraseña', 'error');
      return;
    }

    try {
      // Llamamos al servicio para cambiar la contraseña
      await PatchAdminPass(user.admin_auth_user_fk, newPassword); 
      setIsPasswordUpdated(true); // Marca que la contraseña fue actualizada
      Swal.fire('Éxito', 'Contraseña actualizada correctamente', 'success'); // Alerta de éxito
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar la contraseña', 'error'); // Alerta de error
    }
  };

  // Función para manejar el cambio del valor de la nueva contraseña
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <div className="admin-profile-container">
      <div>
      <h1 className="admin-profile-title">Perfil de Administrador</h1>
      <div className='admin-profile-data-container'>
      {user ? ( // Verifica si hay datos del usuario
        <div>
          <p className="admin-profile-item"><strong>Nombre:</strong> {user.admin_name} {user.admin_first_last_name} {user.admin_second_last_name}</p>
          <p className="admin-profile-item"><strong>Email:</strong> {user.admin_email}</p>
          <p className="admin-profile-item"><strong>Teléfono:</strong> {user.admin_phone_number}</p>
          <button variant="contained" className="admin-profile-edit-button" onClick={handleOpen}>
            Editar datos
          </button>
        </div>
      ) : ( // Si no hay datos del usuario, muestra mensaje de error
        <div >
          <div >
          <p className="admin-profile-item-2">Inicia sesión nuevamente para poder ver y editar los datos de tu perfil.</p> </div>
          <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
            <img 
              src={error} 
              alt="" 
              className='computer_error' 
              style={{
                width: '200px',   // Establece el ancho de la imagen
                height: 'auto',   // Mantiene la proporción de la imagen
                margin: '20px'  // Añade un margen alrededor de la imagen
              }} 
            />
          </div>
        </div>
      )}

      {/* Formulario para editar los datos del administrador dentro del Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box className="admin-profile-modal-content">
          <Typography variant="h6" gutterBottom className="admin-profile-modal-title">
            Editar Datos del Administrador
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="admin-profile-form-field">
              <TextField
                label="Nombre"
                name="admin_name"
                value={formData.admin_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div className="admin-profile-form-field">
              <TextField
                label="Primer Apellido"
                name="admin_first_last_name"
                value={formData.admin_first_last_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div className="admin-profile-form-field">
              <TextField
                label="Segundo Apellido"
                name="admin_second_last_name"
                value={formData.admin_second_last_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div className="admin-profile-form-field">
              <TextField
                label="Correo Electrónico"
                name="admin_email"
                value={formData.admin_email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>
            <div className="admin-profile-form-field">
              <TextField
                label="Teléfono"
                name="admin_phone_number"
                value={formData.admin_phone_number}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </div>

            <button type="submit" className="admin-profile-save-button" fullWidth>
              Guardar Cambios
            </button>
          </form>
        </Box>
      </Modal>
      </div>
      {/* Campo para la contraseña y el botón fuera del modal */}
      <div className="admin-profile-password-container">
        <h3 className='title-change-password'>
          Cambia tu contraseña
        </h3>

        {/* Botón para habilitar el campo de contraseña */}
        {!passwordEnabled ? (
          <button
            variant="outlined"
            className="admin-profile-enable-password-button"
            onClick={() => setPasswordEnabled(true)} // Habilitar el campo de contraseña
            fullWidth
          >
            Cambiar Contraseña
          </button>
        ) : (
          <>
            {/* Input para la nueva contraseña */}
            <div className="admin-profile-form-field">
              <TextField
                label="Nueva Contraseña"
                type="password"
                value={newPassword}
                onChange={handlePasswordChange} // Esta es la función que ahora está definida
                fullWidth
                margin="normal"
                required
              />
            </div>

            {/* Botón para guardar la nueva contraseña */}
            <button
              variant="outlined"
              className="admin-profile-save-password-button"
              onClick={handlePasswordSubmit} // Llamar a la función para actualizar la contraseña
              fullWidth
            >
              Guardar Contraseña
            </button>
          </>
        )}
      </div>
      </div>
    </div>
  );
}

export default AdministratorProfile;