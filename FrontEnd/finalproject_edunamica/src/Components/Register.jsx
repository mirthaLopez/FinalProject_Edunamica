import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import PostRegisterForm from '../Services/RegisterForm/PostRegisterForm';
import GetIdTypes from '../Services/RegisterForm/GetIdTypes';
import GetGenres from '../Services/RegisterForm/GetGenres';
import GetEnrollment from '../Services/Enrollment/GetEnrollment';

// Get a las tablas relacionadas a direcciones
import GetProvinces from '../Services/Addresses/GetProvinces';
import GetCantons from '../Services/Addresses/GetCantons';
import GetDistricts from '../Services/Addresses/GetDistricts';
import GetNeighborhoods from '../Services/Addresses/GetNeighborhoods';

////////LLamados relacionados a Paypal////////
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import GetCourses from '../Services/Courses/GetCourses';
import GetPaymentMethod from '../Services/Payments/GetPaymentMethods';
import PostPayment from '../Services/Payments/PostPayments';

/////////Stepper MUI//////////////////////////
import { Stepper, Step, StepLabel, Button, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';



function Register() {
    ///////Stepper 
    const steps = ['Paso 1', 'Paso 2', 'Paso 3'];
    const [activeStep, setActiveStep] = useState(0);
    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);

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
    const [idImageUrl, setIdImageUrl] = useState(null);
    const [provinceFk, setProvinceFk] = useState('');
    const [cantonFk, setCantonFk] = useState('');
    const [districtFk, setDistrictFk] = useState('');
    const [neighborhoodFk, setNeighborhoodFk] = useState('');
    const [address, setAddress] = useState('');
    
    const cargaImagen = (e) => {const file = e.target.files[0];
        if (file) {
          setIdImageUrl(file);
        }};
  
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
    const form = useRef();

    ///Paypal

    const [valores, setValores] = useState({ compra: null, venta: null });
    const [courses, setCourses] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentImg, setPaymentImg] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [receiptNumber, setReceiptNumber] = useState('');
    const [paymentDate, setPaymentDate] = useState('');

    const handlePaymentImg = (e) => {
        const file = e.target.files[0];
        if (file) {
          setPaymentImg(file);
        }
      };
    
      const handleChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
      };

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

    //////////////////////Api Hacienda/////////////////////
    const handleIdentificationChange = (e) => {
        setIdentificationFk(e.target.value);
        // Limpiamos los datos anteriores cuando se cambia el tipo de identificación
        setFirstName('');
        setLastName('');
        setSecondLastName('');
        setDisplayName('');
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
              setDisplayName('No se encontraron datos para la cédula ingresada.');
            }
          } catch (error) {
            console.error('Error al obtener los datos de la API:', error);
            setDisplayName('Error al obtener los datos.');
          }
        } else {
          alert('Por favor, ingrese un número de cédula válido.');
        }
      };

      /////////////Codigo aleatorio para validar Email/////////////////////
        // Función para generar un código aleatorio
    const generateRandomCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000); // Genera un código de 6 dígitos
        setVerificationCode(code);
        return code;
    };

    ///////////Envio del email Js///////////////////////////
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
              alert(`El código de verificación se ha enviado a ${email}`);
              setIsCodeSent(true); // Indicar que el código ha sido enviado
            },
            (error) => {
              console.log('Error al enviar el correo:', error.text);
            }
          );
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
          }
        };
        obtenerValores();
      }, []);

      ///////Encuentra el curso relacionado a la matricula ///////
        const chosen_course= courses.find(c => c.id == courseFk);
        console.log(chosen_course);
        const price = chosen_course?.course_price || "No disponible"; //////Aqui esta el precio relacionado al curso escogido 
    
      // Calcular el total amount
      const total_amount = (price / valores.venta).toFixed(2);
      console.log(total_amount); // Esto devolverá un string con 2 decimales
    
      const initianlOptions = {
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
    
      // Función para validar el código ingresado por el usuario
      const validateCode = async() => {
        if (parseInt(userCode) === verificationCode) {
          alert('Código validado correctamente'); ////hay que quitar estos alert 
            

            
        } else {
          alert('El código ingresado es incorrecto');///hay que quitar estos alert 
        }
      };
      
      const onApprove = async (data, actions) => {
        try {
          const details = await actions.order.capture(); // Esperamos la captura del pago
          alert("Pago Completado " + details.payer.name.given_name);
          if (details.status === "COMPLETED") {
            /////Seteo de datos relacionados a la transaccion/////
            setReceiptNumber(details.id)
            setPaymentDate(details.create_time);
            
          }
        } catch (error) {
          console.error('Error en la transacción:', error);
        }
      };
    
      const onCancel = () => {
        alert("Pago Cancelado");
      }; 

      const PaymentButton = async () => {
        console.log("Boton pagar");
        
        try {
  
          const dataPayment = await PostPayment(
            paymentDate,
            price, //////PRECIO DEL CURSO, RELACIONADO A LA TABLA DE MATRICULA
            paymentImg,
            receiptNumber,
            selectedPaymentMethod
          );
  
          console.log(dataPayment);
  
            if (dataPayment) {
              const PaymentId = dataPayment.id /////Agregar payment id al modelado FK
              console.log(PaymentId);

              const payment_fk = PaymentId
              console.log(payment_fk);
              

              const studentStatusFk = "1"; //// ESto hay que arreglarlo 
                   const data = await PostRegisterForm(
                    identificationNumber, firstName, lastName, secondLastName,
                    birthDate, phoneNumber, email, idImageUrl, address, identificationFk, genreFk, courseFk, 
                    studentStatusFk, neighborhoodFk, payment_fk);

                    console.log(data);
                    

            }else{
              console.log("No se pudo obtener el id del pago");
            }
          
        } catch (error) {
          console.error("Error al agregar el payment", error);
        } 
      }

  return (
    <div>
         <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep === 0 && ( 
    <div className='container_first_step'>
      <form ref={form} onSubmit={sendEmail}>
        <div>
          <label>Select Identification Type:</label>
          <select value={identificationFk} onChange={handleIdentificationChange} required>
            <option value="">Select an identification</option>
            {identifications.map((id) => (
              <option key={id.id} value={id.id}>{id.identification_type}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Identification Number:</label>
          <input type="text" value={identificationNumber} onChange={(e) => setIdentificationNumber(e.target.value)} required />
        </div>

        {/* Botón para consultar los datos de la cédula */}
        <button type="button" onClick={handleFetchCedulaData}> Obtener Datos de la Cédula</button>

        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>

        <div>
          <label>Second Last Name:</label>
          <input type="text" value={secondLastName} onChange={(e) => setSecondLastName(e.target.value)} required />
        </div>

        <div>
          <label>Birth Date:</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
        </div>

        <div>
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label>Gender:</label>
          <select value={genreFk} onChange={(e) => setGenreFk(e.target.value)} required>
            <option value="">Select a gender</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.genre_name}</option>
            ))}
          </select>
        </div>

        <div className='Address-Container'>
          <div>
            <label>Provincia:</label>
            <select value={provinceFk} onChange={(e) => setProvinceFk(e.target.value)} required>
              <option value="">Selecciona tu provincia:</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>{province.province_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Cantón:</label>
            <select value={cantonFk} onChange={(e) => setCantonFk(e.target.value)} required>
              <option value="">Selecciona tu cantón:</option>
              {cantons
                .filter((canton) => canton.province_fk === parseInt(provinceFk)) // Filtrar cantones por province_fk
                .map((canton) => (
                  <option key={canton.id} value={canton.id}>{canton.canton_name}</option>
                ))}
            </select>
          </div>

          <div>
            <label>Distrito:</label>
            <select value={districtFk} onChange={(e) => setDistrictFk(e.target.value)} required>
              <option value="">Selecciona tu distrito:</option>
              {districts
                .filter((district) => district.canton_fk === parseInt(cantonFk)) // Filtrar distritos por canton_fk
                .map((district) => (
                  <option key={district.id} value={district.id}>{district.district_name}</option>
                ))}
            </select>
          </div>

          <div>
            <label>Selecciona tu barrio:</label>
            <select value={neighborhoodFk} onChange={(e) => setNeighborhoodFk(e.target.value)} required>
              <option value="">Selecciona tu barrio:</option>
              {neighborhoods
                .filter((neighborhood) => neighborhood.district_fk === parseInt(districtFk)) // Filtrar barrios por district_fk
                .map((neighborhood) => (
                  <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.neighborhood_name}</option>
                ))}
            </select>
          </div>

          <div>
            <label>Dirección exacta:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />     
          </div>
        </div>

       <div>
  <label>Course:</label>
  <select value={courseFk} onChange={(e) => setCourseFk(e.target.value)} required>
    <option value="">Select a course</option>
    {activeCourses.map((course) => (
      <option key={course.id} value={course.id}>
        {course.course_name}
      </option>
    ))}
  </select>
</div>

        <div>
          <label>ID Image:</label>
          <input type="file" onChange={cargaImagen} accept="image/*" required />
        </div>



        <div>
          <input type="submit" value="ENVIAR" />
        </div>
      </form>
      

      {/* Mostrar el campo para ingresar el código solo si el código fue enviado */}
      {isCodeSent && (
        <div>
          <h3>Ingresa el código de verificación que hemos enviado a tu correo</h3>
          <input
            type="text"
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder="Código de verificación"
            required
          />
          <button onClick={validateCode}>Validar Código</button>
        </div>
      )}
    </div>
  )}

{activeStep === 1 && (
  <div className='container_second_step'>
      <h3>Valores del Dólar</h3>
      <p>Compra: {valores.compra ? valores.compra : 'Cargando...'}</p>
      <p>Venta: {valores.venta ? valores.venta : 'Cargando...'}</p>

    {/* Solo renderiza los métodos de pago si el curso no es gratuito */}
    {chosen_course.is_free === false && (
      <div>
        {/* Selección del método de pago */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Selecciona un Método de Pago</FormLabel>
          <RadioGroup value={selectedPaymentMethod} onChange={handleChange} name="payment-methods">
            {paymentMethods.map((method) => (
              <FormControlLabel
                key={method.id}
                value={method.id.toString()}
                control={<Radio />}
                label={method.payment_method_name}
              />
            ))}
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio />}
              label="Pagos en Efectivo, únicamente matrícula presencial"
            />
          </RadioGroup>
        </FormControl>
             {/* Solo muestra el botón de PayPal si el método seleccionado es Paypal */}
      {selectedPaymentMethod === '3' && ( // Suponiendo que '3' es el id de PayPal
        <PayPalScriptProvider options={initianlOptions}>
          <PayPalButtons
            style={{
              layout: "horizontal",
              color: "blue",
              shape: "rect",
              label: "paypal",
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onCancel={onCancel}
          />
        </PayPalScriptProvider>
      )}

       {/* Subir imagen del comprobante de pago */}
       <div>
         <label>Foto o captura de comprobante de pago:</label>
         <input type="file" onChange={handlePaymentImg} accept="image/*" required />
       </div>

      <button onClick={PaymentButton}>Pagar</button>
      </div>
    )}


    </div>
    )}


{activeStep === 2 && (
        <div>
        <p>Estamos en el paso 3</p>
      
        <h3>Resumen de los datos ingresados</h3>
        <p><strong>Tipo de identificación:</strong> {identifications.find(id => id.id === identificationFk)?.identification_type || 'No seleccionado'}</p>
        <p><strong>Número de identificación:</strong> {identificationNumber || 'No ingresado'}</p>
        <p><strong>Primer nombre:</strong> {firstName || 'No ingresado'}</p>
        <p><strong>Apellido:</strong> {lastName || 'No ingresado'}</p>
        <p><strong>Segundo apellido:</strong> {secondLastName || 'No ingresado'}</p>
        <p><strong>Número de teléfono:</strong> {phoneNumber || 'No ingresado'}</p>
        <p><strong>Email:</strong> {email || 'No ingresado'}</p>
        <p><strong>Curso:</strong> {courses.find(course => course.id === courseFk)?.course_name || 'No seleccionado'}</p>
      
        {/* Solo mostrar los detalles del pago si el curso no es gratuito */}
        {chosen_course.is_free === false && (
          <div>
            <h3>Detalles del Pago</h3>
      
            {/* Mostrar el número de recibo y el método de pago seleccionado */}
            <p><strong>Número de Recibo:</strong> {receiptNumber || 'No especificado'}</p>
            <p><strong>Método de Pago:</strong> {paymentMethods.find(method => method.id.toString() === selectedPaymentMethod)?.payment_method_name || 'No especificado'}</p>
          </div>
        )}
      </div>
      )}



            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {activeStep === steps.length ? (
                    <Box>
                        <h2>Todos los pasos completados - ¡has terminado!</h2>
                        <Button variant="contained" onClick={handleReset} sx={{ mt: 2 }}>Reiniciar</Button>
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
                                <Button variant="contained" onClick={handleNext}>
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

export default Register