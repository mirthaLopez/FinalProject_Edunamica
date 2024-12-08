import React, {useState, useEffect} from 'react';

//SERVICIOS
import GetCourses from '../../Services/Courses/GetCourses';
import GetEnrollment from '../../Services/Enrollment/GetEnrollment';

//ESTILOS CSS
import "../../Styles/Courses/CoursesMain.css";

//IMPORTS DE LIBRERIA MUI
import SearchIcon from '@mui/icons-material/Search';


function CoursesMain() {
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

  // Filtrar los cursos según la búsqueda (por nombre)
  const filteredCourses = activeCourses.filter(course =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para formatear el precio en colones costarricenses
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
    }).format(price);
  };

  return (
    <div style={{marginTop: '140px'}}>

      {/* Título llamativo */}
      <div className="header-container">
        <input 
          type="search" 
          placeholder="Buscar..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de búsqueda
        />
        <SearchIcon className="search-icon" />
      </div>

      {/* Contenedor de las cards */}
      <div className="courses-list">
        {filteredCourses.map(course => (
          <div className="course-card-item" key={course.id}>
            <img src={course.course_image_url} alt={course.course_name} className="course-image" />
            <div className="course-details">
              <h3 className="course-name">{course.course_name}</h3>
              <p className="course-description-text">{course.course_description}</p>
              <div className="course-meta-info">
                <span className="course-price-tag">
                  Precio: {formatPrice(course.course_price)}
                </span>
                <span className="course-schedule-time">Horario: {course.course_schedule}</span>
                <span className="course-duration-time">Duración: {course.course_duration}</span>
                <span className="course-date-range">Inicio: {course.begins} - Fin: {course.ends}</span>
              </div>
            </div>

            {/* Botón de matrícula */}
            <div className="enroll-button-container">
              <button className="enroll-button">Matrícula</button>
            </div>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}

export default CoursesMain;
