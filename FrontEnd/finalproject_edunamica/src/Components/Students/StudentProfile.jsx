import React, { useState, useEffect } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useUser } from '../../Components/Administration/AdminContext'; // Hook personalizado para obtener los datos del usuario (estudiante)
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto de autenticación

// SERVICIOS
import PatchStudentPass from '../../Services/Users/PatchStudentPass'; // Para actualizar la contraseña del estudiante
import PatchStudentEmail from '../../Services/Users/PatchStudentEmail'; // Para actualizar el correo electrónico
import PutStudent from '../../Services/Students/PutStudents'; // Para actualizar los datos del estudiante
import GetProvinces from '../../Services/Addresses/GetProvinces'; // Obtener provincias
import GetCantons from '../../Services/Addresses/GetCantons'; // Obtener cantones
import GetDistricts from '../../Services/Addresses/GetDistricts'; // Obtener distritos
import GetNeighborhoods from '../../Services/Addresses/GetNeighborhoods'; // Obtener barrios

// ESTILOS CSS
import '../../Styles/Students/StudentProfile.css';

// IMPORTS DE LIBRERIA MUI
import { TextField, Button, Modal, Box, Typography } from '@mui/material';

// IMPORT DE SWEET ALERT
import Swal from 'sweetalert2';

// IMPORT DE IMÁGENES
import error from '../../Img/computer.png';

function StudentProfile() {
  // Obtenemos el usuario actual y la función para actualizar los datos
  const { user, setUserData } = useUser();
  console.log(user); // Imprime los datos del estudiante para depuración

  // Estado para manejar la visibilidad del modal y los datos del formulario
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    student_name: user?.student_name || '', // Nombre del estudiante
    student_first_last_name: user?.student_first_last_name || '', // Primer apellido
    student_second_last_name: user?.student_second_last_name || '', // Segundo apellido
    student_email: user?.student_email || '', // Correo electrónico
    student_phone_number: user?.student_phone_number || '', // Teléfono
    address: user?.address || '', // Dirección
    student_birth_date: user?.student_birth_date || '' // Fecha de nacimiento
  });

  // Estado para gestionar la nueva contraseña
  const [newPassword, setNewPassword] = useState('');
  const [passwordEnabled, setPasswordEnabled] = useState(false); // Si el campo de contraseña está habilitado
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false); // Indica si la contraseña ha sido actualizada

  // Estados para las direcciones
  const [provinces, setProvinces] = useState([]);
  const [cantons, setCantons] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [fullAddress, setFullAddress] = useState(''); // Dirección completa del estudiante

  const { setAuthData } = useAuth(); // Usamos el contexto de autenticación


  useEffect(() => {
    const fetchData = async () => {
      const provincesData = await GetProvinces(); 
      setProvinces(provincesData);
      const cantonsData = await GetCantons();
      setCantons(cantonsData);      
      const districtsData = await GetDistricts(); 
      setDistricts(districtsData);      
      const neighborhoodsData = await GetNeighborhoods();
      setNeighborhoods(neighborhoodsData);
    };
    fetchData(); 
  }, []); 

  // Efecto para calcular la dirección completa y actualizarla cuando los datos del usuario cambian
  useEffect(() => {
    if (user?.neighborhood_fk) {
      // Encontramos los datos relacionados con la dirección usando los IDs
      const neighborhood = neighborhoods.find(n => n.id === user.neighborhood_fk);
      const district = districts.find(d => d.id === neighborhood?.district_fk);
      const canton = cantons.find(c => c.id === district?.canton_fk);
      const province = provinces.find(p => p.id === canton?.province_fk);

      // Si todos los datos de dirección están disponibles, los formateamos en una cadena
      if (neighborhood && district && canton && province) {
        setFullAddress(`${neighborhood.neighborhood_name}, ${district.district_name}, ${canton.canton_name}, ${province.province_name}`);
      }
    }
  }, [user, provinces, cantons, districts, neighborhoods]);

  // Función para calcular la edad a partir de la fecha de nacimiento
  const calculateAge = (birthDate) => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const month = today.getMonth() - birthDateObj.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDateObj.getDate())) {
      age--; // Si el cumpleaños aún no ha pasado en este año, restamos uno
    }
    return age; // Devuelve la edad calculada
  };

  // Función para abrir el modal
  const handleOpen = () => setOpen(true);

  // Función para cerrar el modal
  const handleClose = () => setOpen(false);

  // Actualiza el estado del formulario cuando un campo cambia
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario y actualizar los datos del estudiante
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Preparamos los datos que vamos a enviar, asegurándonos de incluir el ID y otros datos constantes
    const updatedFormData = {
      ...formData,
      id: user.id,
      student_auth_user_fk: user.student_auth_user_fk,
      student_id_url: user.student_id_url // Mantener la URL de la imagen del ID
    };

    // Verificamos si el correo electrónico ha cambiado para hacer la actualización
    const emailChanged = formData.student_email !== user.student_email;

    try {
      // Si el correo electrónico ha cambiado, primero lo actualizamos
      if (emailChanged) {
        console.log("email cambió");
        await PatchStudentEmail(user.student_auth_user_fk, formData.student_email); // Ejecuta PatchStudentEmail
      }

      // Luego actualizamos los demás datos del estudiante
      await PutStudent(user.id, updatedFormData); // Ejecuta PutStudent
      setUserData(updatedFormData); // Actualiza los datos en el contexto
      Swal.fire('Éxito', 'Datos actualizados correctamente', 'success'); // Muestra una alerta de éxito
      handleClose(); // Cierra el modal
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar los datos', 'error'); // Si ocurre un error, muestra una alerta
    }
  };

  // Función para manejar el cambio de la contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto

    if (!newPassword) {
      Swal.fire('Error', 'Por favor ingrese una nueva contraseña', 'error'); // Verifica si se ingresó la contraseña
      return;
    }

    try {
      // Llamada al servicio para actualizar la contraseña
      await PatchStudentPass(user.student_auth_user_fk, newPassword);
      setIsPasswordUpdated(true); // Marca la contraseña como actualizada
      Swal.fire('Éxito', 'Contraseña actualizada correctamente', 'success'); // Alerta de éxito
    } catch (error) {
      Swal.fire('Error', 'No se pudo actualizar la contraseña', 'error'); // En caso de error, muestra una alerta
    }
  };

  // Función para manejar el cambio del valor de la nueva contraseña
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value); // Actualiza el estado con el nuevo valor de la contraseña
  };

  return (
    <div className="student-profile-container">
      <div className='student-profile-container-flex'>
        <div>
        <h1 className="student-profile-title">Perfil del Estudiante</h1>
        <div className='student-profile-data-container'>
          {user ? ( // Si existe un usuario
            <div>
              <p className="student-profile-item"><strong>Nombre:</strong> {user.student_name} {user.student_first_last_name} {user.student_second_last_name}</p>
              <p className="student-profile-item"><strong>Email:</strong> {user.student_email}</p>
              <p className="student-profile-item"><strong>Teléfono:</strong> {user.student_phone_number}</p>
              <p className="student-profile-item"><strong>Dirección:</strong> {fullAddress}</p> {/* Mostrar la dirección completa */}
              {user.student_birth_date && ( // Si hay fecha de nacimiento
                <p className="student-profile-item">
                  <strong>Fecha de Nacimiento:</strong> {user.student_birth_date} 
                  <br />
                  <strong>Edad:</strong> {calculateAge(user.student_birth_date)} {/* Mostrar la edad */}
                </p>
              )}

              {/* Mostrar la imagen del ID si está disponible */}
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

              <button variant="contained" className="student-profile-edit-button" onClick={handleOpen}> {/* Botón para abrir el modal */}
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

          {/* Modal y Formulario de edición de datos del estudiante */}
          <Modal open={open} onClose={handleClose}>
  <Box className="student-profile-modal-content">
    <h2 className="student-profile-modal-title">Editar Datos del Estudiante</h2>
    <form onSubmit={handleSubmit} className="student-profile-form">
      {/* Campos del formulario */}
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
      <div className="student-profile-form-field">
        <TextField
          label="Fecha de Nacimiento"
          name="student_birth_date"
          type="date"
          value={formData.student_birth_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
      </div>

      {/* Botón para guardar los cambios */}
      <button type="submit" className="student-profile-save-button" fullWidth>
        Guardar Cambios
      </button>
    </form>
  </Box>
</Modal>
        </div>

        </div>

        <div>

        {/* Campo para cambiar la contraseña y el botón fuera del modal */}
        <div className="student-profile-password-container">
          <h3 className='title-change-password'>Cambia tu contraseña</h3>

          {/* Botón para habilitar el campo de nueva contraseña */}
          {!passwordEnabled ? (
            <button
              variant="outlined"
              className="student-profile-enable-password-button"
              onClick={() => setPasswordEnabled(true)} // Habilita el campo de nueva contraseña
              fullWidth
            >
              Cambiar Contraseña
            </button>
          ) : (
            <>
              {/* Input para ingresar la nueva contraseña */}
              <div className="student-profile-form-field">
                <TextField
                  label="Nueva Contraseña"
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange} // Actualiza el valor de la nueva contraseña
                  fullWidth
                  margin="normal"
                  required
                />
              </div>

              {/* Botón para guardar la nueva contraseña */}
              <button
                variant="outlined"
                className="student-profile-save-password-button"
                onClick={handlePasswordSubmit} // Llama a la función para actualizar la contraseña
                fullWidth
              >
                Guardar Contraseña
              </button>
            </>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;