import React, { useState, useEffect } from 'react';

//SERVICIOS
import GetCourses from '../../Services/Courses/GetCourses';
import GetModalities from '../../Services/Modality/GetModalities';
import PostEnrollment from '../../Services/Enrollment/PostEnrollment';
import GetEnrollment from '../../Services/Enrollment/GetEnrollment';

//ESTILOS CSS
import '../../Styles/Enrollment/EnrollmentForm.css';

//IMPORTS DE LIBRERIA MUI
import {TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//IMPORT DE LIBRERIA NOTYF
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';


function EnrollmentForm() {
  const [enrollment_start_date, setBegins] = useState('');
  const [enrollment_end_date, setEnds] = useState('');
  const [available_spots, setSpots] = useState('');
  const [courses, setCourses] = useState('');
  const [modalities, setModalities] = useState('');

  const [courses_list, setCourses_List] = useState([]);
  const [modalities_list, setModalities_List] = useState([]);
  const [enrollment, setEnrollment] = useState([]);

  const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } }));

  const handleChangeCourse = (e) => setCourses(e.target.value);
  const handleChangeModality = (e) => setModalities(e.target.value);

  // get de los CURSOS
  useEffect(() => {
    const fetchCourse = async () => {
      const data_course = await GetCourses();
      setCourses_List(data_course);
      const enrollmentData = await GetEnrollment();
      setEnrollment(enrollmentData);
    };
    fetchCourse();
  }, []);

  // get de las MODALIDADES
  useEffect(() => {
    const fetchModality = async () => {
      const data_modality = await GetModalities();
      setModalities_List(data_modality);
    };
    fetchModality();
  }, []);

  const AddEnrollment = async (e) => {
    e.preventDefault();
  
    try {
      const course_fk = courses;
      const course_modality_fk = modalities;
  
      const data = await PostEnrollment(
        enrollment_start_date,
        enrollment_end_date,
        available_spots,
        course_fk,
        course_modality_fk
      );
      
      console.log('Soy la respuesta del server:', data);
      notyf.success('Matrícula agregada de manera exitosa!');
  
      if (!data) {
        console.log('No se obtuvieron datos');
        notyf.error(`No se puede habilitar la matrícula, datos incompletos`);
      }

    } catch (error) {
      console.error('Ocurrió un error al agregar la matrícula:', error);
      notyf.error(`Error al habilitar la matrícula`);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
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
      <form onSubmit={AddEnrollment}>
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
                shrink: true, // Asegura que el label esté visible incluso cuando el campo esté vacío
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
                shrink: true, // Asegura que el label esté visible incluso cuando el campo esté vacío
              }}
            />
          </div>

          {/* Número de cupos */}
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

          {/* Contenedor para el botón centrado al final */}
          <div className="button-container">
            <button
              onClick={AddEnrollment}
              type="submit"
              className='btn-send-enrollment' // Añade una clase para el botón
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
          const isActive = today >= enroll.enrollment_start_date && today <= enroll.enrollment_end_date ? 'Matrícula Activa' : 'Matrícula Inactiva';

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



