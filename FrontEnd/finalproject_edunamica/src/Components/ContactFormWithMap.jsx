import React, { useState } from 'react';
import emailjs from "@emailjs/browser";
import "../Styles/ContactFormWithMap.css";
import { TextField, Button } from '@mui/material'; // Importar componentes de MUI

const ContactFormWithMap = () => {
  // Estado para cada campo del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Función para manejar el envío del formulario
  const sendEmail = (e) => {
    e.preventDefault();

    // Verifica que los datos se obtuvieron correctamente
    console.log("Nombre:", name);
    console.log("Correo:", email);
    console.log("Mensaje:", message);

    // Enviar los datos a EmailJS
    emailjs
      .send(
        import.meta.env.VITE_SERVICE,
        import.meta.env.VITE_TEMPLATE,
        { from_name: name, from_email: email, message: message },
        import.meta.env.VITE_PUBLIC_KEY // publicKey
      )
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="formWithMapContainer">
      {/* Formulario */}
      <div className="formContainer">
      <form className="form" onSubmit={sendEmail}>
        <h2 className="formTitle">Formulario de Contacto</h2>

        <TextField
          label="Nombre Completo"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          label="Consulta o duda"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
          required
        />

<Button
  type="submit"
  variant="contained"
  fullWidth
  sx={{
    marginTop: 2,
    width: "100%",
    padding: "10px",
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: "20px",
    backgroundColor: "#eb392c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#d32f2f" // Cambia el color de fondo al hacer hover
    }
  }}
>
  ENVIAR
</Button>


      </form>
    </div>

      {/* Mapa */}
      
      <div className="mapContainer">
        
        <div style={{ overflow: 'hidden', width: '100%', maxWidth: '400px', height: '300px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.7726624167444!2d-85.6433989259931!3d9.974981273466868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9e5376f7f4cc09%3A0xa723a345ff5e4179!2sEdun%C3%A1mica%20Nosara!5e1!3m2!1ses-419!2scr!4v1732293559209!5m2!1ses-419!2scr"
            width="400"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactFormWithMap;