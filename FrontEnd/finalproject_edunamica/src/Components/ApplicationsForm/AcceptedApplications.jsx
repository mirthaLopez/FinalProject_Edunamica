import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import GetRegisterForm from '../../Services/ApplicationForm/GetRegisterForm';
import GetPayments from '../../Services/Payments/GetPayments';
import '../../Styles/ApplicationsForm/AcceptedApplications.css';

function AcceptedApplications() {
  const [applications, setApplications] = useState([]);
  const [payments, setPayments] = useState([]);  
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Obtener las solicitudes
      const acceptedData = await GetRegisterForm();
      setApplications(acceptedData);

      // Obtener los pagos
      const PaymentData = await GetPayments();
      setPayments(PaymentData);
    };
    fetchData();
  }, []);

  // Filtro para mostrar solo las solicitudes con student_status_fk === 2 (aceptadas)
  const acceptedApplications = applications.filter(application => application.student_status_fk === 2);

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Función para obtener el pago asociado a la solicitud
  const getPaymentForApplication = (id) => {
    return payments.find(payment => payment.id === id);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="divAccepted">
      <h1 className="titleAccepted">Solicitudes Aceptadas</h1>
      
      {/* Acordeón para mostrar solo las solicitudes aceptadas */}
      {acceptedApplications.map((application) => {
        const payment = getPaymentForApplication(application.id); // Obtener el pago correspondiente

        return (
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
                        {payment ? (
                          <>
                            <p><strong>Fecha:</strong> {payment.payment_date}</p>
                            <p><strong>Monto:</strong> ₡{payment.payment_amount}</p>
                            <img
                              src={payment.payment_receipt_url}
                              alt="Recibo de Pago"
                              className="table-image"
                              onClick={() => handleImageClick(payment.payment_receipt_url)}
                            />
                          </>
                        ) : (
                          <p>No disponible</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}

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

