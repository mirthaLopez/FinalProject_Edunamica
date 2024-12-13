import React, {useState, useEffect} from 'react';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

//SERVICIOS
import GetCourses from '../../Services/Courses/GetCourses';
import GetCategory from '../../Services/Categories/GetCategories';
import GetPaymentModality from '../../Services/Payments/GetPaymentModalities';
import DeleteCourse from '../../Services/Courses/DeleteCourses';
import UpdateCourse from '../../Services/Courses/UpdateCourses';

//ESTILOS CSS
import '../../Styles/Courses/CoursesShow.css';

//IMPORTS DE LIBRERIA MUI
import SearchIcon from '@mui/icons-material/Search';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';

//IMPORT DE LIBRERIA SWEET ALERT
import Swal from 'sweetalert2';


function CoursesShow() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [isFreeCourse, setIsFreeCourse] = useState(false);  // Añadido para controlar si el curso es gratuito
  const [paymentModality, setPaymentModality] = useState(""); // Modalidad de pago seleccionada
  const [courseObligatoryRequirements, setCourseObligatoryRequirements] = useState(""); // Requisitos del curso
  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await GetCourses();
        setCourses(coursesData);

        const data = await GetCategory();
        setCategories(data);

        const dataModality = await GetPaymentModality();
        setModalities(dataModality);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchData();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
    }).format(price);
  };

  const deleteCourse = async (courseId) => {
    try {
      Swal.fire({
        title: "Estás seguro?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminalo!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await DeleteCourse(courseId);
          Swal.fire({
            title: "Eliminado!",
            text: "El curso ha sido eliminado con éxito!",
            icon: "success",
          });
          setCourses(courses.filter(course => course.id !== courseId));
        }
      });
    } catch (error) {
      console.error("No se pudo eliminar el curso:", error);
      Swal.fire({
        title: "Error!",
        text: "Hubo un error al eliminar el curso",
        icon: "error",
      });
    }
  };

  const handleEditClick = (course) => {
    setCurrentCourse(course);
    setNewImage(null);
    setIsFreeCourse(course.is_free); // Establece el estado de si es gratis
    setPaymentModality(course.payment_modality_fk || ""); // Establece la modalidad de pago seleccionada
    setCourseObligatoryRequirements(course.obligatory_requirements || ""); // Establece los requisitos obligatorios
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentCourse(null);
    setNewImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (currentCourse) {
      setCurrentCourse({
        ...currentCourse,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleSaveChanges = async () => {
    try {
      // Validación de que currentCourse y newImage están presentes
      if (!currentCourse) {
        console.log("faltan datos");
        Swal.fire({
          title: "Error!",
          text: "Faltan datos para actualizar el curso.",
          icon: "error"
        });
        return;
      }

      // Opcional: Actualiza la URL de la imagen si es necesario
      let updatedImageUrl = newImage ? newImage : currentCourse.course_image_url;

      // Llamada a la función de actualización
      const updatedCourse = await UpdateCourse(currentCourse.id, currentCourse, updatedImageUrl);

      if (updatedCourse) {
        Swal.fire({
          title: "Curso actualizado!",
          text: "Los cambios se han guardado con éxito.",
          icon: "success"
        });

        // Actualiza la lista de cursos
        setCourses(courses.map(course => 
          course.id === updatedCourse.id ? updatedCourse : course
        ));

      } else {
        Swal.fire({
          title: "Error!",
          text: "Hubo un problema al actualizar el curso.",
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      Swal.fire({
        title: "Error!",
        text: "Hubo un problema al guardar los cambios.",
        icon: "error"
      });
    }

    // Cierra el modal
    handleCloseModal();
  };

  const handleFreeCourseChange = (e) => {
    setIsFreeCourse(e.target.value === 'true');
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setCurrentCourse({
      ...currentCourse,
      course_category_fk: value,
    });
  };

  const handlePaymentModalityChange = (e) => {
    const { value } = e.target;
    setPaymentModality(value);
    setCurrentCourse({
      ...currentCourse,
      payment_modality_fk: value,  // Actualiza el estado para el curso
    });
  };

  const handleRequirementsChange = (e) => {
    const { value } = e.target;
    setCourseObligatoryRequirements(value);
    setCurrentCourse({
      ...currentCourse,
      obligatory_requirements: value,  // Actualiza los requisitos
    });
  };

  return (
    <div>
      <div className="show-course-search">
        <input
          type="search"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="show-course-search-icon" />
      </div>

      <div className="show-course-list">
        {filteredCourses.map(course => (
          <div className="show-course-card" key={course.id}>
            <img src={course.course_image_url} alt={course.course_name} className="show-course-image" />
            <div className="show-course-info">
              <h3 className="show-course-title">{course.course_name}</h3>
              <p className="show-course-description">{course.course_description}</p>
              <div className="show-course-meta">
                <span className="show-course-price">
                  Precio: {formatPrice(course.course_price)}
                </span>
                <span className="show-course-schedule">Horario: {course.course_schedule}</span>
                <span className="show-course-duration">Duración: {course.course_duration}</span>
                <span className="show-course-dates">Inicio: {course.begins} - Fin: {course.ends}</span>

                <div className='divEditButtons'>
                  <button className="btn-edit" onClick={() => handleEditClick(course)}>EDITAR</button>
                  <button className="btn-delete" onClick={() => deleteCourse(course.id)}>ELIMINAR</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentCourse && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Editar Curso</DialogTitle>
          <DialogContent>
            <div style={{ marginTop: '20px' }}>
              <img
                src={currentCourse.course_image_url}
                alt="Imagen actual del curso"
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {newImage && (
                <div style={{ marginTop: '10px' }}>
                  <img src={URL.createObjectURL(newImage)} alt="Nueva imagen" style={{ width: '100px', height: 'auto' }} />
                </div>
              )}
              <TextField
                label="Nombre del curso"
                name="course_name"
                value={currentCourse.course_name || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Descripción del curso"
                name="course_description"
                value={currentCourse.course_description || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Precio del curso"
                name="course_price"
                value={currentCourse.course_price || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Horario"
                name="course_schedule"
                value={currentCourse.course_schedule || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Duración"
                name="course_duration"
                value={currentCourse.course_duration || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Requisitos Obligatorios"
                value={courseObligatoryRequirements || ''}
                onChange={handleRequirementsChange}
                fullWidth
                margin="normal"
              />
              <InputLabel>Selecciona una categoría</InputLabel>
              <Select
                value={currentCourse.course_category_fk || ''}
                onChange={handleCategoryChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>Selecciona una categoría</em>
                </MenuItem>
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>

              <RadioGroup
                value={isFreeCourse ? 'true' : 'false'}
                onChange={handleFreeCourseChange}
              >
                <FormControlLabel value="true" control={<Radio />} label="Curso Gratis" />
                <FormControlLabel value="false" control={<Radio />} label="Curso de Pago" />
              </RadioGroup>

              {!isFreeCourse && (
                <div className="course-form__group1">
                  <InputLabel>Modalidad de pago</InputLabel>
                  <Select
                    value={paymentModality || ''}
                    onChange={handlePaymentModalityChange}
                    fullWidth
                  >
                    <MenuItem value="">Selecciona una modalidad</MenuItem>
                    {modalities.map(modality => (
                      <MenuItem key={modality.id} value={modality.id}>
                        {modality.payment_modality_name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Guardar cambios
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default CoursesShow;
