import React, { useState, useEffect } from 'react';
import GetStudent from '../../Services/Students/GetStudents';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import '../../Styles/Students/ViewStudents.css';

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

  return (
<div
  className="view-students-container"
  style={{
    margin: '20px',
    padding: '10px',
    width: '78%',
    marginLeft: '310px',
    ...(window.innerWidth <= 768 && {
      marginLeft: '20px',  // Ajuste para pantallas pequeñas
      width: '100%'        // Ajuste para pantallas pequeñas
    })
  }}
>
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
  sx={{
    padding: '20px',
    width: '70%',
    marginBottom: '20px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginRight: '350px'
  }}
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
    </div>
  );
}

export default ViewStudents;

