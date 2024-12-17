import React, { useState, useEffect } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext'; 

// SERVICIOS
import GetRegisterForm from '../../Services/ApplicationForm/GetRegisterForm'; // Obtener datos de las solicitudes
import GetPayments from '../../Services/Payments/GetPayments'; // Obtener los datos de los pagos
import PostAuthStudentUser from '../../Services/Users/PostStudentUser'; // Crear usuario de autenticación para el estudiante
import PostStudent from '../../Services/Students/PostStudents'; // Crear un nuevo estudiante en la base de datos
import patchStatusApplication from '../../Services/RegisterForm/PatchStudentStatus'; // Actualizar el estado de la solicitud
import GetCourses from '../../Services/Courses/GetCourses'; // Obtener los cursos disponibles
import PostStudentCourses from '../../Services/RegisterForm/PostStudentCourses'; // Asociar estudiante a un curso
import PostStudentPayment from '../../Services/Students/PostStudentPayment'; // Asociar estudiante a un pago
import GetStudents from '../../Services/Students/GetStudents'; // Obtener la lista de estudiantes

// ESTILOS CSS
import '../../Styles/ApplicationsForm/Applications.css';

// IMPORTS DE LIBRERIA MUI (Material UI)
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'; // Componentes de Material UI
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Icono para expandir en los acordeones
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono de cuenta de usuario
import LogoutIcon from '@mui/icons-material/Logout'; // Icono de cerrar sesión

// IMPORT DE LIBRERIA EMAIL JS
import emailjs from '@emailjs/browser'; // Librería para enviar correos electrónicos

// IMPORT DE IMÁGENES
import logo_edunamica from "../../Img/edunamica_logo.svg"; // Logo de la empresa

// IMPORT DE LIBRERIA NOTYF (Notificaciones)
import { Notyf } from 'notyf'; // Librería para notificaciones de éxito y error
import 'notyf/notyf.min.css'; // Estilo para las notificaciones

function Applications() {
  // Definición de los estados locales
  const [applications, setApplications] = useState([]); // Estado para las solicitudes
  const [expanded, setExpanded] = useState(false); // Estado para manejar el acordeón expandido
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal de visualización de imágenes
  const [selectedImage, setSelectedImage] = useState(''); // Estado para almacenar la URL de la imagen seleccionada
  const [paymentsData, setPayments] = useState([]); // Estado para almacenar los pagos
  const [courses, setCourses] = useState([]); // Estado para almacenar los cursos
  const [students, setStudents] = useState([]); // Estado para almacenar los estudiantes
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const { setAuthData } = useAuth(); // Usamos el contexto de autenticación
  
  const [notyf] = useState(new Notyf({ duration: 2000, position: { x: 'center', y: 'center' } })); // Instancia de la librería Notyf para notificaciones

  useEffect(() => {
    const fetchData = async () => {
      // Fetch de las solicitudes, pagos, cursos y estudiantes al montar el componente
      const applicationsData = await GetRegisterForm();
      setApplications(applicationsData);
      const paymentsData = await GetPayments();
      setPayments(paymentsData);
      const coursesData = await GetCourses();
      setCourses(coursesData);
      const studentData = await GetStudents();
      setStudents(studentData);
    };
    fetchData();
  }, []); // Este useEffect se ejecuta solo una vez cuando el componente se monta

  // Función para manejar el cambio de expansión en los acordeones
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Expande o contrae el acordeón
  };

  // Filtrar las solicitudes según el término de búsqueda y el estado (student_status_fk === 1)
  const filteredApplications = applications.filter((data) => {
    // Buscar el nombre del curso correspondiente a la solicitud
    const course1 = courses.find(course => course.id == data.course_fk);
    const courseName = course1 ? course1.course_name : ''; // Si el curso existe, se obtiene su nombre

    // Filtra por estado de la solicitud y por el término de búsqueda (ya sea en el nombre o en el curso)
    return (
      data.student_status_fk === 1 &&  // Solo mostrar solicitudes con student_status_fk igual a 1
      (data.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      courseName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Función para manejar el click en las imágenes de identificación o recibos
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Almacena la URL de la imagen seleccionada
    setOpenModal(true); // Abre el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false); // Cierra el modal
    setSelectedImage(''); // Limpia la URL de la imagen
  };

  // Función para aceptar una solicitud
  const handleAccept = async (applicationId) => {
    try {
      const student_status_fk = 2; // Estado de la solicitud aceptada

      // Actualizar el estado de la solicitud
      const updateStatus = await patchStatusApplication(applicationId, student_status_fk);
      if (!updateStatus) {
        console.error('Failed to update the application status');
        notyf.error('No se pudo actualizar el estado de la solicitud');
        return;
      }

      // Buscar la solicitud correspondiente
      const application = applications.find(value => value.id === applicationId);
      if (!application) {
        console.error('Application not found');
        return;
      }

      // Verificar si el estudiante ya existe en la base de datos
      const existingStudent = students.find(student => student.email === application.email);
      if (existingStudent) {
        // Si el estudiante ya está registrado, asociarlo al curso y al pago
        const studentCourse = await PostStudentCourses(application.course_fk, existingStudent.id);
        if (!studentCourse) {
          console.error('Failed to assign student to course');
          notyf.error('No se pudo asignar el estudiante al curso');
          return;
        }

        const studentPayment = await PostStudentPayment(existingStudent.id, application.payment_fk);
        if (!studentPayment) {
          console.error('Failed to assign student to payment');
          notyf.error('No se pudo asignar el estudiante al pago');
          return;
        }

        notyf.success('Solicitud aceptada - El estudiante ya está registrado');
        return;
      }

      // Si el estudiante no está registrado, crearlo
      const generateRandomPassword = () => Math.floor(10000000 + Math.random() * 90000000).toString();
      const password = generateRandomPassword();
      const username = application.email;
      const email = application.email;

      // Crear el usuario de autenticación
      const auth_user = await PostAuthStudentUser(username, email, password);
      if (!auth_user) {
        console.error('Failed to create auth user');
        notyf.error('No se pudo crear el usuario de autenticación');
        return;
      }

      const authUserId = auth_user.id;
      const student_auth_user_fk = authUserId;

      // Crear el estudiante
      const newStudent = await PostStudent(
        application.name,
        application.first_last_name,
        application.second_last_name,
        application.birth_date,
        application.phone_number,
        application.email,
        application.identification_image_url,
        application.identification_number,
        application.address,
        student_auth_user_fk,
        application.identification_fk,
        application.genre_fk,
        application.neighborhood_fk
      );

      if (!newStudent) {
        console.error('Failed to create student');
        notyf.error('No se pudo crear el estudiante');
        return;
      }

      notyf.success('Solicitud aceptada - Estudiante creado de manera exitosa!');

      // Asociar el estudiante al curso y al pago
      const studentCourse = await PostStudentCourses(application.course_fk, newStudent.id);
      if (!studentCourse) {
        console.error('Failed to assign student to course');
        notyf.error('No se pudo asignar el estudiante al curso');
        return;
      }

      const studentPayment = await PostStudentPayment(newStudent.id, application.payment_fk);
      if (!studentPayment) {
        console.error('Failed to assign student to payment');
        notyf.error('No se pudo asignar el estudiante al pago');
        return;
      }

      // Enviar correo de verificación
      const templateParams = {
        user_name: application.name,
        to_email: application.email,
        verification_code: password
      };

      await emailjs.send('service_lgmm5so', 'template_wv3sdno', templateParams, 'xKYQea8wmj0LgY5FG')
        .then(
          (response) => {
            alert(`El código de verificación se ha enviado a ${email}`);
          },
          (error) => {
            console.error('Error al enviar el correo:', error.text);
            notyf.error('Error al enviar el correo de verificación');
          }
        );
    } catch (error) {
      console.error('Error al aceptar la solicitud pendiente', error);
      notyf.error('Error al aceptar la solicitud pendiente');
    }
  };

  // Función para rechazar una solicitud
  const handleReject = async (applicationId) => {
    try {
      await patchStatusApplication(applicationId, 3); // Cambia el estado de la solicitud a "rechazada"
      notyf.success('Solicitud denegada exitosamente!');
    } catch (error) {
      console.error('Error al denegar la solicitud pendiente');
      notyf.error(`Error al denegar la solicitud pendiente`);
    }
  };

  // Función para calcular la edad a partir de la fecha de nacimiento
  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate); // Creamos un objeto Date con la fecha de nacimiento proporcionada
    const today = new Date(); // Creamos un objeto Date con la fecha actual
    let age = today.getFullYear() - birth.getFullYear();  // Inicializamos la variable 'age' calculando la diferencia de años entre la fecha actual y la fecha de nacimiento
    const monthDiff = today.getMonth() - birth.getMonth();  // Calculamos la diferencia en meses entre la fecha actual y la fecha de nacimiento
    
     // Comprobamos si la fecha de nacimiento no ha llegado aún este año (es decir, si aún no se ha cumplido el cumpleaños)
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;  // Si el cumpleaños no ha pasado, restamos 1 al valor de la edad
    }
    return age;
  };

  return (
    <div className='main-div-applications'>
      <div className='divApplication'>
        <div className='container-title-applications'>
          <div className='applications-header'>
            <div style={{ textAlign: 'left' }}><h2 className='applications-title'>Solicitudes Pendientes de Aprobación</h2></div>
            {/* Campo de búsqueda */}
            <div style={{ textAlign: 'right' }} className='applications-search-container'>
              <input className='input-search-applications'
                type="search"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado de búsqueda
              />
            </div>
          </div>
        </div>

        {filteredApplications.map((data) => {
          const course1 = courses.find(course => course.id == data.course_fk);
          const payment = paymentsData.find(payment => payment.id === data.payment_fk);
          const age = calculateAge(data.birth_date);

          return (
            <Accordion key={data.id} expanded={expanded === data.id} onChange={handleChange(data.id)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${data.id}-content`}
                id={`panel-${data.id}-header`}
              >
                <h5 className='titles-accordion'>
                  {`${data.name} ${data.first_last_name} ${data.second_last_name}   ||  ${course1 ? course1.course_name : 'Curso no disponible'}`}
                </h5>
              </AccordionSummary>
              <AccordionDetails className="accordion-details">
                <div className="application-info">
                  <p className='attributes-p-tag'><strong>Número de Identificación:</strong> {data.identification_number}</p>
                  <p className='attributes-p-tag'><strong>Nombre:</strong> {data.name} {data.first_last_name} {data.second_last_name}</p>
                  <p className='attributes-p-tag'><strong>Dirección:</strong> {data.address}</p>
                  <p className='attributes-p-tag'><strong>Fecha de Nacimiento:</strong> {data.birth_date} ({age} años)</p>
                  <p className='attributes-p-tag'><strong>Correo:</strong> {data.email}</p>
                  <p className='attributes-p-tag'><strong>Teléfono:</strong> {data.phone_number}</p>

                  <p className='attributes-p-tag' style={{ marginTop: 2 }}><strong>Identificación:</strong></p>
                  <img
                    src={data.identification_image_url}
                    alt="Imagen de Identificación"
                    style={{ width: 100, height: 'auto', marginTop: 8, cursor: 'pointer' }}
                    onClick={() => handleImageClick(data.identification_image_url)}
                  />
                </div>

                {payment && (
                  <div className="payment-info">
                    <p className='attributes-p-tag' style={{ marginTop: 2 }}><strong>Pago Realizado:</strong></p>
                    <p className='attributes-p-tag'><strong>Monto:</strong> {payment.payment_amount}</p>
                    <p className='attributes-p-tag'><strong>Fecha de Pago:</strong> {payment.payment_date}</p>
                    <p className='attributes-p-tag'><strong>Recibo Número:</strong> {payment.payment_receipt_number}</p>

                    {/* Condición para mostrar la imagen solo si el método de pago es 1 o 2 */}
                    {payment.payment_method_fk === 1 || payment.payment_method_fk === 2 ? (
                      <>
                        <p className='attributes-p-tag' style={{ marginTop: 2 }}><strong>Recibo de Pago:</strong></p>
                        <img
                          src={payment.payment_receipt_url}
                          alt="Recibo de Pago"
                          style={{ width: 100, height: 'auto', marginTop: 8, cursor: 'pointer' }}
                          onClick={() => handleImageClick(payment.payment_receipt_url)}
                        />
                      </>
                    ) : null}
                  </div>
                )}
              </AccordionDetails>

              <AccordionActions>
                <button className="accept-button" onClick={() => handleAccept(data.id)}>Aceptar</button>
                <button className="reject-button" onClick={() => handleReject(data.id)}>Rechazar</button>
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
              style={{ width: '100%', maxHeight: 500, objectFit: 'contain' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Applications;
