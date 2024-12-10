import React, { useState } from 'react'; 
import { useUser } from '../Administration/AdminContext';
import { TextField, Button, Modal, Box, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import PatchStudentPass from '../../Services/Users/PatchStudentPass';
import PatchStudentEmail from '../../Services/Users/PatchStudentEmail';
import PutStudent from '../../Services/Students/PutStudents';
import error from '../../Img/computer.png';
import '../../Styles/Administration/AdministratorProfile.css';

function StudentProfile() {
  const { user, setUserData } = useUser();  // Obtenemos los datos del estudiante
  console.log(user);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_name: user?.student_name || '',
    student_first_last_name: user?.student_first_last_name || '',
    student_second_last_name: user?.student_second_last_name || '',
    student_email: user?.student_email || '',
    student_phone_number: user?.student_phone_number || '',
    address: user?.address || ''
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
      id: user.id,
      student_auth_user_fk: user.student_auth_user_fk,
    };

    // Verificar si el correo electrónico ha cambiado
    const emailChanged = formData.student_email !== user.student_email;

    try {
      // Si el correo electrónico ha cambiado, primero se hace el cambio de correo
      if (emailChanged) {
        console.log("email cambió");
        await PatchStudentEmail(user.student_auth_user_fk, formData.student_email); // Ejecuta PatchStudentEmail
      }

      // Después de actualizar el correo (si es necesario), actualiza los demás datos
      await PutStudent(user.id, updatedFormData); // Ejecuta PutStudent
      setUserData(updatedFormData);
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
      await PatchStudentPass(user.student_auth_user_fk, newPassword); // Llama al servicio PATCH para actualizar la contraseña
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
    <div className="student-profile-container">
      <div>
        <h1 className="student-profile-title">Perfil del Estudiante</h1>
        <div className='student-profile-data-container'>
          {user ? (
            <div>
              <p className="student-profile-item"><strong>Nombre:</strong> {user.student_name} {user.student_first_last_name} {user.student_second_last_name}</p>
              <p className="student-profile-item"><strong>Email:</strong> {user.student_email}</p>
              <p className="student-profile-item"><strong>Teléfono:</strong> {user.student_phone_number}</p>
              <p className="student-profile-item"><strong>Dirección:</strong> {user.address}</p>

              {/* Mostrar la imagen con el ID del estudiante */}
              {user.student_id_url && (
                <div className="student-id-container">
                  <p><strong>ID del Estudiante:</strong></p>
                  <img
                    src={user.student_id_url}
                    alt="ID del Estudiante"
                    className="student-id-image"
                    style={{ width: '200px', height: 'auto', margin: '20px 0' }}
                  />
                </div>
              )}

              <button variant="contained" className="student-profile-edit-button" onClick={handleOpen}>
                Editar datos
              </button>
            </div>
          ) : (
            <div>
              <p className="student-profile-item-2">Inicia sesión nuevamente para poder ver y editar los datos de tu perfil.</p>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center' }}>
                <img 
                  src={error} 
                  alt="" 
                  className='computer_error' 
                  style={{
                    width: '200px',
                    height: 'auto',
                    margin: '20px'
                  }} 
                />
              </div>
            </div>
          )}

          {/* Formulario para editar los datos del estudiante dentro del Modal */}
          <Modal open={open} onClose={handleClose}>
            <Box className="student-profile-modal-content">
              <Typography variant="h6" gutterBottom className="student-profile-modal-title">
                Editar Datos del Estudiante
              </Typography>
              <form onSubmit={handleSubmit}>
                <div className="student-profile-form-field">
                  <TextField
                    label="Nombre"
                    name="student_name"
                    value={formData.student_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="student-profile-form-field">
                  <TextField
                    label="Primer Apellido"
                    name="student_first_last_name"
                    value={formData.student_first_last_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="student-profile-form-field">
                  <TextField
                    label="Segundo Apellido"
                    name="student_second_last_name"
                    value={formData.student_second_last_name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="student-profile-form-field">
                  <TextField
                    label="Correo Electrónico"
                    name="student_email"
                    value={formData.student_email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="student-profile-form-field">
                  <TextField
                    label="Teléfono"
                    name="student_phone_number"
                    value={formData.student_phone_number}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="student-profile-form-field">
                  <TextField
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>

                <button type="submit" className="student-profile-save-button" fullWidth>
                  Guardar Cambios
                </button>
              </form>
            </Box>
          </Modal>
        </div>

        {/* Campo para la contraseña y el botón fuera del modal */}
        <div className="student-profile-password-container">
          <h3 className='title-change-password'>
            Cambia tu contraseña
          </h3>

          {/* Botón para habilitar el campo de contraseña */}
          {!passwordEnabled ? (
            <button
              variant="outlined"
              className="student-profile-enable-password-button"
              onClick={() => setPasswordEnabled(true)} // Habilitar el campo de contraseña
              fullWidth
            >
              Cambiar Contraseña
            </button>
          ) : (
            <>
              {/* Input para la nueva contraseña */}
              <div className="student-profile-form-field">
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
                className="student-profile-save-password-button"
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

export default StudentProfile;
