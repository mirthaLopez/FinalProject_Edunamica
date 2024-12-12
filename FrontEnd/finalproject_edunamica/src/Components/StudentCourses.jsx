import React, { useState, useEffect } from 'react';

import GetStudentCourses from '../Services/Students/GetStudentCourses';
import GetStudent from '../Services/Students/GetStudents';
import GetCourses from '../Services/Courses/GetCourses';
import GetModalities from '../Services/Modality/GetModalities';
import { useUser } from '../Components/Administration/AdminContext';

//ESTILOS CSS
import '../Styles/StudentCourses.css';

function StudentCourses() {
  const { user } = useUser();  // Obtener el usuario logueado
  const [studentCourses, setStudentCourses] = useState([]); 
  const [student, setStudent] = useState([]); 
  const [courses, setCourses] = useState([]); 
  const [modalities, setModalities] = useState([]);  // Aquí almacenamos las modalidades de pago
  const [enrolledCourses, setEnrolledCourses] = useState([]);  // Cursos en los que está matriculado el estudiante

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

  // Filtrar y mapear los cursos matriculados por el estudiante
  useEffect(() => {
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
  }, [student, courses, studentCourses, user.id]);  // Esta dependencia se ejecuta cuando los datos cambian


  return (
    <div className="student-courses-container">
      <h1 className="student-courses-title">Cursos Matriculados</h1>
      {enrolledCourses.length > 0 ? (
        <table className="courses-table">
          <thead>
            <tr>
              <th className="detail-name">Curso</th>
              <th className="detail-name">Descripción</th>
              <th className="detail-name">Duración</th>
              <th className="detail-name">Fecha de inicio</th>
              <th className="detail-name">Fecha de fin</th>
              <th className="detail-name">Precio</th>
              <th className="detail-name">Horario</th>
              <th className="detail-name">Requisitos</th>
             
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map(course => (
              <tr key={course.id}>
                <td className="detail-value">{course.course_name}</td>
                <td className="detail-value">{course.course_description}</td>
                <td className="detail-value">{course.course_duration}</td>
                <td className="detail-value">{course.begins}</td>
                <td className="detail-value">{course.ends}</td>
                <td className="detail-value">{course.course_price}</td>
                <td className="detail-value">{course.course_schedule}</td>
                <td className="detail-value">{course.obligatory_requirements}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-courses-message">No estás matriculado en ningún curso</p>
      )}
    </div>
  );
}

export default StudentCourses;