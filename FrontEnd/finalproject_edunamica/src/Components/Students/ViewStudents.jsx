import React, { useState, useEffect } from 'react';

//SERVICIOS
import GetStudent from '../../Services/Students/GetStudents'; // obtenemos a los estudiantes 

//ESTILOS CSS
import '../../Styles/Students/ViewStudents.css';

//IMPORT DE LIBRERIA XLSX
import * as XLSX from 'xlsx';

//IMPORTS DE LIBRERIA MUI 
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button'; 


function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
              <TableCell className="view-students-table-header">Student ID</TableCell>
              <TableCell className="view-students-table-header">Nombre</TableCell>
              <TableCell className="view-students-table-header">Primer Apellido</TableCell>
              <TableCell className="view-students-table-header">Segundo Apellido</TableCell>
              <TableCell className="view-students-table-header">Número de teléfono</TableCell>
              <TableCell className="view-students-table-header">Correo Electrónico</TableCell>
              <TableCell className="view-students-table-header">Copia del ID</TableCell>
              <TableCell className="view-students-table-header">Dirección</TableCell>
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
                <TableCell>{student.student_id_url}</TableCell>
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

    </div>
  );
}

export default ViewStudents;