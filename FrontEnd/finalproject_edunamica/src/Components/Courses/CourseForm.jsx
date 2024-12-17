import React, { useState, useEffect, useRef } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext'; 

// SERVICIOS
import PostCourse from '../../Services/Courses/PostCourses'; // Función para publicar el curso
import GetCategory from '../../Services/Categories/GetCategories'; // Función para obtener las categorías
import GetPaymentModality from '../../Services/Payments/GetPaymentModalities'; // Función para obtener las modalidades de pago

// ESTILOS CSS
import '../../Styles/Courses/CourseForm.css'; 

// IMPORTS DE LIBRERIA MUI
import { TextField, MenuItem, Select, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'; 

// IMPORT DE LIBRERIA NOTYF
import { Notyf } from 'notyf'; 
import 'notyf/notyf.min.css'; 

const CourseForm = () => {
  // ESTADOS
  const [courseImageUrl, setCourseImageUrl] = useState(null); // Estado para la URL de la imagen previsualizada
  const [courseImageFile, setCourseImageFile] = useState(null); // Estado para el archivo de imagen
  const [courseName, setCourseName] = useState(''); // Estado para el nombre del curso
  const [courseDescription, setCourseDescription] = useState(''); // Estado para la descripción del curso
  const [coursePrice, setCoursePrice] = useState(''); // Estado para el precio del curso
  const [courseSchedule, setCourseSchedule] = useState(''); // Estado para el horario del curso
  const [begins, setBegins] = useState(''); // Estado para la fecha de inicio
  const [ends, setEnds] = useState(''); // Estado para la fecha de finalización
  const [courseDuration, setCourseDuration] = useState(''); // Estado para la duración del curso
  const [courseCategory, setCourseCategory] = useState(''); // Estado para la categoría del curso
  const [courseObligatoryRequirements, setCourseObligatoryRequirements] = useState(''); // Estado para los requisitos obligatorios
  const [categories, setCategories] = useState([]); // Estado para las categorías disponibles
  const [modalities, setModalities] = useState([]); // Estado para las modalidades de pago
  const [paymentModality, setPaymentModality] = useState(''); // Estado para la modalidad de pago seleccionada
  const [isFreeCourse, setIsFreeCourse] = useState(false); // Estado booleano para determinar si el curso es gratuito o de pago
  const { setAuthData } = useAuth(); // Usamos el contexto de autenticación

  const notyf = new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } }); // Notificaciones para mostrar mensajes de éxito o error

  // FUNCIONES PARA MANEJAR CAMBIOS EN LOS INPUTS
  const handleChangeCourseName = (e) => setCourseName(e.target.value); // Cambiar el nombre del curso
  const handleChangeCourseDescription = (e) => setCourseDescription(e.target.value); // Cambiar la descripción
  const handleChangeCoursePrice = (e) => setCoursePrice(e.target.value); // Cambiar el precio
  const handleChangeCourseSchedule = (e) => setCourseSchedule(e.target.value); // Cambiar el horario
  const handleChangeBegins = (e) => setBegins(e.target.value); // Cambiar la fecha de inicio
  const handleChangeEnds = (e) => setEnds(e.target.value); // Cambiar la fecha de finalización
  const handleChangeCourseDuration = (e) => setCourseDuration(e.target.value); // Cambiar la duración
  const handleChangeCategory = (e) => setCourseCategory(e.target.value); // Cambiar la categoría
  const handleChangeCourseObligatoryRequirements = (e) => setCourseObligatoryRequirements(e.target.value); // Cambiar los requisitos obligatorios

  // Manejador para cuando cambian las opciones del radio button (Curso Gratis o de Pago)
  const handleFreeCourseChange = (e) => {
    setIsFreeCourse(e.target.value === 'true'); // Establecer el valor booleano (true o false)
  };

  // USEFFECT PARA OBTENER LAS CATEGORÍAS Y MODALIDADES
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await GetCategory(); // Obtener las categorías
      setCategories(data); // Guardar las categorías en el estado
      const dataModality = await GetPaymentModality(); // Obtener las modalidades de pago
      setModalities(dataModality); // Guardar las modalidades en el estado
    };
    fetchCategory();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // FUNCION PARA ENVIAR EL FORMULARIO
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto de recargar la página al enviar el formulario
    try {
      console.log(courseImageFile); // Mostrar el archivo de imagen en la consola

      // Enviar los datos del curso al servidor
      const data = await PostCourse(
        courseImageFile, courseName, courseDescription, coursePrice, courseSchedule,
        begins, ends, courseDuration, isFreeCourse, courseObligatoryRequirements,
        courseCategory, paymentModality
      );
      console.log("Soy la respuesta del server:", data); // Mostrar la respuesta del servidor

      if (!data) {
        throw new Error('No se obtuvo información'); // Si no hay respuesta, lanzar un error
      }

      notyf.success('Curso agregado exitosamente!'); // Notificación de éxito

      // Limpiar el formulario después de enviar
      setCourseImageUrl(null);  // Limpiar la URL de la imagen (previsualización)
      setCourseImageFile(null); // Limpiar el archivo de la imagen
      setCourseName(''); // Limpiar el nombre del curso
      setCourseDescription(''); // Limpiar la descripción
      setCoursePrice(''); // Limpiar el precio
      setCourseSchedule(''); // Limpiar el horario
      setBegins(''); // Limpiar la fecha de inicio
      setEnds(''); // Limpiar la fecha de finalización
      setCourseDuration(''); // Limpiar la duración
      setCourseCategory(''); // Limpiar la categoría
      setCourseObligatoryRequirements(''); // Limpiar los requisitos
      setPaymentModality(''); // Limpiar la modalidad de pago
      setIsFreeCourse(false); // Volver a establecer el curso como de pago por defecto

    } catch (error) {
      console.error("Error en el proceso:", error); // Mostrar el error en la consola
      notyf.error(`Error al agregar el curso`); // Notificación de error
    }
  };

  // FUNCION PARA CARGAR IMAGEN
  const cargarimagen = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    if (file && file.type.startsWith('image/')) { // Verificar que el archivo sea una imagen
      setCourseImageFile(file); // Guardar el archivo de imagen
      setCourseImageUrl(URL.createObjectURL(file)); // Previsualizar la imagen
    } else {
      notyf.error('Por favor, selecciona un archivo de imagen válido.'); // Notificación de error si no es una imagen
    }
  };

  // FUNCION PARA MANEJAR CAMBIO EN SELECT DE MODALIDAD DE PAGO
  const handleSelectChange = (event) => {
    setPaymentModality(event.target.value); // Establecer el valor de la modalidad de pago seleccionada
  };

  return (
    <div style={{backgroundColor:'red'}}>
    <div style={{ position: 'absolute', zIndex: 1, top: 0, left: 0 }} className='create-course-main-div'>
      <div className='main-div-course-form'>
      <div className='title-div-course-form' ><h1>Crear un nuevo curso</h1></div>
      <form className="course-form" onSubmit={handleSubmit}>
        <div className='main-course-form-div'>
        <div>
        {/* Campo para el nombre del curso */}
        <div className="course-form__group">
          <TextField
            label="Nombre del curso"
            variant="outlined"
            value={courseName}
            onChange={handleChangeCourseName}
            required
            className="course-form__input"
          />
        </div>

        {/* Campo para la descripción del curso */}
        <div className="course-form__group">
          <TextField
            label="Descripción del curso"
            variant="outlined"
            multiline
            rows={4}
            value={courseDescription}
            onChange={handleChangeCourseDescription}
            required
            className="course-form__textarea"
          />
        </div>

        {/* Campo para los requisitos obligatorios */}
        <div className="course-form__group">
          <TextField
            label="Añade los requisitos separados por coma"
            variant="outlined"
            value={courseObligatoryRequirements}
            onChange={handleChangeCourseObligatoryRequirements}
            className="course-form__input"
          />
        </div>

        {/* Campo para el precio */}
        <div className="course-form__group">
          <TextField
            label="Precio del curso"
            variant="outlined"
            type="number"
            value={coursePrice}
            onChange={handleChangeCoursePrice}
            required
            className="course-form__input"
          />
        </div>

        {/* Campo para el horario */}
        <div className="course-form__group">
          <TextField
            label="Horario"
            variant="outlined"
            value={courseSchedule}
            onChange={handleChangeCourseSchedule}
            required
            className="course-form__input"
          />
        </div>

        {/* Campo para la duración */}
        <div className="course-form__group">
          <TextField
            label="Duración del curso"
            variant="outlined"
            value={courseDuration}
            onChange={handleChangeCourseDuration}
            required
            className="course-form__input"
          />
        </div>

        {/* Select para elegir la categoría del curso */}
        <div className="course-form__group">
          <FormControl required className="course-form__select">
            <InputLabel id="course-category-label">Categoría del curso</InputLabel>
            <Select
              labelId="course-category-label"
              value={courseCategory}
              onChange={handleChangeCategory}
              label="Categoría del curso"
              className="course-form__select"
            >
              <MenuItem value="">
                <em>Selecciona una categoría</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        </div>
        
        <div>
        {/* Campo para la fecha de inicio */}
        <label htmlFor="">Fecha de Inicio*</label>
        <div className="course-form__group">
          <TextField
            variant="outlined"
            type="date"
            value={begins}
            onChange={handleChangeBegins}
            required
            className="course-form__input"
          />
        </div>

        {/* Campo para la fecha de finalización */}
        <label htmlFor="">Fecha de Finalización*</label>
        <div className="course-form__group">
          <TextField
            variant="outlined"
            type="date"
            value={ends}
            onChange={handleChangeEnds}
            required
            className="course-form__input"
          />
        </div>

        {/* Radio buttons para elegir si el curso es gratis o de pago */}
        <div className="course-form__group">
          <RadioGroup
            value={isFreeCourse ? 'true' : 'false'} // Valor booleano
            onChange={handleFreeCourseChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="Curso Gratis" />
            <FormControlLabel value="false" control={<Radio />} label="Curso de Pago" />
          </RadioGroup>
        </div>

        {/* Mostrar el select de modalidad de pago solo si el curso no es gratuito */}
        {!isFreeCourse && (
          <div className="course-form__group1">
            <InputLabel id="course-category-label">Modalidad de pago</InputLabel>
            <Select
              value={paymentModality}
              onChange={handleSelectChange}
              fullWidth
              className="course-form__select"
            >
              <MenuItem value="">Selecciona una modalidad</MenuItem>
              {modalities.map((modality) => (
                <MenuItem key={modality.id} value={modality.id}>
                  {modality.payment_modality_name}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}

       {/* Campo para cargar imagen */}
       {courseImageUrl && <img src={courseImageUrl} alt="Imagen previsualización" style={{ maxWidth: '200px', marginTop: '10px' }} />}
        <div className="course-form__group">
          <input
            type="file"
            onChange={cargarimagen}
            required
            className="course-form__input"
            accept="image/*"
          />
        </div>
        </div>
        </div>

        {/* Botón para crear el curso */}
        <div className="course-form__group">
          <button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            className="course-form__button"
          >
            Crear curso
          </button>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
};

export default CourseForm;