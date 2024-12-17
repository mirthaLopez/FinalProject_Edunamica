import React, {useState, useEffect} from 'react';

// IMPORTAMOS EL CONTEXTO
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

// SERVICIOS
import GetRegisterForm from '../../Services/ApplicationForm/GetRegisterForm'; // obtenemos datos de prematrícula 
import GetPayments from '../../Services/Payments/GetPayments'; // obtenemos informacion de pago 

// ESTILOS CSS
import '../../Styles/ApplicationsForm/RejectedApplications.css';

// IMPORTS DE LIBRERIA MUI 
import {Dialog, DialogActions, DialogContent, DialogTitle, Button, Accordion, AccordionSummary, AccordionDetails, TextField, InputAdornment} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Search as SearchIcon } from '@mui/icons-material';

function RejectedApplications() {
  
  // Definición de estados para manejar datos y acciones
  const [applications, setApplications] = useState([]); // Almacena las solicitudes de registro
  const [payments, setPayments] = useState([]); // Almacena los pagos realizados
  const [openModal, setOpenModal] = useState(false); // Controla la apertura del modal para imágenes
  const [selectedImage, setSelectedImage] = useState(''); // Almacena la URL de la imagen seleccionada
  const [expanded, setExpanded] = useState(false); // Controla qué acordeón está expandido
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
  
  // useEffect para cargar los datos iniciales al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      const rejectedData = await GetRegisterForm(); // Llamada para obtener las solicitudes rechazadas
      setApplications(rejectedData); // Guarda las solicitudes obtenidas

      const paymentData = await GetPayments(); // Llamada para obtener los pagos realizados
      setPayments(paymentData); // Guarda los pagos obtenidos
    };
    fetchData(); // Ejecuta la función de carga de datos
  }, []); // Este efecto solo se ejecuta una vez, cuando el componente se monta

  // Filtrar solicitudes rechazadas (student_status_fk === 3 significa rechazadas)
  const filteredApplications = applications
    .filter((application) => application.student_status_fk === 3) // Solo solicitudes rechazadas
    .map((application) => {
      // Buscar el pago correspondiente (si existe) comparando el payment_fk de la solicitud con el id del pago
      const payment = payments.find(payment => payment.id === application.payment_fk);
      return { ...application, payment };  // Incluir el pago en la solicitud
    });

  // Maneja el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Actualiza el término de búsqueda
  };

  // Abre el modal con la imagen seleccionada
  const handleImageClick = (url) => {
    setSelectedImage(url); // Establece la URL de la imagen
    setOpenModal(true); // Abre el modal
  };

  // Cierra el modal
  const handleCloseModal = () => {
    setOpenModal(false); // Cierra el modal
  };

  // Maneja el cambio en el acordeón (para expandir o contraer)
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Expande o colapsa el acordeón
  };

  return (
    <div className="rejected-applications-container">
      {/* Título de la sección */}
      <h1 
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: 'rgb(0, 43, 100)',
              fontSize: '40px', 
              padding: '10px',
              textAlign: 'center'
            }}
          >
            Solicitudes Rechazadas
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

      {/* Acordeón para mostrar las solicitudes rechazadas filtradas */}
      {filteredApplications.length > 0 ? (
        filteredApplications
          .filter((application) =>
            application.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtrar por nombre
            application.identification_number.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por identificación
          ) 
          .map((application) => (
            <Accordion
              key={application.id}
              expanded={expanded === application.id} 
              onChange={handleAccordionChange(application.id)} 
            >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />} 
              aria-controls={`panel${application.id}-content`} 
              id={`panel${application.id}-header`} 
            >
              <div>
                <strong>{`${application.name} ${application.first_last_name} ${application.second_last_name}`}</strong> 
                <p>{application.identification_number}</p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className="application-container">
                  <table className="application-table">
                    <tbody>
                      {/* Detalles de la solicitud: Dirección, Fecha de nacimiento, etc. */}
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
                      {/* Información del pago realizado */}
                      <tr>
                        <td className="table-cell"><strong>Pago Realizado:</strong></td>
                        <td className="table-cell">
                          {application.payment ? ( // Si hay un pago asociado, muestra los detalles
                            <>
                              <p><strong>Fecha:</strong> {application.payment.payment_date}</p>
                              <p><strong>Monto:</strong> ₡{application.payment.payment_amount}</p>
                              <img
                                src={application.payment.payment_receipt_url}
                                alt="Recibo de Pago" 
                                className="table-image" 
                                onClick={() => handleImageClick(application.payment.payment_receipt_url)} 
                              />
                            </>
                        ) : (
                          <p>Curso Gratuito</p> // Si no hay pago, muestra "Curso Gratuito"
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
        <p>No se encontraron solicitudes denegadas</p> // Mensaje si no se encuentran solicitudes
      )}

      {/* Modal para ver imágenes detalladas */}
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
            Cerrar {/* Botón para cerrar el modal */}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RejectedApplications;