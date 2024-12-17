import React, { useState, useEffect } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

//SERVICIOS
import GetAdmin from '../../Services/Administrators/GetAdministrators';
import DeleteAdministrator from '../../Services/Administrators/DeleteAdministrator';

//ESTILOS CSS
import '../../Styles/Administration/ViewAdmin.css';

//IMPORTS DE LIBRERIA MUI
import { TextField, InputAdornment, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, IconButton } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search'; // Icono de búsqueda
import DeleteIcon from '@mui/icons-material/Delete'; // Icono de eliminar

function ViewAdmin() {

    // Estado local para almacenar los administradores y el término de búsqueda
    const [admin, setAdmin] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
  
    // useEffect para obtener los administradores cuando el componente se monta
    useEffect(() => {
        const fetchData = async () => {
            const adminData = await GetAdmin(); // Llamamos al servicio para obtener los administradores
            setAdmin(adminData); // Guardamos los administradores en el estado
        };
        fetchData(); // Ejecutamos la función fetchData
    }, []); // El array vacío asegura que esto solo se ejecute una vez, al montar el componente

    // Filtrar los administradores según el término de búsqueda
    const filteredAdmin = admin.filter((admin) =>
        admin.admin_name.toLowerCase().includes(searchTerm.toLowerCase()) // Compara el nombre del administrador con el término de búsqueda
    );

    // Función para manejar el cambio en el campo de búsqueda
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Actualiza el término de búsqueda
    };

    // Función para manejar la eliminación de un administrador
    const handleDelete = async (id) => {
        try {
            // Llamamos al servicio para eliminar el administrador
            await DeleteAdministrator(id);

            // Actualizamos el estado de los administradores para reflejar el cambio
            setAdmin(admin.filter(admin => admin.id !== id));

            console.log("Administrador eliminado con éxito");
        } catch (error) {
            console.error("Error al eliminar el administrador:", error);
        }
    };

    return (
        <div className="view-admin-container">
            {/* Campo de búsqueda */}
            <TextField
                label="Buscar por nombre o correo electrónico"
                value={searchTerm} 
                onChange={handleSearchChange} 
                variant="outlined"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon /> {/* Icono de búsqueda al principio del campo de texto */}
                        </InputAdornment>
                    ),
                }}
                className="view-admin-search-input"
                sx={{
                    padding: '10px',
                    width: '60%',
                    marginBottom: '20px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    marginRight: '20px',
                    fontSize: '14px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                    },
                    '& .MuiInputAdornment-root': {
                        color: '#5f6368',
                    }
                }}
            />

            {/* Tabla de administradores */}
            <TableContainer component={Paper} sx={{ borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* Cabeceras de las columnas */}
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#3c3c3c', padding: '15px' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#3c3c3c', padding: '15px' }}>Correo Electrónico</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#3c3c3c', padding: '15px' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Mapear los administradores filtrados y mostrarlos en las filas de la tabla */}
                        {filteredAdmin.map((admin) => (
                            <TableRow key={admin.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                <TableCell sx={{ padding: '10px', fontSize: '14px', color: '#555' }}>{admin.admin_name}</TableCell>
                                <TableCell sx={{ padding: '10px', fontSize: '14px', color: '#555' }}>{admin.admin_email}</TableCell>
                                <TableCell sx={{ padding: '10px', textAlign: 'center' }}>
                                    {/* Botón de eliminar */}
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(admin.id)} // Llama a la función handleDelete cuando se hace clic
                                        aria-label="eliminar"
                                        sx={{
                                            '&:hover': { backgroundColor: '#f44336', color: 'white' },
                                            padding: '8px',
                                        }}
                                    >
                                        <DeleteIcon /> {/* Icono de eliminar */}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ViewAdmin;