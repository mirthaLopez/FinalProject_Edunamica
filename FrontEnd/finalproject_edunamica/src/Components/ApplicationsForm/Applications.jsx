import React, {useState, useEffect} from 'react';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

//SERVICIOS
import GetRegisterForm from '../../Services/ApplicationForm/GetRegisterForm';
import GetPayments from '../../Services/Payments/GetPayments';
import PostAuthStudentUser from '../../Services/Users/PostStudentUser';
import PostStudent from '../../Services/Students/PostStudents';
import patchStatusApplication from '../../Services/RegisterForm/PatchStudentStatus';
import GetCourses from '../../Services/Courses/GetCourses';
import PostStudentCourses from '../../Services/RegisterForm/PostStudentCourses';
import PostStudentPayment from '../../Services/Students/PostStudentPayment';
import GetStudents from '../../Services/Students/GetStudents'

//ESTILOS CSS
import '../../Styles/ApplicationsForm/Applications.css';

//IMPORTS DE LIBRERIA MUI
import {Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

//IMPORT DE LIBRERIA EMAIL JS
import emailjs from '@emailjs/browser';

//IMPORT DE IMÁGENES
import logo_edunamica from "../../Img/edunamica_logo.svg"

//IMPORT DE LIBRERIA NOTYF
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';


function Applications() {
  const [applications, setApplications] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [paymentsData, setPayments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
  
  const [notyf] = useState(new Notyf({ duration: 2000, position: { x: 'center', y: 'center' } }));

  useEffect(() => {
    const fetchData = async () => {
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
  }, []);

  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

// Filtrar las solicitudes según el término de búsqueda y el estado (student_status_fk === 1)
const filteredApplications = applications.filter((data) => {
  const course1 = courses.find(course => course.id == data.course_fk);
  const courseName = course1 ? course1.course_name : '';
  
  return (
    data.student_status_fk === 1 &&  // Solo mostrar solicitudes con student_status_fk igual a 1
    (data.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    courseName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
});

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage('');
  };


  

  const handleAccept = async (applicationId) => {
    try {
      const student_status_fk = 2;
      
      // Step 1: Update the status of the application
      const updateStatus = await patchStatusApplication(applicationId, student_status_fk);
      if (!updateStatus) {
        console.error('Failed to update the application status');
        notyf.error('No se pudo actualizar el estado de la solicitud');
        return;
      }
  
      // Step 2: Find the application
      const application = applications.find(value => value.id === applicationId);
      if (!application) {
        console.error('Application not found');
        return;
      }
  
      console.log('Application found:', application);
  
    // Step 3: Check if the email already exists in students
    const existingStudent = students.find(student => student.email === application.email);
    if (existingStudent) {
      // If student exists, just show the "Accepted" message
      console.log('Student already registered with email:', application.email);
      
      // Step 4: Link existing student to course and payment
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

      console.log('Student Course:', studentCourse);
      console.log('Student Payment:', studentPayment);

      notyf.success('Solicitud aceptada - El estudiante ya está registrado');
      return;
    }

  
      // Step 4: Generate random password
      const generateRandomPassword = () => Math.floor(10000000 + Math.random() * 90000000).toString();
      const password = generateRandomPassword();
      const username = application.email;
      const email = application.email;
  
      console.log('Username:', username);
      console.log('Email:', email);
      console.log('Generated password:', password);
  
      // Step 5: Create the auth user
      const auth_user = await PostAuthStudentUser(username, email, password);
      if (!auth_user) {
        console.error('Failed to create auth user');
        notyf.error('No se pudo crear el usuario de autenticación');
        return;
      }
  
      const authUserId = auth_user.id;
      const student_auth_user_fk = authUserId;
  
      // Step 6: Create the student
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
  
      // Success message for student creation
      notyf.success('Solicitud aceptada - Estudiante creado de manera exitosa!');
  
      // Step 7: Link student to course and payment
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
  
      console.log('Student Course:', studentCourse);
      console.log('Student Payment:', studentPayment);
  
      // Step 8: Send verification email
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
  
  

  const handleReject = async (applicationId) => {

    try {
      await patchStatusApplication(applicationId, 3);

      console.log('Solicitud denegada exitosamente!');
      notyf.success('Solicitud denegada exitosamente!');

    } catch (error) {
      console.error('Error al denegar la solicitud pendiente');
          notyf.error(`Error al denegar la solicitud pendiente`);
    }

  };

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
    <div className='main-div-applications'>

      <div className='divApplication'>
        <div className='container-title-applications'>
          <div className='applications-header'>
            <div style={{textAlign:'left'}}><h2 className='applications-title'>Solicitudes Pendientes de Aprobación</h2></div>
            {/* Campo de búsqueda */}
            <div style={{textAlign:'right'}} className='applications-search-container'>
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
                    <p className='attributes-p-tag' style={{ marginTop: 2 }}><strong>Recibo de Pago:</strong></p>
                    <img
                      src={payment.payment_receipt_url}
                      alt="Recibo de Pago"
                      style={{ width: 100, height: 'auto', marginTop: 8, cursor: 'pointer' }}
                      onClick={() => handleImageClick(payment.payment_receipt_url)}
                    />
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