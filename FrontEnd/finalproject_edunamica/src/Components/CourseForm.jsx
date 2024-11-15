import React, { useState, useEffect } from 'react';
import PostCourse from '../Services/Courses/PostCourses';
import GetCategory from '../Services/Categories/GetCategories';

const CourseForm = () => {
  // Establecemos el estado para cada campo del formulario
  const [courseImageUrl, setCourseImageUrl] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [courseSchedule, setCourseSchedule] = useState('');
  const [begins, setBegins] = useState('');
  const [ends, setEnds] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseCategory, setCourseCategory] = useState('');

  // Estado para las categorías obtenidas
  const [categories, setCategories] = useState([]);

  // Manejo de cambios para los campos del formulario
  const handleChangeCourseName = (e) => setCourseName(e.target.value);
  const handleChangeCourseDescription = (e) => setCourseDescription(e.target.value);
  const handleChangeCoursePrice = (e) => setCoursePrice(e.target.value);
  const handleChangeCourseSchedule = (e) => setCourseSchedule(e.target.value);
  const handleChangeBegins = (e) => setBegins(e.target.value);
  const handleChangeEnds = (e) => setEnds(e.target.value);
  const handleChangeCourseDuration = (e) => setCourseDuration(e.target.value);
  const handleChangeCategory = (e) => setCourseCategory(e.target.value);

   ////// Llamado al servidor, obtiene las categorias ////////
   useEffect(() => {
    const fetchCategory = async () => {
        const data = await GetCategory(); 
        setCategories(data); 
        console.log(data);   
  };
  fetchCategory(); 
}, []); 

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await PostCourse(courseImageUrl, courseName, courseDescription, coursePrice, courseSchedule, begins, ends, courseDuration, courseCategory ); // se envian los datos del curso
    console.log("Soy la respuesta del server:", data);
    if (!data) {
      console.log("No se obtuvieron datos"); 
    }
  };

  function cargarimagen(e) {
     const file = e.target.files[0]    
    setCourseImageUrl(file)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del curso:</label>
        <input type="text" value={courseName} onChange={handleChangeCourseName} required />
      </div>

      <div>
        <label>Descripción del curso:</label> 
        <textarea value={courseDescription} onChange={handleChangeCourseDescription} required/>
      </div>

      <div>
        <label>Precio del curso:</label>
        <input type="number" value={coursePrice} onChange={handleChangeCoursePrice} required />
      </div>

      <div>
        <label>Horario:</label>
        <input type="text" value={courseSchedule} onChange={handleChangeCourseSchedule} required />
      </div>

      <div>
        <label>Fecha de inicio:</label>
        <input type="date" value={begins} onChange={handleChangeBegins} required />
      </div>

      <div>
        <label>Fecha de finalización:</label>
        <input type="date" value={ends} onChange={handleChangeEnds} required />
      </div>

      <div>
        <label>Duración del curso:</label>
        <input type="text" value={courseDuration} onChange={handleChangeCourseDuration} required />
      </div>

      <div>
        <label>Categoría del curso:</label>
        <select value={courseCategory} onChange={handleChangeCategory} required>
            <option value="">Selecciona una categoía</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Imagen de referencia:</label>
        <input type="file" onChange={cargarimagen} accept="image/*" required />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CourseForm;
