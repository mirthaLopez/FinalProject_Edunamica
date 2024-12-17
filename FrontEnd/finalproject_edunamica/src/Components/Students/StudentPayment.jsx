import React, { useState, useEffect } from 'react';
import { useUser } from '../../Components/Administration/AdminContext';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

//SERVICIOS
import GetStudentCourses from '../../Services/Students/GetStudentCourses';
import GetStudentPayment from '../../Services/Students/GetStudentPayment';
import GetStudent from '../../Services/Students/GetStudents';
import GetCourses from '../../Services/Courses/GetCourses';
import GetPaymentMethods from '../../Services/Payments/GetPaymentMethods';
import GetPaymentModalities from '../../Services/Payments/GetPaymentModalities';
import GetPayments from '../../Services/Payments/GetPayments';

// ESTILOS CSS
import '../../Styles/Students/StudentPayment.css';

function StudentPayment() {
  const { user } = useUser();  // Obtener el usuario logueado
  const [studentCourses, setStudentCourses] = useState([]); 
  const [studentPayment, setStudentPayment] = useState([]); 
  const [student, setStudent] = useState([]); 
  const [courses, setCourses] = useState([]); 
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentModalities, setPaymentModalities] = useState([]);
  const [payments, setPayments] = useState([]);
  const [studentPaymentsDetails, setStudentPaymentsDetails] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);  // Cursos en los que está matriculado el estudiante
  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
  



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener información de los pagos
        const StudentPaymentData = await GetStudentPayment();
        setStudentPayment(StudentPaymentData);

        // Obtener datos del estudiante
        const StudentCoursesData = await GetStudentCourses();
        setStudentCourses(StudentCoursesData);

        // Obtener datos del estudiante
        const StudentData = await GetStudent();
        setStudent(StudentData);

        // Obtener cursos disponibles
        const CourseData = await GetCourses();
        setCourses(CourseData);

        // Obtener métodos de pago
        const PaymentMethodsData = await GetPaymentMethods();
        setPaymentMethods(PaymentMethodsData);

        // Obtener modalidades de pago
        const PaymentModalitiesData = await GetPaymentModalities();
        setPaymentModalities(PaymentModalitiesData);

        // Obtener todos los pagos
        const PaymentData = await GetPayments();
        setPayments(PaymentData);
        
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    };
    fetchData();
  }, []); 

  useEffect(() => {
    if (!student || !user || payments.length === 0 || studentPayment.length === 0 || studentCourses.length === 0) {
      return; // Si faltan datos, evitamos continuar con el procesamiento
    }
  
    // Filtrar los pagos que corresponden al estudiante logueado
    const studentPayments = studentPayment
      .filter(payment => payment.student_fk === user.id) // Filtrar los pagos del estudiante logueado
      .map(payment => payment.payment_fk); // Extraer los IDs de los pagos
  
    const enrolledCourseIds = studentCourses
    .filter(studentCourse => studentCourse.student_fk === user.id) // Filtrar los cursos que corresponden al estudiante logueado
    .map(studentCourse => studentCourse.course_fk); // Obtener los course_fk relacionados

    // Obtener los detalles de los cursos que coinciden con los course_fk
    const enrolledCourseDetails = courses.filter(course => 
      enrolledCourseIds.includes(course.id)
    ); 
  
      // Establecer los cursos en los que el estudiante está matriculado
      setEnrolledCourses(enrolledCourseDetails);

    // Ahora, buscar esos pagos en la tabla de "payments"
    const studentPaymentsDetails = payments
      .filter(payment => studentPayments.includes(payment.id)) // Filtramos por los IDs de pago
  
    setStudentPaymentsDetails(studentPaymentsDetails); // Actualizamos el estado con los detalles de los pagos
  }, [payments, studentPayment, user.id, student, studentCourses, courses]); // Dependencias actualizadas
  
  return (
    <div className="student-payment-container">
      <h1 className="student-payment-title">Pagos del Estudiante</h1>
      {studentPaymentsDetails.length > 0 ? (
        <table className="student-payment-table">
          <thead>
            <tr>
              <th className="student-payment-table-header">Fecha de Pago</th>
              <th className="student-payment-table-header">Monto</th>
              <th className="student-payment-table-header">Número de comprobante</th>
            </tr>
          </thead>
          <tbody>
            {studentPaymentsDetails.map((payment) => (
              <tr key={payment.id} className="student-payment-row">
                <td className="student-payment-date">{payment.payment_date}</td>
                <td className="student-payment-amount">₡{payment.payment_amount}</td>
                <td className="student-payment-receipt-number">{payment.payment_receipt_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="student-payment-no-records">No se han encontrado pagos registrados</p>
      )}
    </div>
  );
}

export default StudentPayment;
