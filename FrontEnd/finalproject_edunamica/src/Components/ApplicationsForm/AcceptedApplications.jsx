import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

// SERVICIOS
import GetRegisterForm from '../../Services/ApplicationForm/GetRegisterForm'; // obtenemos datos de prematrícula 
import GetPayments from '../../Services/Payments/GetPayments'; // obtenemos información de pago 

// ESTILOS CSS
import '../../Styles/ApplicationsForm/AcceptedApplications.css';

// IMPORTS DE LIBRERÍA MUI 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

function AcceptedApplications() {
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
  

  useEffect(() => {
    const fetchData = async () => {
      // Obtener las solicitudes
      const acceptedData = await GetRegisterForm();
      setApplications(acceptedData);

      // Obtener los pagos
      const paymentData = await GetPayments();
      setPayments(paymentData);
    };
    fetchData();
  }, []);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Filtrar solicitudes aceptadas
  const filteredApplications = applications
    .filter((application) => application.student_status_fk === 2) // Solo solicitudes aceptadas
    .map((application) => {
      // Buscar el pago correspondiente (si existe) comparando el payment_fk de la solicitud con el id del pago
      const payment = payments.find(payment => payment.id === application.payment_fk);
      return { ...application, payment };  // Incluir el pago en la solicitud
    });


  return (
     <div className="accepted-applications-container">
      <h1
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          color: 'rgb(0, 43, 100)',
          fontSize: '40px',  // Tamaño de fuente más grande
          padding: '10px',
          textAlign: 'center',
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
                <SearchIcon />
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
            application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            application.identification_number.toLowerCase().includes(searchTerm.toLowerCase())
          ) // Filtrar por nombre o identificación
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
                      <tr>
                        <td className="table-cell"><strong>Pago Realizado:</strong></td>
                        <td className="table-cell">
                          {application.payment ? (
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
                          <p>Curso Gratuito</p>
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
        <p>No se encontraron solicitudes aceptadas</p>
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
