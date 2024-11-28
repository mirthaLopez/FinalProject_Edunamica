import React, { useState, useEffect } from 'react';
import PostCourse from '../Services/Courses/PostCourses';
import GetCategory from '../Services/Categories/GetCategories';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import '../Styles/CourseForm.css';

const CourseForm = () => {
  const [courseImageUrl, setCourseImageUrl] = useState(null);
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

  const handleChangeCourseName = (e) => setCourseName(e.target.value);
  const handleChangeCourseDescription = (e) => setCourseDescription(e.target.value);
  const handleChangeCoursePrice = (e) => setCoursePrice(e.target.value);
  const handleChangeCourseSchedule = (e) => setCourseSchedule(e.target.value);
  const handleChangeBegins = (e) => setBegins(e.target.value);
  const handleChangeEnds = (e) => setEnds(e.target.value);
  const handleChangeCourseDuration = (e) => setCourseDuration(e.target.value);
  const handleChangeCategory = (e) => setCourseCategory(e.target.value);
  const handleChangeCourseObligatoryRequirements = (e) => setCourseObligatoryRequirements(e.target.value);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await GetCategory();
      setCategories(data);
      console.log(data);
    };
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await PostCourse(courseImageUrl, courseName, courseDescription, courseObligatoryRequirements, coursePrice, courseSchedule, begins, ends, courseDuration, courseCategory);
    console.log("Soy la respuesta del server:", data);
    if (!data) {
      console.log("No se obtuvieron datos");
    }
  };

  const cargarimagen = (e) => {
    const file = e.target.files[0];
    setCourseImageUrl(file);
  };

  return (
    <form style={{position: 'absolute', zIndex: 1, top: 0, left: 0}} className="course-form" onSubmit={handleSubmit}>
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
          label="Fecha de inicio"
          variant="outlined"
          type="date"
          value={begins}
          onChange={handleChangeBegins}
          required
          className="course-form__input"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className="course-form__group">
        <TextField
          label="Fecha de finalización"
          variant="outlined"
          type="date"
          value={ends}
          onChange={handleChangeEnds}
          required
          className="course-form__input"
          InputLabelProps={{
            shrink: true,
          }}
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

      <div className="course-form__group">
        <input
          label="Imagen de referencia"
          variant="outlined"
          type="file"
          onChange={cargarimagen}
          required
          className="course-form__input"
          inputProps={{ accept: "image/*" }}
        />
      </div>

      <div className="course-form__group">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          className="course-form__button"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CourseForm;
