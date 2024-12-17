import React, { useState, useEffect, useRef } from 'react'; // React y Hooks básicos
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto
//SERVICIOS
import PostRegisterForm from '../../Services/RegisterForm/PostRegisterForm'; // Servicio para registrar formulario
import GetIdTypes from '../../Services/RegisterForm/GetIdTypes'; // Obtener tipos de identificación
import GetGenres from '../../Services/RegisterForm/GetGenres'; // Obtener géneros
import GetEnrollment from '../../Services/Enrollment/GetEnrollment'; // Obtener inscripciones
import GetCourses from '../../Services/Courses/GetCourses'; // Obtener cursos
import GetPaymentMethod from '../../Services/Payments/GetPaymentMethods'; // Obtener métodos de pago
import PostPayment from '../../Services/Payments/PostPayments'; // Servicio para realizar pagos
import { useUser } from '../../Components/Administration/AdminContext'; // Contexto para usuario admin
// Get a las tablas relacionadas a direcciones
import GetProvinces from '../../Services/Addresses/GetProvinces'; // Obtener provincias
import GetCantons from '../../Services/Addresses/GetCantons'; // Obtener cantones
import GetDistricts from '../../Services/Addresses/GetDistricts'; // Obtener distritos
import GetNeighborhoods from '../../Services/Addresses/GetNeighborhoods'; // Obtener barrios
//ESTILOS CSS
import '../../Styles/Students/RegisterStudent.css'; // Estilos específicos para el registro de estudiantes
//IMPORTS DE LIBRERÍA MUI (Material UI)
import { Stepper, Step, StepLabel, Button, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'; // Componentes básicos de MUI
import { TextField, MenuItem, Select, InputLabel } from '@mui/material'; // Componentes MUI para formularios
import Modal from '@mui/material/Modal'; // Componente Modal de MUI
//IMPORT DE LIBRERÍA EMAIL JS
import emailjs from '@emailjs/browser'; // Librería para enviar correos electrónicos
//IMPORT DE IMÁGENES
import logo from '../../Img/OIP.jpg'; // Imagen del logo
//IMPORT DE LIBRERÍA NOTYF
import { Notyf } from 'notyf'; // Librería de notificaciones
import 'notyf/notyf.min.css'; // Estilos para las notificaciones de notyf
//IMPORT DE LINK TO
import { Link } from 'react-router-dom'; // Librería para navegación en React
//IMPORTS DE PAYPAL
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // Integración de PayPal

/**                REGISTRO DE ESTUDIANTES                                  */
function RegisterStudent() {
  const { user } = useUser();  // Obtener el usuario logueado
//////////////////Stepper///////////////////////////////////// 
const steps = ['Paso 1', 'Paso 2', 'Paso 3'];
const [activeStep, setActiveStep] = useState(0);

const handleNext = () => {
setActiveStep((prevActiveStep) => prevActiveStep + 1);
setIsFormSent(false);
};
const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
//////////////////////////////////////////////////////////////////////////////////////////////7
const [fileContent, setFileContent] = useState(""); // Para almacenar el contenido del archivo
const [identificationNumber, setIdentificationNumber] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [secondLastName, setSecondLastName] = useState('');
const [birthDate, setBirthDate] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
const [email, setEmail] = useState('');
const [identificationFk, setIdentificationFk] = useState('');
const [genreFk, setGenreFk] = useState('');
const [courseFk, setCourseFk] = useState('');
const [provinceFk, setProvinceFk] = useState('');
const [cantonFk, setCantonFk] = useState('');
const [districtFk, setDistrictFk] = useState('');
const [neighborhoodFk, setNeighborhoodFk] = useState('');
const [address, setAddress] = useState('');
const [idImageUrl, setIdImageUrl] = useState(null);
// Generar la URL de vista previa para la imagen seleccionada
const imagePreviewUrl = idImageUrl ? URL.createObjectURL(idImageUrl) : null;
// Seteo de los datos obtenidos de la base de datos
const [identifications, setIdentifications] = useState([]);
const [genres, setGenres] = useState([]);
const [provinces, setProvinces] = useState([]);
const [cantons, setCantons] = useState([]);
const [districts, setDistricts] = useState([]);
const [neighborhoods, setNeighborhoods] = useState([]);
const [enrollment, setEnrollment] = useState([]);
// Verificación con Email Js
const [verificationCode, setVerificationCode] = useState(''); // Código de validación generado
const [userCode, setUserCode] = useState('');    // Código que el usuario ingresa para validar
const [isCodeSent, setIsCodeSent] = useState(false); // Estado para saber si el código ha sido enviado
const [isFormSent, setIsFormSent] = useState(false); 
const form = useRef();
const [open, setOpen] = useState(false); // Estado para controlar la visibilidad del modal
const cargaImagen = (e) => {
  const file = e.target.files[0];
  setIdImageUrl(file);
};
const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } }));
// Función para abrir el modal
        const handleOpen = () => {
          setOpen(true); 
        };
// Función para cerrar el modal
        const handleClose = () => {
          setOpen(false); 
        };
//PayPal
    const [valores, setValores] = useState({ compra: null, venta: null });
    const [courses, setCourses] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentImg, setPaymentImg] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [receiptNumber, setReceiptNumber] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePaymentImg = (e) => {
        const file = e.target.files[0];
        if (file) {
          setPaymentImg(file);
        }
      };  
    // Generar la URL de vista previa para la imagen del comprobante de pago
    const paymentImgPreviewUrl = paymentImg ? URL.createObjectURL(paymentImg) : null;





  ///Cada vez que haya un curso que tenga diferentes horarios se deberá crear como un curso diferente para evitar errores
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  /* Active Courses son los cursos que tienen una matricula activa*/
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

useEffect(() => {
    const fetchData = async () => {
      const identificationsData = await GetIdTypes();
      setIdentifications(identificationsData);
      const genresData = await GetGenres();
      setGenres(genresData);
      const provincesData = await GetProvinces();
      setProvinces(provincesData);
      const cantonsData = await GetCantons();
      setCantons(cantonsData);      
      const districtsData = await GetDistricts();
      setDistricts(districtsData);      
      const neighborhoodsData = await GetNeighborhoods();
      setNeighborhoods(neighborhoodsData);
      const coursesData = await GetCourses();
      setCourses(coursesData);
      const paymentMethodData = await GetPaymentMethod();
      setPaymentMethods(paymentMethodData);
      const enrollmentData = await GetEnrollment();
      setEnrollment(enrollmentData);
    };
    fetchData();
  }, []);

// Cargar los datos del usuario
useEffect(() => {
  if (user) {
    setFirstName(user.student_name || '');
    setLastName(user.student_first_last_name || '');
    setSecondLastName(user.student_second_last_name || '');
    setBirthDate(user.student_birth_date || '');
    setPhoneNumber(user.student_phone_number || '');
    setEmail(user.student_email || '');
      (user.identificationFk || '');
    setAddress(user.address || '');
    setIdImageUrl(user.idImageUrl || null);
    setIdentifications(user.identifications || []);
    setGenres(user.student_genre  || []);
    setProvinces(user.provinces || []);
    setCantons(user.cantons || []);
    setDistricts(user.districts || []);
    setNeighborhoods(user.neighborhoods || []);
    if (user.neighborhood_fk) setNeighborhoodFk(user.neighborhood_fk);
  }
}, [user]);

// Establecer la dirección completa
useEffect(() => {
  if (user?.neighborhood_fk) {
    const neighborhood = neighborhoods.find(n => n.id === user.neighborhood_fk);
    const district = districts.find(d => d.id === neighborhood?.district_fk);
    const canton = cantons.find(c => c.id === district?.canton_fk);
    const province = provinces.find(p => p.id === canton?.province_fk);

    if (neighborhood || district || canton || province) {
      setProvinceFk(province)
      setCantonFk(canton)
      setDistrictFk(district)
      setNeighborhoodFk(neighborhood.id)
    }
  }
}, [user, provinces, cantons, districts, neighborhoods]);
useEffect(() => {
  // Verifica si el usuario tiene un género y lo establece
  if (user?.genre_fk) {
    const studentGenre = genres.find(g => g.id === user.genre_fk);
    if (studentGenre) {
      setGenreFk(studentGenre.id);
    }
  }
  // Verifica si el usuario tiene un tipo de identificación (identification_fk) y lo establece
  if (user?.identification_fk) {
    const identification = identifications.find(i => i.id === user.identification_fk);
    if (identification) {
      setIdentificationFk(identification.id);  // Establece el tipo de identificación
    }
  }
  // Verifica si el usuario tiene un número de identificación (identification_number) y lo establece
  if (user?.identification_number) {
    setIdentificationNumber(user.identification_number);  // Establece el número de identificación
  }

}, [user, genres, identifications]);


// Efecto que escucha cambios en el historial (cuando el usuario navega hacia atrás)
useEffect(() => {
const handlePopState = () => {
  setIsFormSent(false); // Cuando navega atrás, deshabilitamos el botón
};

// Agregar el listener al evento popstate
window.addEventListener('popstate', handlePopState);

// Limpiar el listener cuando el componente se desmonte
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
}, []);

//////////////////////Api Hacienda/////////////////////
const handleIdentificationChange = (e) => {
    setIdentificationFk(e.target.value);
    // Limpiamos los datos anteriores cuando se cambia el tipo de identificación
    setFirstName('');
    setLastName('');
    setSecondLastName('');
};

  // Función para realizar la consulta a la API cuando el usuario hace clic en el botón
  const handleFetchCedulaData = async () => {
    console.log(identificationFk, identificationNumber) 
    
    if (identificationFk == 1 && identificationNumber) {      
      try {
        const response = await fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${identificationNumber}`);
        const data = await response.json();
        if (data) {
          const NombreCompleto = data.nombre;
          const nombres = NombreCompleto.split(' ');
          const primerNombre = nombres[0]; 
          const primerApellido = nombres.length > 1 ? nombres[nombres.length - 2] : '';
          const segundoApellido = nombres.length > 2 ? nombres[nombres.length - 1] : '';

          setFirstName(primerNombre)
          setLastName(primerApellido)
          setSecondLastName(segundoApellido)

        } else {
          setDisplayName('No se encontraron datos para la cédula ingresada');
          notyf.error(`Error no se encontraron datos para la cédula ingresada`);
        }
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        setDisplayName('Error al obtener los datos.');
        notyf.error(`Error con la consulta de los datos`);
      }
    } else {
      notyf.info('Por favor, ingrese un número de cédula válido');
    }
  };

  /////////////Codigo aleatorio para validar Email/////////////////////
    // Función para generar un código aleatorio
const generateRandomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // Genera un código de 6 dígitos
    setVerificationCode(code);
    return code;
};

///////////Envio del email JS///////////////////////////
const sendEmail = async (e) => {
    e.preventDefault();
    const code = generateRandomCode(); // Genera el código de validación

    if (!idImageUrl) {
      console.log("No image file selected");
      return;
    }

    // Prepara los parámetros para el envío del correo
    const templateParams = {
      user_name: firstName,          // Nombre del usuario       
      to_email: email,   // Aquí usamos el correo del destinatario
      verification_code: code, // Agregamos el código de verificación
    };

    emailjs
      .send('service_lgmm5so', 'template_wv3sdno', templateParams, 'xKYQea8wmj0LgY5FG')
      .then(
        (response) => {
          console.log('Correo enviado con éxito!', response);
          notyf.success(`El código de verificación se ha enviado a ${email}`);
          setIsCodeSent(true); // Indicar que el código ha sido enviado
          handleOpen()
        },  
        (error) => {
          console.log('Error al enviar el correo:', error.text);
          notyf.error(`Error al enviar el código de verificación se ha enviado a ${email}`);
        }
      );
  };

  const handleChange = (event) => {
    const methodId = event.target.value;
    console.log('Método de pago seleccionado:', methodId);  // Imprime el valor
    setSelectedPaymentMethod(methodId);
  
    if (methodId === '3') {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  ////////////Consulta a la api del banco central para obtener tipo de cambio////////
  useEffect(() => {
    // Función para consultar el endpoint
    const obtenerValores = async () => {
      try {
        const response = await fetch('https://apis.gometa.org/tdc/tdc.json');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        // Asumimos que la respuesta tiene los valores en los campos compra y venta
        setValores({
          compra: data.compra,
          venta: data.venta,
        });
      } catch (error) {
        console.error('Error:', error);
        notyf.error(`Error al obtener los datos del tipo de cambio (problema interno)`);
      }
    };
    obtenerValores();
  }, []);

  ///////Encuentra el curso relacionado a la matricula ///////
    const chosen_course= courses.find(c => c.id == courseFk);
    const price = chosen_course?.course_price || "No disponible"; //////Aqui esta el precio relacionado al curso escogido 

  // Calcular el total amount
  const total_amount = (price / valores.venta).toFixed(2);

  const initialOptions = {
    clientId: import.meta.env.VITE_CLIENTE_ID, // ponerlo .env
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency: "USD",
            value: total_amount, // Usar el valor total calculado
          },
        },
      ],
    });
  };

    // Función para vaciar todos los campos de entrada
    const resetFields = () => {
      setUserCode('');   // Vaciar el campo del código
      setEmail('');      // Vaciar el campo del email
      setName('');       // Vaciar el campo del nombre
      setLastName('');   // Vaciar el campo del apellido
      setPhone('');      // Vaciar el campo del teléfono
      setAddress('');    // Vaciar el campo de la dirección
    };

  // Función para validar el código ingresado por el usuario
  const validateCode = async() => {
    if (parseInt(userCode) === verificationCode) {
      console.log('Código validado exitosamente!'); ////hay que quitar estos alert 
      notyf.success('Código validado exitosamente!');
      setIsCodeSent(true); // Indicar que el código ha sido enviado
      handleClose(); // Cerrar el modal
      setIsFormSent(true);
    } else {
      alert('El código ingresado es incorrecto');///hay que quitar estos alert 
      notyf.error(`Error el código ingresado es incorrecto`);
    }
  };
  
  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture(); // Esperamos la captura del pago
      notyf.success('Pago Completado por ' + details.payer.name.given_name);

      // Si el pago es completado, setear los datos relacionados con la transacción
      if (details.status === "COMPLETED") {
        // Seteo de datos relacionados con la transacción
        setReceiptNumber(details.id);
        setPaymentDate(details.create_time);

        // Aquí podrías hacer algo más con los datos, por ejemplo, enviar los detalles a tu backend
        console.log("Número de recibo:", details.id);
        console.log("Fecha de pago:", details.create_time);
      }
    } catch (error) {
      console.error('Error en la transacción:', error);
      notyf.error('Hubo un error al procesar el pago. Intenta nuevamente');
    }
  };

  const onCancel = (data) => {
    // Acción cuando el pago es cancelado
    notyf.warning(`Pago cancelado`);
    handleCloseModal(); // Cerrar el modal en caso de cancelación
  };


  const PaymentButton = async () => {
    console.log("Botón presionado");
      if (chosen_course.is_free) {
      try {
        // Enviar solo el formulario de registro sin información de pago
        const studentStatusFk = "1"; // Esto hay que arreglarlo (estudiante activo)
        const data = await PostRegisterForm(
          identificationNumber, firstName, lastName, secondLastName,
          birthDate, phoneNumber, email, idImageUrl, address, identificationFk, genreFk, courseFk,
          studentStatusFk, neighborhoodFk, null // Enviar null en lugar de payment_fk
        );
        notyf.success('Formulario de registro enviado de manera exitosa!');
        setIsFormSent(true);
      } catch (error) {
        console.error("Error al enviar el formulario de registro sin pago", error);
        notyf.error(`Error al enviar el formulario`);
      }
      return; // No ejecutamos la lógica de pago si es gratuito
    }

            // Si el curso no es gratuito, ejecutamos la lógica de pago
    if ((selectedPaymentMethod === '1' || selectedPaymentMethod === '2') && (!paymentImg || !receiptNumber)) {
      notyf.error("Para los métodos de pago 1 o 2, ambos campos de imagen de pago y número de recibo son obligatorios.");
      return; // No continuar si falta la imagen de pago o el número de recibo
    }
        
    // Si el curso no es gratuito, ejecutamos la lógica de pago
    const paymentDate = (selectedPaymentMethod === '1' || selectedPaymentMethod === '2') && new Date().toLocaleDateString('en-CA');
    
    try {
      const dataPayment = await PostPayment(
        paymentDate,
        price,
        paymentImg,
        receiptNumber,
        selectedPaymentMethod
      );
      console.log(paymentDate);
      console.log(receiptNumber);
      console.log(dataPayment);
  
      if (dataPayment) {
        const PaymentId = dataPayment.id;
        const payment_fk = PaymentId;
        const studentStatusFk = "1"; // Esto hay que arreglarlo (estudiante activo)
  
        // Enviar el formulario de registro con los datos del pago
        const data = await PostRegisterForm(
          identificationNumber, firstName, lastName, secondLastName,
          birthDate, phoneNumber, email, idImageUrl, address, identificationFk, genreFk, courseFk,
          studentStatusFk, neighborhoodFk, payment_fk
        );
        console.log(data);
        notyf.success('Pago registrado y formulario de registro enviado de manera exitosa!');
        setIsFormSent(true);
      } else {
        console.log("No se pudo obtener el id del pago");
        notyf.error(`Error al procesar el pago`);
      }
    } catch (error) {
      console.error("Error al agregar el payment", error);
      notyf.error(`Error al ejecutar el pago`);
    }
  };


  // Función para manejar la carga del archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileContent(reader.result); // Guarda el contenido del archivo
      };
      reader.readAsText(file); // Lee el archivo como texto
    }
  };

// Función para imprimir los datos
const handlePrint = () => {
const printContent = document.getElementById('printable-content');
const printWindow = window.open('', '_blank');
printWindow.document.write('<html><head><title>Imprimir Información</title></head><body>');
printWindow.document.write(printContent.innerHTML);
printWindow.document.write('</body></html>');
printWindow.document.close();
printWindow.print();
};

  return (
    <div className='steps-container-student'>
        <div className='div-title-register-student'><h1 className='text-form-register-student'>Formulario de Prematrícula</h1></div>

        <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === 0 && (
  <div className='container_first_step_student'>
    <form ref={form} onSubmit={sendEmail}>
      <div className='form-row-student'>
        {/* Columna 1: Identificación */}
        <div className='form-column-student'>
        <FormControl fullWidth margin="normal">
        <label className='label-direccion'>Tipo de Identificación:</label>
<select
  value={identificationFk}
  onChange={handleIdentificationChange}
  className='select-direccion'
  required
>
  <option value="">Selecciona tu tipo de Identificación</option>
  {identifications.map((id) => (
    <option key={id.id} value={id.id}>
      {id.identification_type}
    </option>
  ))}
</select>
            </FormControl>

            <TextField
              label="Número de identificación"
              value={identificationNumber}
              onChange={(e) => setIdentificationNumber(e.target.value)}
              margin="normal"
            />

          {identificationFk == 1 && (
              <Button variant="contained" color="primary" onClick={handleFetchCedulaData}>
                Obtener Datos de la Cédula
              </Button>
            )}

  <div className="file-upload-student">
          <input
            type="file"
            onChange={cargaImagen}
            accept="image/*"
            style={{ marginTop: 10 }}
          />
        {imagePreviewUrl && (
            <div className="preview-student">
              <img src={imagePreviewUrl} alt="ID Preview" width="100" />
            </div>
          )}
  </div>


          </div>

        {/* Columna 2: Nombre, Apellidos y Fecha de Nacimiento */}
        <div className='form-column-student'>
        <TextField
              label="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label="Primer Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label="Segundo Apellido"
              value={secondLastName}
              onChange={(e) => setSecondLastName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label="Fecha de Nacimiento"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
          </div>

        {/* Columna 3: Curso, Email, Teléfono y Género */}
        <div className='form-column-student'>
        <FormControl fullWidth margin="normal">
              <InputLabel>Curso</InputLabel>
              <Select
                value={courseFk}
                onChange={(e) => setCourseFk(e.target.value)}
                label="Course"
                required
              >
                <MenuItem value="">Selecccione el curso a matricular</MenuItem>
                {activeCourses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.course_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            
            <TextField
              label="Número de teléfono"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              required
              margin="normal"
            />

<div className="form-group">
      <label className='label-direccion' htmlFor="genero">Género</label>
      <select
        id="genero"
        value={genreFk}
        onChange={(e) => setGenreFk(e.target.value)} // Actualiza el valor seleccionado
        required
        className='select-direccion'
      >
        <option value="">Selecciona un género</option>
        {genres.length > 0 ? (
          genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genre_name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Cargando géneros...
          </option>
        )}
      </select>
    </div>
        </div>


         {/* Columna 4: Dirección */}
         <div className='form-column-student'>

{/* Provincia */}
<div className="form-control">
  <label className='label-direccion' htmlFor="provincia">Provincia</label>
  <select
    id="provincia"
    value={provinceFk.id}
    onChange={(e) => setProvinceFk(e.target.value)}
    required
    className='select-direccion'>
    <option value="">Selecciona tu provincia</option>
    {provinces.map((province) => (
      <option key={province.id} value={province.id}>
        {province.province_name}
      </option>
    ))}
  </select>
</div>

{/* Cantón */}
<div className="form-control">
  <label className='label-direccion' htmlFor="canton" >Cantón</label>
  <select
    id="canton"
    value={cantonFk.id}
    onChange={(e) => setCantonFk(e.target.value)}
    required
    className='select-direccion'>
    <option value="">Selecciona tu cantón</option>
    {cantons
      .filter((canton) => canton.province_fk === parseInt(provinceFk.id))
      .map((canton) => (
        <option key={canton.id} value={canton.id}>
          {canton.canton_name}
        </option>
      ))}
  </select>
</div>

{/* Distrito */}
<div className="form-control">
  <label className='label-direccion' htmlFor="distrito">Distrito</label>
  <select
    id="distrito"
    value={districtFk.id}
    onChange={(e) => setDistrictFk(e.target.value)}
    required
    className='select-direccion'>
    <option value="">Selecciona tu distrito</option>
    {districts
      .filter((district) => district.canton_fk === parseInt(cantonFk.id))
      .map((district) => (
        <option key={district.id} value={district.id}>
          {district.district_name}
        </option>
      ))}
  </select>
</div>

{/* Barrio */}
<div className="form-control">
  <label className='label-direccion' htmlFor="barrio">Barrio</label>
  <select
    id="barrio"
    value={neighborhoodFk}
    onChange={(e) => setNeighborhoodFk(e.target.value)}
    required
   className='select-direccion'>
    <option value="">Selecciona tu barrio</option>
    {neighborhoods
      .filter((neighborhood) => neighborhood.district_fk === parseInt(districtFk.id))
      .map((neighborhood) => (
        <option key={neighborhood.id} value={neighborhood.id}>
          {neighborhood.neighborhood_name}
        </option>
      ))}
  </select>
</div>
            <TextField
              label="Dirección Exacta"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
          </div>
      </div>

      <div className='form-row-student'>
        <div className='form-column-student'>
          <div className="botonEnviarStudent">
        <Button 
            className='btn-send-student' 
            type="submit"  // Cambiado a 'submit' para que dispare el formulario
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Enviar
          </Button>
          </div>
        </div>
      </div>
    </form>

    {/* El modal solo se muestra si isCodeSent es true */}
     {/* Modal solo se muestra si isCodeSent es true */}
     {isCodeSent && (
        <Modal
          open={open}    // 'open' controla si el modal está visible
          onClose={handleClose} // Función para cerrar el modal cuando se hace clic afuera
          aria-labelledby="modal-title-student"
          aria-describedby="modal-description-student"
        >
          <Box 
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              textAlign: 'center'
            }}
          >
            <h3 id="modal-title">Ingresa el código de verificación que hemos enviado a tu correo</h3>
            <TextField
              label="Código de verificación"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)} // Actualiza el valor de userCode
              fullWidth
              required
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={validateCode} // Ejecuta la validación cuando se hace clic en "Validar Código"
              sx={{ marginTop: 2 }}
            >
              Validar Código
            </Button>
          </Box>
        </Modal>

    )}
  </div>
)}

{activeStep === 1 && (
  <div className='container_second_step_student'>
    {/* Mostrar el mensaje si el curso es gratuito */}
    {chosen_course.is_free ? (
      <div className="no-payment-required-message-student">
        <p>No tienes que pagar. Este curso es gratuito.</p>
      </div>
    ) : (
      // Si el curso no es gratuito, mostrar la sección de métodos de pago
      <div className="payment-methods-grid-student">
        <div className="payment-methods-container-student">
          <FormControl component="fieldset" className="payment-methods-form-student">
            <FormLabel component="legend">Selecciona un Método de Pago</FormLabel>
            <RadioGroup
              value={selectedPaymentMethod}
              onChange={handleChange}
              name="payment-methods"
              className="payment-methods-group-student"
            >
              {paymentMethods.map((method, index) => (
                <FormControlLabel
                  key={method.id}
                  value={method.id.toString()}
                  control={<Radio />}
                  label={method.payment_method_name}
                  className="payment-method-option-student"
                  disabled={index === 3} // Deshabilitar opción 4
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Mostrar input para número de comprobante si el método de pago es 1 o 2 */}
          {(selectedPaymentMethod === '1' || selectedPaymentMethod === '2') && (
            <div className="comprobante-container-student">
              <label htmlFor="comprobante-number-student">Número de Comprobante de Pago:</label>
              <input
                type="text"
                id="comprobante-number"
                placeholder="Ingresa el número de comprobante"
                value={receiptNumber} // Vinculamos el estado receiptNumber
                onChange={(e) => setReceiptNumber(e.target.value)} // Actualizamos el estado cuando el valor cambie
                className="comprobante-input-student"
              />
              <div className="payment-info-container-student">
                <div className="upload-container-student">
                  <label>Foto o captura de comprobante de pago:</label>
                  <input
                    type="file"
                    onChange={handlePaymentImg}
                    accept="image/*"
                    required
                    className="payment-img-input-student"
                  />
                  {paymentImgPreviewUrl && (
                    <div className="preview-student">
                      <img src={paymentImgPreviewUrl} alt="Comprobante de pago" width="100" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modal de PayPal */}
          <Modal
  open={isModalOpen}
  onClose={handleCloseModal}
  aria-labelledby="paypal-payment-modal-student"
  aria-describedby="modal-para-realizar-pago-con-paypal-student"
>
  <div className="paypal-modal__content_student">
    <h2 className="paypal-modal__title_student">Pago con PayPal</h2>
    <p className="paypal-modal__text_student">Estás a punto de pagar con PayPal. ¿Quieres continuar?</p>

    {selectedPaymentMethod === '3' && (
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            layout: 'horizontal',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={onCancel}
          className="paypal_modal__paypal_btn_student"
        />
      </PayPalScriptProvider>
    )}

              <button onClick={handleCloseModal} className="paypal_modal__cancel_btn_student">
                Cancelar
              </button>
            </div>
          </Modal>
        </div>

        {/* Mostrar valores del tipo de cambio solo si el método de pago es PayPal (id 3) */}
        {selectedPaymentMethod === '3' && (
          <div className="payment-info-container-student">
            <h3>Valores del Dólar</h3>
            <p>Compra: {valores.compra ? valores.compra : 'Cargando...'}</p>
            <p>Venta: {valores.venta ? valores.venta : 'Cargando...'}</p>
          </div>
        )}
      </div>
    )}

    {/* Botón de pago o enviar dependiendo si el curso es gratuito o no */}
    <div className='container-payment-btn-student'>
      <div>
        <button 
          onClick={PaymentButton} // Siempre ejecuta PaymentButton
          className="payment-btn-student"
          style={{
            backgroundColor: '#4CAF50', // Color de fondo verde
            color: 'white', // Color del texto blanco
            padding: '15px 32px', // Relleno en los lados y arriba/abajo
            textAlign: 'center', // Centrado del texto
            textDecoration: 'none', // Sin subrayado
            display: 'inline-block', // Asegura que el botón sea un bloque en línea
            fontSize: '16px', // Tamaño de la fuente
            margin: '4px 2px', // Márgenes alrededor del botón
            cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
            border: 'none', // Sin borde
            borderRadius: '8px', // Bordes redondeados
            transition: 'background-color 0.3s', // Transición suave para el cambio de color
          }}
        >
          {chosen_course.is_free ? 'Enviar' : 'Pagar'}
        </button>
      </div>
    </div>
  </div>
)}

{activeStep === 2 && (
  <div className="receipt-step-three-container-student">
    <img src={logo} alt="Logo de la Empresa" className="receipt-company-logo-student" /> 
    <h3 className="receipt-step-three-section-title-student">Resumen de los datos ingresados</h3>

    <div id="printable-content" className="receipt-content-student">
      <div className="receipt-column-student">
        <h4 className="receipt-column-title-student">Datos Ingresados</h4>
        <p className="receipt-step-three-data-item-student"><strong>Tipo de identificación:</strong> {identifications.find(id => id.id === identificationFk)?.identification_type || 'No seleccionado'}</p>
        <p className="receipt-step-three-data-item-student"><strong>Número de identificación:</strong> {identificationNumber || 'No ingresado'}</p>
        <p className="receipt-step-three-data-item-student"><strong>Primer nombre:</strong> {firstName || 'No ingresado'}</p>
        <p className="receipt-step-three-data-item-student"><strong>Apellido:</strong> {lastName || 'No ingresado'}</p>
        <p className="receipt-step-three-data-item-student"><strong>Segundo apellido:</strong> {secondLastName || 'No ingresado'}</p>
        <p className="receipt-step-three-data-item-student"><strong>Número de teléfono:</strong> {phoneNumber || 'No ingresado'}</p>
        <p className="receipt-step-three-data-item-student"><strong>Email:</strong> {email || 'No ingresado'}</p>
        <p className="receipt-step-three-data-item-student"><strong>Curso:</strong> {courses.find(course => course.id === courseFk)?.course_name || 'No seleccionado'}</p>
      </div>

      {/* Solo mostrar los detalles del pago si el curso no es gratuito */}
      {chosen_course.is_free === false && (
        <div className="receipt-column-student">
          <h4 className="receipt-column-title-student">Detalles del Pago</h4>
          <p className="receipt-step-three-payment-item-student"><strong>Número de Recibo:</strong> {receiptNumber || 'No especificado'}</p>
          <p className="receipt-step-three-payment-item-student"><strong>Monto:</strong> {price || 'No especificado'}</p>
          <p className="receipt-step-three-payment-item-student"><strong>Método de Pago:</strong> {paymentMethods.find(method => method.id.toString() === selectedPaymentMethod)?.payment_method_name || 'No especificado'}</p>
        </div>
      )}
    </div>

    {/* Botón para imprimir los datos */}
    <button onClick={handlePrint} className="receipt-print-button-student">Imprimir información</button>

    {/* Opcional: cargar un archivo */}
    {fileContent && (
      <div>
        <h3>Contenido del archivo cargado:</h3>
        <pre>{fileContent}</pre>
      </div>
    )}
  </div>
)}
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {activeStep === steps.length ? (
                     <Box className="completion-container-student">
                     <div>
                       <h2 className="completion-title-student">Haz completado el proceso de Prematrícula</h2>
                       <p className="completion-message-student">Una vez tu solicitud sea aceptada recibirás un correo con las credenciales de acceso al sistema.</p>
                     </div>
                     <Link to="/" className="completion-link-student">
                       <Button variant="contained" sx={{ mt: 2 }}>Ir a Inicio</Button>
                     </Link>
                   </Box>
                ) : (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
                            <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }} variant="outlined">
                                Atrás
                            </Button>
                            {activeStep === steps.length - 1 ? (
                                <Button variant="contained" onClick={handleNext}>
                                    Enviar
                                </Button>
                            ) : (
                              <Button
                              variant="contained"
                              onClick={handleNext}
                              disabled={!isFormSent} // El botón estará deshabilitado cuando isFormSent sea false
                            >
                              Siguiente
                            </Button>
                            )}
                        </Box>
                    </>
                )}
            </Box>
    </div>
  )
}

export default RegisterStudent