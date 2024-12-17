import React, { useState, useEffect } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext';

//SERVICIOS
import GetCourses from '../../Services/Courses/GetCourses';  // Servicio para obtener los cursos
import GetModalities from '../../Services/Modality/GetModalities';  // Servicio para obtener las modalidades
import PostEnrollment from '../../Services/Enrollment/PostEnrollment';  // Servicio para agregar una matrícula
import GetEnrollment from '../../Services/Enrollment/GetEnrollment';  // Servicio para obtener las matrículas

//ESTILOS CSS
import '../../Styles/Enrollment/EnrollmentForm.css'; 

//IMPORTS DE LIBRERIA MUI
import { TextField, FormControl, InputLabel, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';  
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';  // Icono para expandir el Accordion

//IMPORT DE LIBRERIA NOTYF
import { Notyf } from 'notyf';  
import 'notyf/notyf.min.css';  

function EnrollmentForm() {
  // Estados para gestionar los valores del formulario
  const [enrollment_start_date, setBegins] = useState('');  // Fecha de inicio de matrícula
  const [enrollment_end_date, setEnds] = useState('');  // Fecha de fin de matrícula
  const [available_spots, setSpots] = useState('');  // Número de cupos disponibles
  const [courses, setCourses] = useState('');  // Curso seleccionado
  const [modalities, setModalities] = useState('');  // Modalidad seleccionada

  // Estados para gestionar las listas de cursos y modalidades obtenidas del backend
  const [courses_list, setCourses_List] = useState([]);  // Lista de cursos disponibles
  const [modalities_list, setModalities_List] = useState([]);  // Lista de modalidades disponibles
  const [enrollment, setEnrollment] = useState([]);  // Matrículas previas

  // Estado para la notificación de éxito o error
  const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } }));

  // Contexto de autenticación
  const { setAuthData } = useAuth();  // Usamos el nuevo contexto de autenticación

  // Funciones para manejar los cambios en los campos del formulario
  const handleChangeCourse = (e) => setCourses(e.target.value);  // Cambia el valor del curso seleccionado
  const handleChangeModality = (e) => setModalities(e.target.value);  // Cambia el valor de la modalidad seleccionada

  // useEffect para obtener los cursos desde el backend
  useEffect(() => {
    const fetchCourse = async () => {
      const data_course = await GetCourses();  
      setCourses_List(data_course);  
      const enrollmentData = await GetEnrollment();  
      setEnrollment(enrollmentData);  
    };
    fetchCourse(); 
  }, []);  

  useEffect(() => {
    const fetchModality = async () => {
      const data_modality = await GetModalities(); 
      setModalities_List(data_modality); 
    };
    fetchModality();  
  }, []);  

  // Función para agregar una nueva matrícula
  const AddEnrollment = async (e) => {
    e.preventDefault();  // Prevenir la acción por defecto del formulario (que recargaría la página)
  
    try {
      const course_fk = courses;  // Obtener el ID del curso seleccionado
      const course_modality_fk = modalities;  // Obtener el ID de la modalidad seleccionada
  
      // Llamada al servicio para crear la matrícula
      const data = await PostEnrollment(
        enrollment_start_date,  // Fecha de inicio de matrícula
        enrollment_end_date,  // Fecha de fin de matrícula
        available_spots,  // Número de cupos disponibles
        course_fk,  // Curso
        course_modality_fk  // Modalidad
      );
      
      console.log('Soy la respuesta del server:', data);  // Mostrar la respuesta del servidor en consola
      notyf.success('Matrícula agregada de manera exitosa!');  // Mostrar notificación de éxito
  
      // Si no se obtuvo respuesta, mostrar un mensaje de error
      if (!data) {
        console.log('No se obtuvieron datos');
        notyf.error(`No se puede habilitar la matrícula, datos incompletos`);  // Notificación de error
      }

    } catch (error) {
      console.error('Ocurrió un error al agregar la matrícula:', error);  // Mostrar el error en consola
      notyf.error(`Error al habilitar la matrícula`);  // Notificación de error
    }
  };

  const today = new Date().toISOString().split('T')[0];  // Obtener la fecha actual en formato ISO

  // Función para formatear las fechas a un formato más legible
const formatDate = (dateString) => {
  // Se define un objeto con las opciones de formato para la fecha
  const options = { 
    year: 'numeric',    // El año será mostrado en formato numérico (4 dígitos)
    month: '2-digit',   // El mes será mostrado con 2 dígitos (ej. '01' para enero)
    day: '2-digit'      // El día será mostrado con 2 dígitos (ej. '09' para el noveno día)
  };

  // Se crea un objeto Date a partir de la cadena de fecha y se formatea con las opciones especificadas
  return new Date(dateString).toLocaleDateString('es-ES', options);  // Retorna la fecha formateada en formato español (día/mes/año)
};

  return (
    <div style={{position: 'absolute', zIndex: 1, top: 0, left: 0}} className="main-div-enrrollment">
      <div className='grid-enrollment'>
        <div className='main-div-form-enrollment'>
          <div className='title-enrollment-div'>
            <h1 className='title-enrollment-form'>
              Crear Matrícula
            </h1>
          </div>
          <form onSubmit={AddEnrollment}>  {/* Enviar formulario para agregar matrícula */}
            <div className="form-container">
              {/* Campo de selección de curso */}
              <div className="form-item">
                <FormControl fullWidth>
                  <InputLabel id="course-label">Selecciona el curso</InputLabel>
                  <Select
                    labelId="course-label"
                    value={courses}
                    onChange={handleChangeCourse}  
                    label="Selecciona el curso"
                    required
                  >
                    <MenuItem value="">Selecciona un curso</MenuItem>  
                    {courses_list.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.course_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Campo de selección de modalidad */}
              <div className="form-item">
                <FormControl fullWidth>
                  <InputLabel id="modality-label">Selecciona modalidad</InputLabel>
                  <Select
                    labelId="modality-label"
                    value={modalities}
                    onChange={handleChangeModality}  
                    label="Selecciona modalidad"
                    required
                  >
                    <MenuItem value="">Selecciona la modalidad</MenuItem>  
                    {modalities_list.map((modality) => (
                      <MenuItem key={modality.id} value={modality.id}>
                        {modality.modality_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              {/* Fecha de inicio */}
              <div className="form-item">
                <TextField
                  label="Inicio de la matrícula"
                  value={enrollment_start_date}
                  onChange={(e) => setBegins(e.target.value)} 
                  type="date"
                  fullWidth
                  variant="outlined"
                  required
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </div>

              {/* Fecha de fin */}
              <div className="form-item">
                <TextField
                  label="Fin de la matrícula"
                  value={enrollment_end_date}
                  onChange={(e) => setEnds(e.target.value)} 
                  type="date"
                  fullWidth
                  variant="outlined"
                  required
                  InputLabelProps={{
                    shrink: true, 
                  }}
                />
              </div>

              <div className="form-item">
                <TextField
                  label="Número de cupos"
                  value={available_spots}
                  onChange={(e) => setSpots(e.target.value)}  
                  type="number"
                  fullWidth
                  variant="outlined"
                  required
                />
              </div>

              <div className="button-container">
                <button
                  onClick={AddEnrollment}  
                  type="submit"
                  className='btn-send-enrollment' 
                >
                  Registrar Matrícula
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className='container-history-enrollment'>
          <h1 className='title-history-enrollment'>Historial de Matrículas</h1>
          {enrollment.map(enroll => {
            const course = courses_list.find(course => course.id === enroll.course_fk);  
            const isActive = today >= enroll.enrollment_start_date && today <= enroll.enrollment_end_date ? 'Matrícula Activa' : 'Matrícula Inactiva';  // Verificar si la matrícula está activa

            return (
              <Accordion key={enroll.course_fk}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />} 
                  aria-controls="panel-content"
                  id="panel-header"
                >
                  <div>{course.course_name} - {isActive}</div> 
                </AccordionSummary>
                <AccordionDetails>
                  <div>Fecha de inicio: {formatDate(enroll.enrollment_start_date)}</div> 
                  <div>Fecha de fin: {formatDate(enroll.enrollment_end_date)}</div> 
                  <div>Cupos disponibles: {enroll.available_spots}</div>  
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EnrollmentForm;
