import React, {useState, useEffect} from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext'; 

// SERVICIOS
import GetCourses from '../../Services/Courses/GetCourses'; // Importa el servicio para obtener cursos
import GetCategory from '../../Services/Categories/GetCategories'; // Importa el servicio para obtener categorías
import GetPaymentModality from '../../Services/Payments/GetPaymentModalities'; // Importa el servicio para obtener modalidades de pago
import DeleteCourse from '../../Services/Courses/DeleteCourses'; // Importa el servicio para eliminar un curso
import UpdateCourse from '../../Services/Courses/UpdateCourses'; // Importa el servicio para actualizar un curso

// ESTILOS CSS
import '../../Styles/Courses/CoursesShow.css'; 

// IMPORTS DE LIBRERIA MUI
import SearchIcon from '@mui/icons-material/Search'; // Importa el ícono de búsqueda
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material'; // Importa componentes de Material-UI para formularios y modales

// IMPORT DE LIBRERIA SWEET ALERT
import Swal from 'sweetalert2'; 

function CoursesShow() {
  // Estados para manejar los datos y las interacciones en el componente
  const [courses, setCourses] = useState([]); // Lista de cursos
  const [searchQuery, setSearchQuery] = useState(''); // Filtro de búsqueda
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura del modal de edición
  const [currentCourse, setCurrentCourse] = useState(null); // Curso actualmente seleccionado para edición
  const [newImage, setNewImage] = useState(null); // Imagen nueva para el curso (si se cambia)
  const [categories, setCategories] = useState([]); // Lista de categorías de cursos
  const [modalities, setModalities] = useState([]); // Modalidades de pago disponibles
  const [isFreeCourse, setIsFreeCourse] = useState(false);  // Determina si el curso es gratuito
  const [paymentModality, setPaymentModality] = useState(""); // Modalidad de pago seleccionada
  const [courseObligatoryRequirements, setCourseObligatoryRequirements] = useState(""); // Requisitos obligatorios del curso
  const { setAuthData } = useAuth(); // Contexto de autenticación

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

  // Filtra los cursos basados en la búsqueda
  const filteredCourses = courses.filter(course =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para formatear el precio en formato de moneda
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
    }).format(price);
  };

  // Función para eliminar un curso, con confirmación por parte del usuario
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
          setCourses(courses.filter(course => course.id !== courseId)); // Actualiza la lista de cursos
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

  // Función que se ejecuta cuando se hace clic en el botón de editar para un curso
  const handleEditClick = (course) => {
    setCurrentCourse(course); // Establece el curso actual que se va a editar
    setNewImage(null); // Resetea la imagen nueva
    setIsFreeCourse(course.is_free); // Establece si el curso es gratuito o no
    setPaymentModality(course.payment_modality_fk || ""); // Establece la modalidad de pago
    setCourseObligatoryRequirements(course.obligatory_requirements || ""); // Establece los requisitos obligatorios
    setOpenModal(true); // Abre el modal de edición
  };

  // Función para cerrar el modal de edición
  const handleCloseModal = () => {
    setOpenModal(false); // Cierra el modal
    setCurrentCourse(null); // Resetea el curso seleccionado
    setNewImage(null); // Resetea la imagen seleccionada
  };

  // Función para manejar cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (currentCourse) {
      setCurrentCourse({
        ...currentCourse,
        [name]: value // Actualiza el estado del curso con los cambios del formulario
      });
    }
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtiene el archivo seleccionado
    setNewImage(file); // Establece la nueva imagen
  };

  // Función para guardar los cambios en un curso
  const handleSaveChanges = async () => {
    try {
      // Verifica si se tiene un curso seleccionado
      if (!currentCourse) {
        console.log("faltan datos");
        Swal.fire({
          title: "Error!",
          text: "Faltan datos para actualizar el curso.",
          icon: "error" // Muestra alerta de error si faltan datos
        });
        return;
      }

      // Si hay una nueva imagen, se usa en la actualización
      let updatedImageUrl = newImage ? newImage : currentCourse.course_image_url;

      // Llama a la función de actualización de curso
      const updatedCourse = await UpdateCourse(currentCourse.id, currentCourse, updatedImageUrl);

      if (updatedCourse) { // Si la actualización fue exitosa
        Swal.fire({
          title: "Curso actualizado!", 
          text: "Los cambios se han guardado con éxito.",
          icon: "success",
        });

        // Actualiza la lista de cursos con los nuevos datos
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

    handleCloseModal(); // Cierra el modal después de guardar los cambios
  };

  // Función para manejar el cambio en si el curso es gratuito o no
  const handleFreeCourseChange = (e) => {
    setIsFreeCourse(e.target.value === 'true'); // Actualiza si el curso es gratuito según el valor del radio
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setCurrentCourse({
      ...currentCourse,
      course_category_fk: value, // Actualiza la categoría del curso
    });
  };

  // Función para manejar el cambio de modalidad de pago
  const handlePaymentModalityChange = (e) => {
    const { value } = e.target;
    setPaymentModality(value); // Actualiza la modalidad de pago seleccionada
    setCurrentCourse({
      ...currentCourse,
      payment_modality_fk: value,  // Actualiza la modalidad de pago del curso
    });
  };

  // Función para manejar el cambio en los requisitos obligatorios
  const handleRequirementsChange = (e) => {
    const { value } = e.target;
    setCourseObligatoryRequirements(value); // Actualiza los requisitos obligatorios
    setCurrentCourse({
      ...currentCourse,
      obligatory_requirements: value,  // Actualiza los requisitos obligatorios del curso
    });
  };

  return (
    <div>
      {/* Barra de búsqueda de cursos */}
      <div className="show-course-search">
        <input
          type="search"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <SearchIcon className="show-course-search-icon" />
      </div>

      {/* Lista de cursos filtrada */}
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
                  <button className="btn-edit" onClick={() => handleEditClick(course)}>EDITAR</button> {/* Botón para editar */}
                  <button className="btn-delete" onClick={() => deleteCourse(course.id)}>ELIMINAR</button> {/* Botón para eliminar */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de edición de curso */}
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
                onChange={handleImageChange} // Maneja el cambio de imagen
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
                onChange={handleInputChange} // Maneja el cambio de texto
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

              {/* Si el curso no es gratuito, muestra la modalidad de pago */}
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