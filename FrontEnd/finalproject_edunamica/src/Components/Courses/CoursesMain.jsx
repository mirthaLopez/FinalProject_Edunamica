import React, { useState, useEffect } from 'react';

// SERVICIOS
import GetCourses from '../../Services/Courses/GetCourses'; // Servicio para obtener los cursos
import GetEnrollment from '../../Services/Enrollment/GetEnrollment'; // Servicio para obtener las matrículas

// ESTILOS CSS
import "../../Styles/Courses/CoursesMain.css"; 

// IMPORTS DE LIBRERIA MUI
import SearchIcon from '@mui/icons-material/Search'; // Icono de búsqueda de Material UI

function CoursesMain() {
  // Estados para almacenar los cursos, las matrículas y la consulta de búsqueda
  const [courses, setCourses] = useState([]);
  const [enrollment, setEnrollment] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await GetCourses(); 
      setCourses(coursesData); 
      const enrollmentData = await GetEnrollment(); 
      setEnrollment(enrollmentData); 
    };
    fetchData(); 
  }, []);

  // Filtrar los cursos activos con matrícula vigente
  const currentDate = new Date(); 
  currentDate.setHours(0, 0, 0, 0); // Establece la fecha actual a las 00:00:00 para comparaciones

  // Filtra los cursos activos que tienen una matrícula vigente en la fecha actual
  const activeCourses = courses.filter(course =>
    enrollment.some(e => {
      const enrollmentStartDate = new Date(e.enrollment_start_date); // Fecha de inicio de la matrícula
      const enrollmentEndDate = new Date(e.enrollment_end_date); // Fecha de fin de la matrícula
      enrollmentStartDate.setHours(0, 0, 0, 0); // Normaliza la hora de inicio de la matrícula
      enrollmentEndDate.setHours(0, 0, 0, 0); // Normaliza la hora de fin de la matrícula
      return e.course_fk === course.id && // Compara si la matrícula corresponde al curso
        enrollmentStartDate <= currentDate && // Verifica que la matrícula haya comenzado
        enrollmentEndDate >= currentDate; // Verifica que la matrícula no haya finalizado
    })
  );

  // Filtrar los cursos según la búsqueda (por nombre)
  const filteredCourses = activeCourses.filter(course =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) // Filtra los cursos que contienen la consulta de búsqueda
  );

  // Función para formatear el precio en colones costarricenses
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC', // Formatea el precio en la moneda costarricense (CRC)
    }).format(price);
  };

  return (
    <div style={{ marginTop: '140px' }}>

      <div className="header-container">
        <input 
          type="search" 
          placeholder="Buscar..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <SearchIcon className="search-icon" /> {/* Icono de búsqueda */}
      </div>

      {/* Contenedor de las cards de los cursos */}
      <div className="courses-list">
        {filteredCourses.map(course => ( 
          <div className="course-card-item" key={course.id}>
            <img src={course.course_image_url} alt={course.course_name} className="course-image" /> 
            <div className="course-details">
              <h3 className="course-name">{course.course_name}</h3>
              <p className="course-description-text">{course.course_description}</p>
              <div className="course-meta-info">
                <span className="course-price-tag">
                  Precio: {formatPrice(course.course_price)} {/* Precio formateado */}
                </span>
                <span className="course-schedule-time">Horario: {course.course_schedule}</span> 
                <span className="course-duration-time">Duración: {course.course_duration}</span> 
                <span className="course-date-range">Inicio: {course.begins} - Fin: {course.ends}</span>
              </div>
            </div>

            {/* Botón de matrícula */}
            <div className="enroll-button-container">
              <button className="enroll-button">Matrícula</button> {/* Botón para matricularse */}
            </div>
          </div>
        ))}
      </div>
      <br /> 
    </div>
  );
}

export default CoursesMain;