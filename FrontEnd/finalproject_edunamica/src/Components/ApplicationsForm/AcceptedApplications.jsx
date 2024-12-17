import React, { useState, useEffect } from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext'; 

// SERVICIOS
import GetRegisterForm from '../../Services/ApplicationForm/GetRegisterForm'; // obtenemos datos de prematrícula 
import GetPayments from '../../Services/Payments/GetPayments'; // obtenemos información de pago 

// ESTILOS CSS
import '../../Styles/ApplicationsForm/AcceptedApplications.css';

// IMPORTS DE LIBRERÍA MUI 
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Accordion, AccordionDetails, AccordionSummary, TextField, InputAdornment } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Search as SearchIcon } from '@mui/icons-material';

function AcceptedApplications() {

  // Estado local para manejar las solicitudes, pagos, modal y búsqueda
  const [applications, setApplications] = useState([]); // Almacena las solicitudes aceptadas
  const [payments, setPayments] = useState([]); // Almacena los pagos correspondientes a las solicitudes
  const [openModal, setOpenModal] = useState(false); // Estado que maneja la visibilidad del modal de imagen
  const [selectedImage, setSelectedImage] = useState(''); // Almacena la URL de la imagen seleccionada
  const [expanded, setExpanded] = useState(false); // Controla qué acordeón está expandido
  const [searchTerm, setSearchTerm] = useState(''); // Almacena el término de búsqueda del usuario
  const { setAuthData } = useAuth(); // Usamos el contexto de autenticación

  // useEffect para obtener las solicitudes y pagos al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      // Obtener las solicitudes aceptadas
      const acceptedData = await GetRegisterForm();
      setApplications(acceptedData);

      // Obtener los pagos realizados
      const paymentData = await GetPayments();
      setPayments(paymentData);
    };
    fetchData();
  }, []); 

  // Función para manejar el cambio de expansión de un acordeón
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Expande o colapsa el acordeón correspondiente
  };

  // Función para actualizar el término de búsqueda cuando el usuario lo cambia
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para manejar el clic en una imagen y abrir el modal
  const handleImageClick = (url) => {
    setSelectedImage(url); // Asigna la URL de la imagen seleccionada
    setOpenModal(true); // Abre el modal para ver la imagen
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false); // Cierra el modal
  };

  // Filtrar solicitudes aceptadas (estado = 2) y agregar la información de pago correspondiente
  const filteredApplications = applications
    .filter((application) => application.student_status_fk === 2) // Solo solicitudes con estado de aceptación
    .map((application) => {
      // Buscar el pago correspondiente (si existe) comparando el payment_fk de la solicitud con el id del pago
      const payment = payments.find(payment => payment.id === application.payment_fk);
      return { ...application, payment };  // Incluir el pago en la solicitud
    });

  return (
    <div className="accepted-applications-container">
      <h1
        style={{
          fontFamily: "'Bebas Neue', sans-serif", // Fuente personalizada para el título
          color: 'rgb(0, 43, 100)', // Color de texto del título
          fontSize: '40px',  // Tamaño de fuente más grande
          padding: '10px', // Padding alrededor del título
          textAlign: 'center', // Centrado del título
        }}
      >
        Solicitudes Aceptadas
      </h1>

      {/* Campo de búsqueda con icono */}
      <div className="search-container">
        <TextField
          label="Buscar por nombre o identificación"
          value={searchTerm} 
          onChange={handleSearchChange} 
          variant="outlined" 
          fullWidth 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon /> {/* Icono de búsqueda */}
              </InputAdornment>
            ),
          }}
          className="search-input" 
        />
      </div>

      {/* Acordeón para mostrar las solicitudes aceptadas filtradas */}
      {filteredApplications.length > 0 ? (
        filteredApplications
          .filter((application) =>
            application.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtrar por nombre
            application.identification_number.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por identificación
          ) // Filtrar solicitudes por búsqueda
          .map((application) => (
            <Accordion
              key={application.id} // Usamos el id único de cada solicitud
              expanded={expanded === application.id} 
              onChange={handleAccordionChange(application.id)} 
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />} 
                aria-controls={`panel${application.id}-content`} 
                id={`panel${application.id}-header`} 
              >
                <div>
                  <strong>{`${application.name} ${application.first_last_name} ${application.second_last_name}`}</strong> {/* Nombre completo */}
                  <p>{application.identification_number}</p> 
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="application-container">
                  <table className="application-table">
                    <tbody>
                      {/* Información de la solicitud (dirección, fecha de nacimiento, etc.) */}
                      <tr>
                        <td className="table-cell"><strong>Dirección:</strong></td>
                        <td className="table-cell">{application.address}</td>
                      </tr>
                      <tr>
                        <td className="table-cell"><strong>Fecha de Nacimiento:</strong></td>
                        <td className="table-cell">{application.birth_date}</td>
                      </tr>
                      <tr>
                        <td className="table-cell"><strong>Correo:</strong></td>
                        <td className="table-cell">{application.email}</td>
                      </tr>
                      <tr>
                        <td className="table-cell"><strong>Teléfono:</strong></td>
                        <td className="table-cell">{application.phone_number}</td>
                      </tr>
                      {/* Imagen de la identificación */}
                      <tr>
                        <td className="table-cell"><strong>Identificación:</strong></td>
                        <td className="table-cell">
                          <img
                            src={application.identification_image_url} 
                            alt="Imagen de Identificación" 
                            className="table-image" 
                            onClick={() => handleImageClick(application.identification_image_url)}
                          />
                        </td>
                      </tr>
                      {/* Información sobre el pago */}
                      <tr>
                        <td className="table-cell"><strong>Pago Realizado:</strong></td>
                        <td className="table-cell">
                          {application.payment ? (
                            <>
                              <p><strong>Fecha:</strong> {application.payment.payment_date}</p> {/* Fecha de pago */}
                              <p><strong>Monto:</strong> ₡{application.payment.payment_amount}</p> {/* Monto pagado */}
                              <img
                                src={application.payment.payment_receipt_url} 
                                alt="Recibo de Pago"
                                className="table-image" 
                                onClick={() => handleImageClick(application.payment.payment_receipt_url)} 
                              />
                            </>
                          ) : (
                            <p>Curso Gratuito</p> // Si no hay pago, mostrar que el curso es gratuito
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
      ) : (
        <p>No se encontraron solicitudes aceptadas</p> // Mensaje si no hay solicitudes aceptadas
      )}

      {/* Modal para ver la imagen en detalle */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Imagen de Identificación o Recibo</DialogTitle>
        <DialogContent>
          <img
            src={selectedImage}
            alt="Imagen de Identificación o Recibo Detallada"
            style={{ width: '100%', maxHeight: 500, objectFit: 'contain' }} 
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

export default AcceptedApplications;