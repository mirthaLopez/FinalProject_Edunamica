import React, { useState, useEffect } from 'react';
import PostCourse from '../Services/Courses/PostCourses';
import GetCategory from '../Services/Categories/GetCategories';
import GetPaymentModality from '../Services/Payments/GetPaymentModalities';
import { TextField, MenuItem, Select, InputLabel, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import '../Styles/CourseForm.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const CourseForm = () => {
  const [courseImageUrl, setCourseImageUrl] = useState(null);
  const [courseImageFile, setCourseImageFile] = useState(null); // Estado para el archivo de imagen
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [courseSchedule, setCourseSchedule] = useState('');
  const [begins, setBegins] = useState('');
  const [ends, setEnds] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [courseObligatoryRequirements, setCourseObligatoryRequirements] = useState('');
  const [categories, setCategories] = useState([]);
  const [modalities, setModalities] = useState([]); // Estado para las modalidades de pago
  const [paymentModality, setPaymentModality] = useState('');
  const [isFreeCourse, setIsFreeCourse] = useState(false); // Estado booleano para determinar si el curso es gratuito

  const notyf = new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } });

  const handleChangeCourseName = (e) => setCourseName(e.target.value);
  const handleChangeCourseDescription = (e) => setCourseDescription(e.target.value);
  const handleChangeCoursePrice = (e) => setCoursePrice(e.target.value);
  const handleChangeCourseSchedule = (e) => setCourseSchedule(e.target.value);
  const handleChangeBegins = (e) => setBegins(e.target.value);
  const handleChangeEnds = (e) => setEnds(e.target.value);
  const handleChangeCourseDuration = (e) => setCourseDuration(e.target.value);
  const handleChangeCategory = (e) => setCourseCategory(e.target.value);
  const handleChangeCourseObligatoryRequirements = (e) => setCourseObligatoryRequirements(e.target.value);

  // Manejador para cuando cambian las opciones del radio button
  const handleFreeCourseChange = (e) => {
    setIsFreeCourse(e.target.value === 'true'); // Cambia el valor booleano
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await GetCategory();
      setCategories(data);
      const dataModality = await GetPaymentModality();
      setModalities(dataModality);
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(courseImageFile);
      
      const data = await PostCourse(
        courseImageFile, courseName, courseDescription, coursePrice, courseSchedule,
        begins, ends, courseDuration, isFreeCourse, courseObligatoryRequirements,
        courseCategory, paymentModality
      );
      console.log("Soy la respuesta del server:", data);

      if (!data) {
        throw new Error('No se obtuvo información');
      }

      notyf.success('Curso agregado exitosamente!');

      // Limpiar el formulario
      setCourseImageUrl(null);
      setCourseImageFile(null);
      setCourseName('');
      setCourseDescription('');
      setCoursePrice('');
      setCourseSchedule('');
      setBegins('');
      setEnds('');
      setCourseDuration('');
      setCourseCategory('');
      setCourseObligatoryRequirements('');
      setPaymentModality('');
      setIsFreeCourse(false);
    } catch (error) {
      console.error("Error en el proceso:", error);
      notyf.error(`Error al agregar el curso`);
    }
  };

  const cargarimagen = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setCourseImageFile(file); // Guarda el archivo para la subida
      setCourseImageUrl(URL.createObjectURL(file)); // Previsualiza la imagen
    } else {
      notyf.error('Por favor, selecciona un archivo de imagen válido.');
    }
  };
  const handleSelectChange = (event) => {
    setPaymentModality(event.target.value); // Establece el valor seleccionado
  };

  return (
    <div style={{backgroundColor:'red'}}>
    <div style={{ position: 'absolute', zIndex: 1, top: 0, left: 0 }} className='create-course-main-div'>
      <div className='main-div-course-form'>
      <div className='title-div-course-form' ><h1>Crear un nuevo curso</h1></div>
      <form className="course-form" onSubmit={handleSubmit}>
        <div className='main-course-form-div'>
        <div>
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

        <div className="course-form__group">
          <TextField
            label="Añade los requisitos separados por coma"
            variant="outlined"
            value={courseObligatoryRequirements}
            onChange={handleChangeCourseObligatoryRequirements}
            className="course-form__input"
          />
        </div>

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

