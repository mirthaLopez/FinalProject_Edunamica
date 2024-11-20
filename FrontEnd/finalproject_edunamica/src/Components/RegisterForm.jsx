/*import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import PostRegisterForm from '../Services/RegisterForm/PostRegisterForm';
import GetIdTypes from '../Services/RegisterForm/GetIdTypes';
import GetGenres from '../Services/RegisterForm/GetGenres';
import GetActiveCourses from '../Services/RegisterForm/GetActiveCourses';
// Get a las tablas relacionadas a direcciones
import GetProvinces from '../Services/Addresses/GetProvinces';
import GetCantons from '../Services/Addresses/GetCantons';
import GetDistricts from '../Services/Addresses/GetDistricts';
import GetNeighborhoods from '../Services/Addresses/GetNeighborhoods';*/

const RegisterForm = () => {
  /*const [identificationNumber, setIdentificationNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [identificationFk, setIdentificationFk] = useState('');
  const [genreFk, setGenreFk] = useState('');
  const [courseFk, setCourseFk] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [idImageUrl, setIdImageUrl] = useState(null);
  const [provinceFk, setProvinceFk] = useState('');
  const [cantonFk, setCantonFk] = useState('');
  const [districtFk, setDistrictFk] = useState('');
  const [neighborhoodFk, setNeighborhoodFk] = useState('');
  const [address, setAddress] = useState('');

  // Seteo de los datos obtenidos de la base de datos
  const [identifications, setIdentifications] = useState([]);
  const [genres, setGenres] = useState([]);
  const [courses, setCourses] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cantons, setCantons] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  // Verificación con Email Js
  const [verificationCode, setVerificationCode] = useState(''); // Código de validación generado
  const [userCode, setUserCode] = useState('');    // Código que el usuario ingresa para validar
  const [isCodeSent, setIsCodeSent] = useState(false); // Estado para saber si el código ha sido enviado
  const form = useRef();*/

  /* Función para generar un código aleatorio
  const generateRandomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // Genera un código de 6 dígitos
    setVerificationCode(code);
    return code;
  };*/

  /*useEffect(() => {
    const fetchData = async () => {
      const identificationsData = await GetIdTypes();
      setIdentifications(identificationsData);
      const genresData = await GetGenres();
      setGenres(genresData);
      const coursesData = await GetActiveCourses();
      setCourses(coursesData);
      const provincesData = await GetProvinces();
      setProvinces(provincesData);
      const cantonsData = await GetCantons();
      setCantons(cantonsData);      
      const districtsData = await GetDistricts();
      setDistricts(districtsData);      
      const neighborhoodsData = await GetNeighborhoods();
      setNeighborhoods(neighborhoodsData);
    };
    fetchData();
  }, []); */

  /*const handleIdentificationChange = (e) => {
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
  }; */

  /*const sendEmail = async (e) => {
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

  // Función para validar el código ingresado por el usuario
  const validateCode = async() => {
    if (parseInt(userCode) === verificationCode) {
      alert('Código validado correctamente');
      // Aquí puedes agregar más lógica para continuar con el flujo de tu aplicación
      const studentStatusFk = "1";
      const data = await PostRegisterForm(
        identificationNumber, firstName, lastName, secondLastName,
        birthDate, phoneNumber, email, idImageUrl, address, identificationFk, genreFk, courseFk, 
        studentStatusFk, neighborhoodFk
      );
    
      console.log("Server response:", data);
      if (!data) {
        console.log("No data received");
      }   
    } else {
      alert('El código ingresado es incorrecto');
    }
  };*/

  /*const cargaImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdImageUrl(file);
    }
  };*/

  return (
    <div>
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
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.course_name}</option>
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
  );
};

export default RegisterForm;

