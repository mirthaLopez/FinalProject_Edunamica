import React from 'react';

//ESTILOS CSS
import "../../Styles/Contact/Contact.css";

//IMPORTS DE LIBRERIA MUI
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function Contact() {
  
  return (
 <div style={{marginTop:'140px'}}>
      <div className="divInfoContacto">
        {/* Tarjeta Teléfono */}
        <div className="cardContact">
          <div className="icon-container">
            <WhatsAppIcon className="icon-style" />
          </div>
          <div className="card-body-Contact">
            <p className="card-text-Contact">
              +506 8471-7884
            </p>
          </div>
        </div>

        {/* Tarjeta Ubicación */}
        <div className="cardContact">
          <div className="icon-container">
            <LocationOnIcon className="icon-style" />
          </div>
          <div className="card-body-Contact">
            <p className="card-text-Contact">
              De la Agencia de Motos Honda 50 metros Norte Barrio San Pedro, Nosara, Nicoya, Guanacaste
            </p>
          </div>
        </div>

        {/* Tarjeta Correo */}
        <div className="cardContact">
          <div className="icon-container">
            <MailIcon className="icon-style" />
          </div>
          <div className="card-body-Contact">
            <p className="card-text-Contact">k.marchena@edunamica.org</p>
          </div>
        </div>
      </div>

    </div>



  )
}

export default Contact