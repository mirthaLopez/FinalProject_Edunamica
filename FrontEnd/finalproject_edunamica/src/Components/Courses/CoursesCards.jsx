import React, {useState, useEffect} from 'react';

//SERVICIOS
import GetCourses from '../../Services/Courses/GetCourses';
import GetEnrollment from '../../Services/Enrollment/GetEnrollment';

//ESTILOS CSS
import '../../Styles/Courses/CoursesCards.css'

//IMPORT DE IMÁGENES
import arrow from '../../Img/right-arrow.png'

//IMPORT DE LINK TO
import {Link} from 'react-router-dom';  


function CoursesCards() {
  const [courses, setCourses] = useState([]);
  const [enrollment, setEnrollment] = useState([]);

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
  currentDate.setHours(0, 0, 0, 0);

  const activeCourses = courses.filter(course =>
    enrollment.some(e => {
      const enrollmentStartDate = new Date(e.enrollment_start_date);
      const enrollmentEndDate = new Date(e.enrollment_end_date);
      enrollmentStartDate.setHours(0, 0, 0, 0);
      enrollmentEndDate.setHours(0, 0, 0, 0);
      return e.course_fk === course.id &&
        enrollmentStartDate <= currentDate &&
        enrollmentEndDate >= currentDate;
    })
  );

  // Función para formatear el precio en colones costarricenses
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
    }).format(price);
  };

  return (
    <div className="courses-wrapper">
      {/* Título llamativo */}
      <div className='title-container'>
        <img src={arrow} alt="" className="arrow-icon" />
        <h2 className="courses-title">Cursos disponibles</h2>
      </div>

      {/* Contenedor de las cards */}
      <div className="courses-container">
        {activeCourses.map(course => (
          <div className="course-card" key={course.id}>
            <img src={course.course_image_url} alt={course.course_name} className="course-image" />
            <div className="course-info">
              <h3 className="course-title">{course.course_name}</h3>
              <p className="course-description">{course.course_description}</p>

              {/* Aquí agregamos el campo obligatorio de requisitos */}
              {course.obligatory_requirements && (
                <p className="course-obligatory-requirements">
                  Requisitos obligatorios: {course.obligatory_requirements}
                </p>
              )}

              <div className="course-meta">
                <span className="course-price">
                  Precio del curso: {formatPrice(course.course_price)}
                </span>
                <span className="course-schedule">Horario: {course.course_schedule}</span>
                <span className="course-duration">Duración del curso: {course.course_duration}</span>
                <span className="course-dates">Inicio: {course.begins} - Fin: {course.ends}</span>
              </div>
            </div>
            {/* Botón de matrícula */}
            <div className="btn-container">
              <Link to={`/registro`} className="btn-matricula">Matrícula</Link> {/* Aquí agregas el enlace */}
            </div>
          </div>
        ))}
      </div>

      {/* Botón "Ver todos los cursos" al final */}
      <div className="btn-view-all-container">
        <Link to="/cursos" className="btn-view-all">Ver todos los cursos</Link> {/* Aquí también el enlace */}
      </div>
    </div>
  );
}

export default CoursesCards;



