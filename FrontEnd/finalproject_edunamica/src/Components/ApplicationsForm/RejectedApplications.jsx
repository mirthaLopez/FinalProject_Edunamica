import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import GetRegisterForm from '../../Services/ApplicationForm/GetRegisterForm'; // Asegúrate de que esta ruta es correcta
import '../../Styles/ApplicationsForm/RejectedApplications.css';

function RejectedApplications() {
  const [applications, setApplications] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const RejectedData = await GetRegisterForm();
      setApplications(RejectedData);
    };
    fetchData();
  }, []);

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Filtrar las solicitudes con student_status igual a 3
  const rejectedApplications = applications.filter(application => application.student_status_fk === 3);
  console.log(rejectedApplications);

  return (
    <div>
      <h1>Solicitudes Rechazadas</h1>
      
      {/* Tabla para mostrar las solicitudes rechazadas */}
      <table className="applications-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Número de Identificación</th>
            <th>Dirección</th>
            <th>Fecha de Nacimiento</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Identificación</th>
            <th>Pago Realizado</th>
          </tr>
        </thead>
        <tbody>
          {rejectedApplications.map((application) => (
            <tr key={application.id}>
              <td>{`${application.name} ${application.first_last_name} ${application.second_last_name}`}</td>
              <td>{application.identification_number}</td>
              <td>{application.address}</td>
              <td>{application.birth_date}</td>
              <td>{application.email}</td>
              <td>{application.phone_number}</td>
              <td>
                <img
                  src={application.identification_image_url}
                  alt="Imagen de Identificación"
                  style={{ width: 50, height: 'auto', cursor: 'pointer' }}
                  onClick={() => handleImageClick(application.identification_image_url)}
                />
              </td>
              <td>
                {application.payment ? (
                  <>
                    <p>Monto: {application.payment.payment_amount}</p>
                    <p>Fecha: {application.payment.payment_date}</p>
                    <img
                      src={application.payment.payment_receipt_url}
                      alt="Recibo de Pago"
                      style={{ width: 50, height: 'auto', cursor: 'pointer' }}
                      onClick={() => handleImageClick(application.payment.payment_receipt_url)}
                    />
                  </>
                ) : (
                  <p>No disponible</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default RejectedApplications;
