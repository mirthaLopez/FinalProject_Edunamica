import React, { useState, useEffect } from 'react';
import PostCourse from '../Services/Courses/PostCourses';
import GetCategory from '../Services/Categories/GetCategories';
import '../Styles/CourseForm.css'

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
    <form className="course-form" onSubmit={handleSubmit}>
      <div className="course-form__group">
        <label className="course-form__label">Nombre del curso:</label>
        <input className="course-form__input" type="text" value={courseName} onChange={handleChangeCourseName} required />
      </div>

      <div className="course-form__group">
        <label className="course-form__label">Descripción del curso:</label>
        <textarea className="course-form__textarea" value={courseDescription} onChange={handleChangeCourseDescription} required />
      </div>

      <div className="course-form__group">
        <label className="course-form__label">Añade los requisitos separados por coma:</label>
        <input className="course-form__input" type="text" value={courseObligatoryRequirements} onChange={handleChangeCourseObligatoryRequirements} placeholder="Requisito 1, Requisito 2, Requisito 3" />
      </div>

      <div className="course-form__group">
        <label className="course-form__label">Precio del curso:</label>
        <input className="course-form__input" type="number" value={coursePrice} onChange={handleChangeCoursePrice} required />
      </div>

      <div className="course-form__group">
        <label className="course-form__label">Horario:</label>
        <input className="course-form__input" type="text" value={courseSchedule} onChange={handleChangeCourseSchedule} required />
      </div>

      <div className="course-form__group">
        <label className="course-form__label">Fecha de inicio:</label>
        <input className="course-form__input" type="date" value={begins} onChange={handleChangeBegins} required />
      </div>

      <div className="course-form__group">
        <label className="course-form__label">Fecha de finalización:</label>
        <input className="course-form__input" type="date" value={ends} onChange={handleChangeEnds} required />
      </div>

      <div className="course-form__group">
        <label className="course-form__label">Duración del curso:</label>
        <input className="course-form__input" type="text" value={courseDuration} onChange={handleChangeCourseDuration} required />
      </div>

      <div className="course-form__group">
        <label className="course-form__label">Categoría del curso:</label>
        <select className="course-form__select" value={courseCategory} onChange={handleChangeCategory} required>
          <option value="">Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <div className="course-form__group">
        <label className="course-form__label">Imagen de referencia:</label>
        <input className="course-form__input" type="file" onChange={cargarimagen} accept="image/*" required />
      </div>

      <div className="course-form__group">
        <button className="course-form__button" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CourseForm;

