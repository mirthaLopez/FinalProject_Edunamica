import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

//SERVICIOS
import GetStudent from '../../Services/Students/GetStudents'; // obtenemos a los estudiantes 

//ESTILOS CSS
import '../../Styles/Students/ViewStudents.css';

//IMPORT DE LIBRERIA XLSX
import * as XLSX from 'xlsx';

//IMPORTS DE LIBRERIA MUI 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
 
  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
  
  useEffect(() => {
    const fetchData = async () => {
      const studentData = await GetStudent();
      setStudents(studentData);
    };
    fetchData();
  }, []);

  // Filtra los estudiantes por nombre o identificación
  const filteredStudents = students.filter((student) =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toString().includes(searchTerm)
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para abrir el modal
  const handleOpenModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true); // Abrir el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false); // Cerrar el modal
    setSelectedImage(null); // Limpiar la imagen seleccionada
  };

  // Función para exportar la tabla a Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(students);   // Convierte los datos a una hoja de Excel
    const wb = XLSX.utils.book_new();               // Crea un nuevo libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');  // Agrega la hoja de datos al libro de trabajo

    // Exporta el libro de trabajo a un archivo Excel
    XLSX.writeFile(wb, 'tabla_de_datos.xlsx');
  };

  return (
    <div className="view-students-container">
      {/* Campo de búsqueda */}
      <TextField
        label="Buscar por nombre o identificación"
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className="view-students-search-input"
      />

      {/* Tabla de estudiantes */}
      <TableContainer component={Paper} className="view-students-table-container">
        <Table className="view-students-table">
          <TableHead>
            <TableRow>
            <TableCell className="view-students-table-header" style={{ fontWeight: 'bold', textAlign: 'center' }}>Student ID</TableCell>
            <TableCell className="view-students-table-header" style={{ fontWeight: 'bold', textAlign: 'center' }}>Nombre</TableCell>
            <TableCell className="view-students-table-header" style={{ fontWeight: 'bold', textAlign: 'center' }}>Primer Apellido</TableCell>
            <TableCell className="view-students-table-header" style={{ fontWeight: 'bold', textAlign: 'center' }}>Segundo Apellido</TableCell>
            <TableCell className="view-students-table-header" style={{ fontWeight: 'bold', textAlign: 'center' }}>Número de teléfono</TableCell>
            <TableCell className="view-students-table-header" style={{ fontWeight: 'bold', textAlign: 'center' }}>Correo Electrónico</TableCell>
            <TableCell className="view-students-table-header" style={{ fontWeight: 'bold', textAlign: 'center' }}>Copia del ID</TableCell>
            <TableCell className="view-students-table-header" style={{ fontWeight: 'bold', textAlign: 'center' }}>Dirección</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id} className="view-students-table-row">
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.student_name}</TableCell>
                <TableCell>{student.student_first_last_name}</TableCell>
                <TableCell>{student.student_second_last_name}</TableCell>
                <TableCell>{student.student_phone_number}</TableCell>
                <TableCell>{student.student_email}</TableCell>
                <TableCell>
                  <img 
                    src={student.student_id_url} 
                    alt="Copia del ID" 
                    style={{ width: '50px', height: 'auto', cursor: 'pointer' }} // Añadir cursor para indicar que es clickeable
                    onClick={() => handleOpenModal(student.student_id_url)} // Maneja el clic en la imagen
                  />
                </TableCell>
                <TableCell>{student.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botón de MUI para exportar a Excel */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={exportToExcel}
      >
        Exportar a Excel
      </Button>

      {/* Modal para ver la imagen en grande */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>
          <IconButton edge="start" color="inherit" onClick={handleCloseModal} aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img 
            src={selectedImage} 
            alt="Imagen del ID" 
            style={{ width: '100%', height: 'auto' }} // Asegúrate de que la imagen se ajuste al tamaño
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default ViewStudents;
