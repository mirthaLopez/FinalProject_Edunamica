import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button} from '@mui/material';
import GetCourses from '../Services/Courses/GetCourses';
import GetModalities from '../Services/Modality/GetModalities';
import PostEnrollment from '../Services/Enrollment/PostEnrollment';

function EnrollmentForm() {

  const [enrollment_start_date, setBegins] = useState('');
  const [enrollment_end_date, setEnds] = useState('');
  const [available_spots, setSpots] = useState('');
  const [courses, setCourses] = useState('');
  const [modalities, setModalities] = useState('');

  const [courses_list, setCourses_List] = useState([]);
  const [modalities_list, setModalities_List] = useState([]);


  const handleChangeCourse = (e) => setCourses(e.target.value);
  const handleChangeModality = (e) => setModalities(e.target.value);

  // get de los CURSOS
  useEffect(() => {
    const fetchCourse = async () => {
        const data_course = await GetCourses(); 
        setCourses_List(data_course); 
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
    console.log("Botón agregar matrícula");
    
    e.preventDefault();

    const course_fk=courses;
    const course_modality_fk=modalities;

    const data = await PostEnrollment(enrollment_start_date, enrollment_end_date, available_spots, course_fk, course_modality_fk); 
      // se envian los datos de la matrícula
    console.log("Soy la respuesta del server:", data);
    
      if (!data) {
      console.log("No se obtuvieron datos"); 
      }
    
  };




  return (
    <div>
        <h1>Matricula</h1>

     {/* Seleccionar curso */}
     <div>
        <label>Selecciona el curso:</label>
        <select value={courses} onChange={handleChangeCourse} required>
            <option value="">Selecciona un curso</option>
              {courses_list.map((course) => (
                <option key={course.id} value={course.id}>
                    {course.course_name}
            </option>
          ))}
        </select>
      </div>

    <br />
    <br />

     {/* Seleccionar modalidad */}
     <div>
        <label>Selecciona modalidad:</label>
        <select value={modalities} onChange={handleChangeModality} required>
            <option value="">Selecciona la modalidad</option>
              {modalities_list.map((modality) => (
                <option key={modality.id} value={modality.id}>
                    {modality.modality_name}
            </option>
          ))}
        </select>
      </div>

    <br />
    <br />
    <label>Inicio de la matrícula:</label>
     <TextField 
      value={enrollment_start_date} 
      onChange={(e) => setBegins(e.target.value)}
      type="date" 
      defaultValue="19-11-2024" 
      variant="outlined" />

    <br />
    <br />

    <label>Fin de la matrícula:</label>
    <TextField 
      value={enrollment_end_date} 
      onChange={(e) => setEnds(e.target.value)}
      type="date" 
      variant="outlined" />

    <br />
    <br />

    <TextField 
      value={available_spots} 
      onChange={(e) => setSpots(e.target.value)}
      label="Número de cupos" 
      type="number" 
      variant="outlined" />

  <Button onClick={AddEnrollment} type="submit" variant="contained" color="success">Registrar Matrícula</Button>

 
    </div>
  )
}

export default EnrollmentForm