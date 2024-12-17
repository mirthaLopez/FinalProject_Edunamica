import React, { useState, useEffect } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext'; 
import { useUser } from '../../Components/Administration/AdminContext';

// SERVICIOS
import GetStudentCourses from '../../Services/Students/GetStudentCourses';
import GetStudent from '../../Services/Students/GetStudents';
import GetCourses from '../../Services/Courses/GetCourses';
import GetModalities from '../../Services/Modality/GetModalities';

// ESTILOS CSS
import '../../Styles/Students/StudentCourses.css';

function StudentCourses() {
  // Obtiene el usuario logueado desde el contexto
  const { user } = useUser();  
  // Estados para almacenar la información
  const [studentCourses, setStudentCourses] = useState([]); 
  const [student, setStudent] = useState([]); 
  const [courses, setCourses] = useState([]); 
  const [modalities, setModalities] = useState([]);  // Aquí almacenamos las modalidades de pago
  const [enrolledCourses, setEnrolledCourses] = useState([]);  // Cursos en los que está matriculado el estudiante

  // useEffect para obtener los datos necesarios al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const StudentCourseData = await GetStudentCourses();
        setStudentCourses(StudentCourseData); 

        const StudentData = await GetStudent();
        setStudent(StudentData); 

        const CourseData = await GetCourses();
        setCourses(CourseData); 

        const ModalityData = await GetModalities();
        setModalities(ModalityData); 

      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    };
    fetchData();
  }, []);  

  // useEffect para filtrar los cursos en los que el estudiante está matriculado
  useEffect(() => {
    // Solo ejecutamos este código si tenemos los datos completos
    if (student && courses.length > 0 && studentCourses.length > 0) {
      // Filtrar los cursos en los que el estudiante está matriculado
      const enrolledCourseIds = studentCourses
        .filter(studentCourse => studentCourse.student_fk === user.id) // Filtrar los cursos que corresponden al estudiante logueado
        .map(studentCourse => studentCourse.course_fk); // Obtener los course_fk relacionados

      // Obtener los detalles de los cursos que coinciden con los course_fk
      const enrolledCourseDetails = courses.filter(course => 
        enrolledCourseIds.includes(course.id)
      ); 
      
      // Establecer los cursos en los que el estudiante está matriculado
      setEnrolledCourses(enrolledCourseDetails);
    }
  }, [student, courses, studentCourses, user.id]);  // Dependencias: se ejecuta cuando los datos cambian

  return (
    <div className="student-courses-container">
      <h1 className="student-courses-title">Cursos Matriculados</h1>
      {enrolledCourses.length > 0 ? (
        <table className="courses-table">
          <thead>
            <tr>
              {/* Encabezados de la tabla con los detalles del curso */}
              <th className="detail-name">Curso</th>
              <th className="detail-name">Descripción</th>
              <th className="detail-name">Duración</th>
              <th className="detail-name">Inicia</th>
              <th className="detail-name">Finaliza</th>
              <th className="detail-name">Precio</th>
              <th className="detail-name">Horario</th>
              <th className="detail-name">Requisitos</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapear y mostrar cada curso matriculado */}
            {enrolledCourses.map(course => (
              <tr key={course.id}>
                <td data-label="Curso" className="detail-value">{course.course_name}</td>
                <td data-label="Descripción" className="detail-value">{course.course_description}</td>
                <td data-label="Duración" className="detail-value">{course.course_duration}</td>
                <td data-label="Fecha de inicio" className="detail-value">{course.begins}</td>
                <td data-label="Fecha de fin" className="detail-value">{course.ends}</td>
                <td data-label="Precio" className="detail-value">{course.course_price}</td>
                <td data-label="Horario" className="detail-value">{course.course_schedule}</td>
                <td data-label="Requisitos" className="detail-value">{course.obligatory_requirements}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Mensaje si no hay cursos matriculados
        <p className="no-courses-message">No estás matriculado en ningún curso</p>
      )}
    </div>
  );
}

export default StudentCourses;