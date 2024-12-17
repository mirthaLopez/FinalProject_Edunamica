import React, {useState, useEffect} from 'react';

// SERVICIOS
import GetCourses from '../../Services/Courses/GetCourses'; // Importa la función que obtiene los cursos disponibles
import GetEnrollment from '../../Services/Enrollment/GetEnrollment'; // Importa la función que obtiene la información de matrícula

// ESTILOS CSS
import '../../Styles/Courses/CoursesCards.css' 

// IMPORT DE IMÁGENES
import arrow from '../../Img/right-arrow.png' 

// IMPORT DE LINK TO
import {Link} from 'react-router-dom';  

function CoursesCards() {
  // Definición de los estados para almacenar los cursos y la matrícula
  const [courses, setCourses] = useState([]);  // Almacena los datos de los cursos
  const [enrollment, setEnrollment] = useState([]);  // Almacena los datos de la matrícula

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
  const currentDate = new Date(); // Obtiene la fecha actual
  currentDate.setHours(0, 0, 0, 0); // Establece la hora en 00:00:00.000 para comparar solo fechas sin hora

  // Filtra los cursos que tienen matrícula vigente
  const activeCourses = courses.filter(course =>
    enrollment.some(e => {  // Revisa si la matrícula está activa para el curso
      const enrollmentStartDate = new Date(e.enrollment_start_date); // Fecha de inicio de matrícula
      const enrollmentEndDate = new Date(e.enrollment_end_date); // Fecha de fin de matrícula
      enrollmentStartDate.setHours(0, 0, 0, 0); // Establece la hora a medianoche para comparar solo la fecha
      enrollmentEndDate.setHours(0, 0, 0, 0); // Establece la hora a medianoche para comparar solo la fecha
      // Verifica que el curso tenga una matrícula activa en la fecha actual
      return e.course_fk === course.id &&
        enrollmentStartDate <= currentDate &&  // Verifica que la fecha de inicio sea antes o igual a la actual
        enrollmentEndDate >= currentDate; // Verifica que la fecha de fin sea después o igual a la actual
    })
  );

  // Función para formatear el precio del curso en colones costarricenses
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency', // Formatea el número como moneda
      currency: 'CRC',  // Usando la moneda de Costa Rica (colones)
    }).format(price); // Devuelve el precio formateado
  };

  return (
    <div className="courses-wrapper">
      <div className='title-container'>
        <img src={arrow} alt="" className="arrow-icon" /> {/* Icono de flecha */}
        <h2 className="courses-title">Cursos disponibles</h2> {/* Título de la sección */}
      </div>

      {/* Contenedor de las cards de cursos */}
      <div className="courses-container">
        {/* Itera sobre los cursos activos y muestra una tarjeta por cada uno */}
        {activeCourses.map(course => (
          <div className="course-card" key={course.id}> 
            <img src={course.course_image_url} alt={course.course_name} className="course-image" /> 
            <div className="course-info">
              <h3 className="course-title">{course.course_name}</h3> 
              <p className="course-description">{course.course_description}</p> 

             
              {course.obligatory_requirements && ( 
                <p className="course-obligatory-requirements">
                  Requisitos obligatorios: {course.obligatory_requirements}
                </p>
              )}

              {/* Metadatos del curso */}
              <div className="course-meta">
                <span className="course-price">
                  Precio del curso: {formatPrice(course.course_price)} 
                </span>
                <span className="course-schedule">Horario: {course.course_schedule}</span> 
                <span className="course-duration">Duración del curso: {course.course_duration}</span>
                <span className="course-dates">Inicio: {course.begins} - Fin: {course.ends}</span> 
              </div>
            </div>
            
            <div className="btn-container">
              <Link to={`/registro`} className="btn-matricula">Matrícula</Link> 
            </div>
          </div>
        ))}
      </div>

      <div className="btn-view-all-container">
        <Link to="/cursos" className="btn-view-all">Ver todos los cursos</Link>
      </div>
    </div>
  );
}

export default CoursesCards;