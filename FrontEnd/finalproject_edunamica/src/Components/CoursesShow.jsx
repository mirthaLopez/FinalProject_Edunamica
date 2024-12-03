import React, { useState, useEffect } from 'react';
import GetCourses from '../Services/Courses/GetCourses';
import SearchIcon from '@mui/icons-material/Search';
import '../Styles/CoursesShow.css';
import DeleteCourse from '../Services/Courses/DeleteCourses';
import UpdateCourse from '../Services/Courses/UpdateCourses';
import Swal from 'sweetalert2';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

function CoursesShow() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await GetCourses();
        setCourses(coursesData);
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
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentCourse(null);
    setNewImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCourse({
      ...currentCourse,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleSaveChanges = async () => {
    try {
      // Usar la imagen actual si no hay nueva imagen seleccionada
      let updatedImageUrl = currentCourse.course_image_url;

      if (newImage) {
        const result = await UpdateCourse.uploadImageToS3(newImage);
        updatedImageUrl = result.Location;
      }

      const updatedCourse = await UpdateCourse(
        currentCourse.id,
        updatedImageUrl,  // Usar la URL de la imagen (nueva o actual)
        currentCourse.course_name,
        currentCourse.course_description,
        currentCourse.course_price,
        currentCourse.course_schedule,
        currentCourse.begins,
        currentCourse.ends,
        currentCourse.course_duration,
        currentCourse.course_category
      );

      if (updatedCourse) {
        Swal.fire({
          title: "Curso actualizado!",
          text: "Los cambios se han guardado con éxito.",
          icon: "success"
        });

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

    handleCloseModal();
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

                <div>
                  <button onClick={() => handleEditClick(course)}>EDITAR</button>
                  <button onClick={() => deleteCourse(course.id)}>ELIMINAR</button>
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
                label="Precio"
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
                label="Fecha de inicio"
                name="begins"
                value={currentCourse.begins || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Fecha de fin"
                name="ends"
                value={currentCourse.ends || ''}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default CoursesShow;