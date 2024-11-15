import React, { useState, useEffect } from 'react';
import PostRegisterForm from '../Services/RegisterForm/PostRegisterForm';
import GetIdTypes from '../Services/RegisterForm/GetIdTypes';
import GetGenres from '../Services/RegisterForm/GetGenres';
import GetActiveCourses from '../Services/RegisterForm/GetActiveCourses';
import GetStudentStatus from '../Services/RegisterForm/GetStudentStatus';
////////Get a las tablas relacionadas a direcciones/////////////////
import GetAddresses from '../Services/Addresses/GetAddresses';
import GetProvinces from '../Services/Addresses/GetProvinces';
import GetCantons from '../Services/Addresses/GetCantons';
import GetDistricts from '../Services/Addresses/GetDistricts';
import GetNeighborhoods from '../Services/Addresses/GetNeighborhoods';


const RegisterForm = () => {
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [identificationFk, setIdentificationFk] = useState('');
  const [genreFk, setGenreFk] = useState('');
  const [addressFk, setAddressFk] = useState('');
  const [courseFk, setCourseFk] = useState('');
  const [studentStatusFk, setStudentStatusFk] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [idImageUrl, setIdImageUrl] = useState(null);
  const [provinceFk, setProvinceFk] = useState('');
  const [cantonFk, setCantonFk] = useState('');
  const [districtFk, setDistrictFk] = useState('');
  const [neighborhoodFk, setNeighborhoodFk]=useState('');


  ///////// Seteo de los get //////////////////
  const [identifications, setIdentifications] = useState([]);
  const [genres, setGenres] = useState([]);
  const [courses, setCourses] = useState([]);
  const [studentStatuses, setStudentStatuses] = useState([]);
  const [provinces, setProvinces]=useState([]);
  const [cantons, setCantons]=useState([]);
  const [districts, setDistricts]=useState([]);
  const [neighborhoods, setNeighborhoods]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const identificationsData = await GetIdTypes();
      setIdentifications(identificationsData);
      const genresData = await GetGenres();
      setGenres(genresData);
      const coursesData = await GetActiveCourses();
      setCourses(coursesData);
      const studentStatusesData = await GetStudentStatus();
      setStudentStatuses(studentStatusesData);
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
  }, []);

  const handleIdentificationChange = async (e) => {
    const selectedIdentification = e.target.value;
    setIdentificationFk(selectedIdentification);

    // Make sure identificationNumber is available before making the request
    if (selectedIdentification === 'Cédula Nacional' && identificationNumber) {
      try {
        const response = await fetch(`https://api.hacienda.go.cr/cedulas/${identificationNumber}`);
        const data = await response.json();

        if (data) {
          setFirstName(data.name);
          setLastName(data.first_last_name);
          setSecondLastName(data.second_last_name);

          // Use split method to get first name, last name, and second last name
          const fullName = `${data.name} ${data.first_last_name} ${data.second_last_name}`.trim();
          const nameParts = fullName.split(' '); // Split full name into parts

          const firstName = nameParts[0]; // First name
          const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 2] : ''; // Last name
          const secondLastName = nameParts.length > 2 ? nameParts[nameParts.length - 1] : ''; // Second last name

          // Set the split values
          setFirstName(firstName);  // First name
          setLastName(lastName); // Last name
          setSecondLastName(secondLastName); // Second last name

          setDisplayName(fullName); // Display the full name
        }
      } catch (error) {
        console.error('Error fetching data from Hacienda API:', error);
        setDisplayName('Error fetching data');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idImageUrl) {
      console.log("No image file selected");
      return;
    }

    const data = await PostRegisterForm(
      identificationNumber, firstName, lastName, secondLastName,
      birthDate, phoneNumber, email, identificationFk, genreFk,
      addressFk, courseFk, studentStatusFk, idImageUrl
    );

    console.log("Server response:", data);
    if (!data) {
      console.log("No data received");
    }
  };

  const cargaImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdImageUrl(file);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
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
        <input 
          type="text" 
          value={identificationNumber} 
          onChange={(e) => setIdentificationNumber(e.target.value)} 
          required 
        />
      </div>

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
        <label>Province:</label>
        <select value={provinceFk} onChange={(e) => setProvinceFk(e.target.value)} required>
          <option value="">Selecciona tu provincia:</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>{province.province_name}</option>
          ))}
        </select>
        </div>
      <div>
      <label>Canton:</label>
        <select value={cantonFk} onChange={(e) => setCantonFk(e.target.value)} required>
          <option value="">Selecciona tu canton:</option>
          {cantons.map((canton) => (
            <option key={canton.id} value={canton.id}>{canton.canton_name}</option>
          ))}
        </select>
        </div>
      <div>
      <label>Distrito:</label>
        <select value={districtFk} onChange={(e) => setDistrictFk(e.target.value)} required>
          <option value="">Selecciona tu distrito:</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>{district.district_name}</option>
          ))}
        </select>
        </div>
      <div>
      <label>Selecciona tu barrio:</label>
        <select value={neighborhoodFk} onChange={(e) => setNeighborhoodFk(e.target.value)} required>
          <option value="">Selecciona tu distrito:</option>
          {neighborhoods.map((neighborhood) => (
            <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.neighborhood_name}</option>
          ))}
        </select>
      </div>
        <label>Dirección exacta:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />     
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
        <label>Full Name:</label>
        <p>{displayName}</p>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default RegisterForm;
