import React, { useState } from 'react';
import { useAdmin } from '../Administration/AdminContext';
import { TextField, Button, Modal, Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import PutAdministrator from '../../Services/Administrators/PutAdministrators'; 
import PatchAdminPass from '../../Services/Users/PatchAdminPass';
import PatchAdminEmail from '../../Services/Users/PatchAdminEmail';

import '../../Styles/Administration/AdministratorProfile.css'

function AdministratorProfile() {
  const { admin, setAdminData } = useAdmin();
  console.log(admin);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    admin_name: admin?.admin_name || '',
    admin_first_last_name: admin?.admin_first_last_name || '',
    admin_second_last_name: admin?.admin_second_last_name || '',
    admin_email: admin?.admin_email || '',
    admin_phone_number: admin?.admin_phone_number || '',
  });

  const [newPassword, setNewPassword] = useState('');
  const [passwordEnabled, setPasswordEnabled] = useState(false); // Controla si el campo de contraseña está habilitado
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  // Función para abrir el modal
  const handleOpen = () => setOpen(true);

  // Función para cerrar el modal
  const handleClose = () => setOpen(false);

  // Actualiza los datos del formulario al modificar los campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario de datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      id: admin.id, 
      admin_auth_user_fk: admin.admin_auth_user_fk, 
    };

    // Verificar si el correo electrónico ha cambiado
    const emailChanged = formData.admin_email !== admin.admin_email;

    try {
      // Si el correo electrónico ha cambiado, primero se hace el cambio de correo
      if (emailChanged) {
        console.log("email cmabió");
        console.log(admin.admin_auth_user_fk);
        
        console.log(formData.admin_email);
        
        await PatchAdminEmail(admin.admin_auth_user_fk, formData.admin_email); // Ejecuta PatchAdminEmail
      }

      // Después de actualizar el correo (si es necesario), actualiza los demás datos
      await PutAdministrator(admin.id, updatedFormData); // Ejecuta PutAdministrator
      setAdminData(updatedFormData); 
      Swal.fire('Éxito', 'Datos actualizados correctamente', 'success');
      handleClose();
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar los datos', 'error');
    }
  };

  // Función para manejar el cambio de contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      Swal.fire('Error', 'Por favor ingrese una nueva contraseña', 'error');
      return;
    }

    try {
      await PatchAdminPass(admin.admin_auth_user_fk, newPassword); // Llama al servicio PATCH para actualizar la contraseña
      setIsPasswordUpdated(true);
      Swal.fire('Éxito', 'Contraseña actualizada correctamente', 'success');
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar la contraseña', 'error');
    }
  };

  // Función para manejar el cambio del valor de la nueva contraseña
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <div className="admin-profile-container">
      {admin ? (
        <div>
          <h1 className="admin-profile-title">Perfil de Administrador</h1>
          <p className="admin-profile-item"><strong>Nombre:</strong> {admin.admin_name} {admin.admin_first_last_name} {admin.admin_second_last_name}</p>
          <p className="admin-profile-item"><strong>Email:</strong> {admin.admin_email}</p>
          <p className="admin-profile-item"><strong>Teléfono:</strong> {admin.admin_phone_number}</p>
          <Button variant="contained" className="admin-profile-edit-button" onClick={handleOpen}>
            Editar datos
          </Button>
        </div>
      ) : (
        <p className="admin-profile-item">No se encontraron datos del administrador.</p>
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

            <Button type="submit" className="admin-profile-save-button" fullWidth>
              Guardar Cambios
            </Button>
          </form>
        </Box>
      </Modal>

      {/* Campo para la contraseña y el botón fuera del modal */}
      <div className="admin-profile-password-container">
        <Typography variant="h6" gutterBottom>
          Cambiar Contraseña
        </Typography>

        {/* Botón para habilitar el campo de contraseña */}
        {!passwordEnabled ? (
          <Button
            variant="outlined"
            className="admin-profile-enable-password-button"
            onClick={() => setPasswordEnabled(true)} // Habilitar el campo de contraseña
            fullWidth
          >
            Cambiar Contraseña
          </Button>
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
            <Button
              variant="outlined"
              className="admin-profile-save-password-button"
              onClick={handlePasswordSubmit} // Llamar a la función para actualizar la contraseña
              fullWidth
            >
              Guardar Contraseña
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default AdministratorProfile;





