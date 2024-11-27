import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GetRegisterForm from '../Services/ApplicationForm/GetRegisterForm';
import GetPayments from '../Services/Payments/GetPayments';
import '../Styles/Applications.css'; // Asegúrate de importar el archivo CSS
import PostAuthStudentUser from '../Services/Users/PostStudentUser';
import PostStudent from '../Services/Students/PostStudents';
import emailjs from '@emailjs/browser';
import patchStatusApplication from '../Services/RegisterForm/PatchStudentStatus';


function Applications() {
  const [applications, setApplications] = useState([]);
  const [expanded, setExpanded] = useState(false); // Estado para controlar el acordeón expandido
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedImage, setSelectedImage] = useState(''); // Estado para almacenar la imagen seleccionada
  const [paymentsData, setPayments] = useState([]);

  // Fetch applications and payments data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const applicationsData = await GetRegisterForm();
      setApplications(applicationsData);
      const paymentsData = await GetPayments();
      setPayments(paymentsData);
    };
    fetchData();
  }, []);

  console.log(applications);
  

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Cambia el estado cuando el acordeón se expanda o cierre
  };

  // Función para manejar el clic en la imagen y abrir el modal
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true); // Abre el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(''); // Limpia la imagen seleccionada
  };

  // Función para manejar el clic en los botones de aceptar
  const handleAccept = async (applicationId) => {
    console.log(applicationId);
    try {
      // Cambiar el estado de la solicitud a "aceptada"
      const student_status_fk = 2;
      await patchStatusApplication(applicationId, student_status_fk);
      console.log("Estado de la solicitud actualizado a Aceptado");

      // Encontrar la solicitud correspondiente por ID
      const application = applications.find(value => value.id === applicationId);
      if (!application) {
        console.error("No se encontró la application con el ID:", id);
        return;
      }

      // Función para generar una contraseña aleatoria
      const generateRandomPassword = () => Math.floor(10000000 + Math.random() * 90000000).toString();
      const username = application.email;
      const email = application.email;
      const password = generateRandomPassword();

      console.log('username:', username);
      console.log('email:', email);
      console.log('Contraseña generada:', password);

      const auth_user = await PostAuthStudentUser(username, email, password);

      if (auth_user) {
        console.log('Student Auth_User creado de manera exitosa:', auth_user);

        const authUserId = auth_user.id;
        const student_auth_user_fk = authUserId;

        // Crear administrador
        const NewStudent = await PostStudent(
          application.name,
        application.first_last_name,
        application.second_last_name,
        application.birth_date,
        application.phone_number,
        application.email,
        application.identification_image_url,
        application.address,
        student_auth_user_fk,
        application.neighborhood_fk,
        );

        if (NewStudent) {
          console.log('Administrador creado exitosamente');

          // Preparar los parámetros para enviar el correo
          const templateParams = {
            user_name: application.name, // Nombre del usuario
            to_email: application.email, // Correo del destinatario
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

  // Función para manejar el clic en los botones de rechazar
  const handleReject = async(applicationId) => {
    console.log('Solicitud rechazada con ID:', applicationId);
    // Lógica para manejar el rechazo
    await patchStatusApplication(applicationId, 3);
    console.log("Estado de la solicitud actualizado a Rechazado");
  };

  // Función para calcular la edad a partir de la fecha de nacimiento
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className='divApplication'>
      <Typography variant="h5"><strong>Solicitudes pendientes de aprobación:</strong></Typography>

      {applications.map((data) => {
        // Buscar el pago relacionado con esta solicitud
        const payment = paymentsData.find(payment => payment.id == data.payment_fk);
        const age = calculateAge(data.birth_date);

        return (
          <Accordion
            key={data.id}
            expanded={expanded === data.id} // Establece si el acordeón debe estar expandido
            onChange={handleChange(data.id)} // Maneja el cambio de expansión
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${data.id}-content`}
              id={`panel-${data.id}-header`}
            >
              <Typography variant="h6">{`${data.name} ${data.first_last_name} ${data.second_last_name}`}</Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion-details">
              <div className="application-info">
                <Typography variant="body1"><strong>Número de Identificación:</strong> {data.identification_number}</Typography>
                <Typography variant="body1">
                  <strong>Nombre:</strong> {data.name} {data.first_last_name} {data.second_last_name}
                </Typography>
                <Typography variant="body1"><strong>Dirección:</strong> {data.address}</Typography>
                <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {data.birth_date} ({age} años)</Typography>
                <Typography variant="body1"><strong>Correo:</strong> {data.email}</Typography>
                <Typography variant="body1"><strong>Teléfono:</strong> {data.phone_number}</Typography>

                {/* Mostrar la imagen pequeña de la identificación y añadir el manejador de clic */}
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  <strong>Identificación:</strong>
                </Typography>
                <img
                  src={data.identification_image_url}
                  alt="Imagen de Identificación"
                  style={{ width: 100, height: 'auto', marginTop: 8, cursor: 'pointer' }}
                  onClick={() => handleImageClick(data.identification_image_url)} // Maneja el clic en la imagen
                />
              </div>

              {/* Mostrar la información del pago si existe */}
              {payment && (
                <div className="payment-info">
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <strong>Pago Realizado:</strong>
                  </Typography>
                  <Typography variant="body1"><strong>Monto:</strong> {payment.payment_amount}</Typography>
                  <Typography variant="body1"><strong>Fecha de Pago:</strong> {payment.payment_date}</Typography>
                  <Typography variant="body1"><strong>Recibo Número:</strong> {payment.payment_receipt_number}</Typography>
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <strong>Recibo de Pago:</strong>
                  </Typography>
                  <img
                    src={payment.payment_receipt_url}
                    alt="Recibo de Pago"
                    style={{ width: 100, height: 'auto', marginTop: 8, cursor: 'pointer' }}
                    onClick={() => handleImageClick(payment.payment_receipt_url)} // Maneja el clic en la imagen
                  />
                </div>
              )}
            </AccordionDetails>
            <AccordionActions>
              <Button variant="contained" color="primary" onClick={() => handleAccept(data.id)}>Aceptar</Button>
              <Button variant="outlined" color="secondary" onClick={() => handleReject(data.id)}>Rechazar</Button>
            </AccordionActions>
          </Accordion>
        );
      })}

      {/* Modal para ver la imagen en detalle */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Imagen de Identificación o Recibo</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Imagen de Identificación o Recibo Detallada"
            style={{ width: '100%', maxHeight: 500, objectFit: 'contain' }} // Ajusta el tamaño de la imagen
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Applications;