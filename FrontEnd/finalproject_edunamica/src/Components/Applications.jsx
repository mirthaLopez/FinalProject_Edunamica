import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GetRegisterForm from '../Services/ApplicationForm/GetRegisterForm';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [expanded, setExpanded] = useState(false); // Estado para controlar el acordeón expandido
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedImage, setSelectedImage] = useState(''); // Estado para almacenar la imagen seleccionada

  // Fetch applications data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const applicationsData = await GetRegisterForm();
      setApplications(applicationsData);
    };
    fetchData();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Cambia el estado cuando el acordeón se expanda o cierre
  };

  // Función para manejar el clic en la imagen y abrir el modal
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true); // Abre el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(''); // Limpia la imagen seleccionada
  };

  return (
    <div>
     <Typography variant="h5"><strong>Solicitudes pendientes de aprobación:</strong></Typography>

      {applications.map((data) => (
        <Accordion
          key={data.id}
          expanded={expanded === data.id} // Establece si el acordeón debe estar expandido
          onChange={handleChange(data.id)} // Maneja el cambio de expansión
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${data.id}-content`}
            id={`panel-${data.id}-header`}
          >
            <Typography variant="h6">{data.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <strong>Nombre:</strong> {data.name} {data.first_last_name} {data.second_last_name}
            </Typography>
            <Typography variant="body1"><strong>Dirección:</strong> {data.address}</Typography>
            <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {data.birth_date}</Typography>
            <Typography variant="body1"><strong>Correo:</strong> {data.email}</Typography>
            <Typography variant="body1"><strong>Teléfono:</strong> {data.phone_number}</Typography>

            {/* Mostrar la imagen pequeña de la identificación y añadir el manejador de clic */}
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              <strong>Identificación:</strong>
            </Typography>
            <img
              src={data.identification_image_url}
              alt="Imagen de Identificación"
              style={{ width: 100, height: 'auto', marginTop: 8, cursor: 'pointer' }}
              onClick={() => handleImageClick(data.identification_image_url)} // Maneja el clic en la imagen
            />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              <strong>Número de Identificación:</strong> {data.identification_number}
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <Button variant="contained" color="primary">Aceptar</Button>
            <Button variant="outlined" color="secondary">Rechazar</Button>
          </AccordionActions>
        </Accordion>
      ))}

      {/* Modal para ver la imagen en detalle */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Imagen de Identificación</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Imagen de Identificación Detallada"
            style={{ width: '100%', maxHeight: 500, objectFit: 'contain' }} // Ajusta el tamaño de la imagen
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

export default Applications;







