import React, { useState, useEffect } from 'react';
import GetCourses from '../Services/Courses/GetCourses'
import SearchIcon from '@mui/icons-material/Search';
import '../Styles/CoursesShow.css';

function CoursesShow() {

    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

    useEffect(() => {
        const fetchData = async () => {
          const coursesData = await GetCourses();
          setCourses(coursesData);
        };
        fetchData();
      }, []);
    
      // Filtrar los cursos según la búsqueda (por nombre)
      const filteredCourses = courses.filter(course =>
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
        <div >
          {/* Título llamativo */}
          <div className="show-course-search">
            <input 
              type="search" 
              placeholder="Buscar..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de búsqueda
            />
            <SearchIcon className="show-course-search-icon" />
          </div>
      
          {/* Contenedor de las cards */}
          <div className="show-course-list">
            {filteredCourses.map(course => (
              <div className="show-course-card" key={course.id}>
                <img src={course.course_image_url} alt={course.course_name} className="show-course-image" />
                <div className="show-course-info">
                  <h3 className="show-course-title">{course.course_name}</h3>
                  <p className="show-course-description">{course.course_description}</p>
                  <div className="show-course-meta">
                    <span className="show-course-price">
                      Precio: {formatPrice(course.course_price)}
                    </span>
                    <span className="show-course-schedule">Horario: {course.course_schedule}</span>
                    <span className="show-course-duration">Duración: {course.course_duration}</span>
                    <span className="show-course-dates">Inicio: {course.begins} - Fin: {course.ends}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
      }
      
      export default CoursesShow;