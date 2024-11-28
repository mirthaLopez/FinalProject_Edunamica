import '../Styles/EnrollmentForm.css'
import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
    console.log('Botón agregar matrícula');
    e.preventDefault();

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

    if (!data) {
      console.log('No se obtuvieron datos');
    }
  };

  return (
    <div style={{position: 'absolute', zIndex: 1, top: 0, left: 0}} className="main-div-enrrollment">
      <Typography variant="h4" gutterBottom>
        Matrícula
      </Typography>

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
            <Button
              onClick={AddEnrollment}
              type="submit"
              variant="contained"
              color="success"
              className="small-button" // Añade una clase para el botón
            >
              Registrar Matrícula
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EnrollmentForm;



