import React, { useState, useEffect } from 'react';
import GetStudent from '../../Services/Students/GetStudents';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ViewStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await GetStudent();
      setStudents(studentData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Primer Apellido</TableCell>
              <TableCell>Segundo Apellido</TableCell>
              <TableCell>Número de teléfono</TableCell>
              <TableCell>Correo Electrónico</TableCell>
              <TableCell>Copia del ID</TableCell>
              <TableCell>Dirección</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
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
