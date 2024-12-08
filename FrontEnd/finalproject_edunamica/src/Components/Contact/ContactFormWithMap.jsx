import React, {useState} from 'react';

//SERVICIOS
import PostPeopleInterested from '../../Services/People_Interested/PostPeopleInterested';

//ESTILOS CSS
import "../../Styles/Contact/ContactFormWithMap.css";

//IMPORTS DE LIBRERIA MUI
import {TextField, Button} from '@mui/material'; // Importar componentes de MUI

//IMPORT DE LIBRERIA EMAIL JS
import emailjs from "@emailjs/browser";

//IMPORT DE LIBRERIA NOTYF
import {Notyf} from 'notyf';
import 'notyf/notyf.min.css';


const ContactFormWithMap = () => {
  // Estado para cada campo del formulario
  const [person_name, setPersonName] = useState('');
  const [person_first_last_name, setPersonFirstLastName] = useState('');
  const [person_email, setPersonEmail] = useState('');
  const [person_notes, setPersonNotes] = useState('');
  const [person_phone_number, setPersonPhoneNumber] = useState('');
  const [course, setCourse] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mostrar mensajes de error

  const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } }));

  // Función para manejar el envío del formulario
  const sendEmail = async (e) => {
    e.preventDefault();

    // Verifica que los datos se obtuvieron correctamente
    console.log("Nombre Completo:", person_name);
    console.log("Apellido Paterno:", person_first_last_name);
    console.log("Correo Electrónico:", person_email);
    console.log("Número de Teléfono:", person_phone_number);
    console.log("Consulta o Duda:", person_notes);
    console.log("Curso de Interés:", course);

    try {
      // Enviar los datos a EmailJS
      await emailjs.send(
        import.meta.env.VITE_SERVICE,
        import.meta.env.VITE_TEMPLATE,
        {
          from_name: person_name,
          from_first_last_name: person_first_last_name,  // Aquí agregas el apellido
          from_email: person_email,
          phone_number: person_phone_number,
          message: person_notes,
          course: course,
        },
        import.meta.env.VITE_PUBLIC_KEY // publicKey
      );

      // Guardar la consulta a través de la API
      await PostPeopleInterested(
        person_name,
        person_first_last_name,
        person_email,
        person_phone_number,
        person_notes,
        course
      );

      //mensaje cuando se envia el correo
      notyf.success('Formulario enviado con éxito!');

      // Limpiar los campos del formulario después de enviar correctamente
      setPersonName('');
      setPersonFirstLastName('');
      setPersonEmail('');
      setPersonNotes('');
      setPersonPhoneNumber('');
      setCourse('');
      setErrorMessage(''); // Limpiar el mensaje de error en caso de éxito

    } catch (error) {
      setErrorMessage('Hubo un error al enviar el formulario. Intenta nuevamente.');
      console.error('Error al enviar el formulario:', error);
    
      notyf.error(`Error al enviar el formulario de contacto`);
    
    }
  };

  return (
    <div className="contact-form-with-map">
      {/* Formulario */}
      <div className='container-form-background'>
        <div className="contact-form-with-map__form-container">
          <form className="contact-form-with-map__form" onSubmit={sendEmail}>
            <h2 className="contact-form-with-map__form-title">Formulario de Contacto</h2>

            <div className="contact-form-with-map__form-grid">
              <div className="contact-form-with-map__form-group">
                <TextField
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                  value={person_name}
                  onChange={(e) => setPersonName(e.target.value)}
                  margin="normal"
                  required
                  className="contact-form-with-map__text-field"
                />
              </div>
              <div className="contact-form-with-map__form-group">
                <TextField
                  label="Apellido"
                  variant="outlined"
                  fullWidth
                  value={person_first_last_name}
                  onChange={(e) => setPersonFirstLastName(e.target.value)}
                  margin="normal"
                  required
                  className="contact-form-with-map__text-field"
                />
              </div>

              <div className="contact-form-with-map__form-group">
                <TextField
                  label="Correo Electrónico"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={person_email}
                  onChange={(e) => setPersonEmail(e.target.value)}
                  margin="normal"
                  required
                  className="contact-form-with-map__text-field"
                />
              </div>
              <div className="contact-form-with-map__form-group">
                <TextField
                  label="Número de Teléfono"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  value={person_phone_number}
                  onChange={(e) => setPersonPhoneNumber(e.target.value)}
                  margin="normal"
                  required
                  className="contact-form-with-map__text-field"
                />
              </div>

              <div className="contact-form-with-map__form-group">
                <TextField
                  label="Consulta o duda"
                  variant="outlined"
                  multiline
                  rows={2}
                  fullWidth
                  value={person_notes}
                  onChange={(e) => setPersonNotes(e.target.value)}
                  margin="normal"
                  required
                  className="contact-form-with-map__text-field"
                />
              </div>
              <div className="contact-form-with-map__form-group">
                <TextField
                  label="Curso de Interés"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  margin="normal"
                  required
                  className="contact-form-with-map__text-field"
                />
              </div>
            </div>

            {/* Mensaje de error */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#eb392c",   // Fondo rojo
                color: "white",               // Texto blanco
                fontSize: "18px",             // Tamaño de la fuente
                fontWeight: "bold",           // Peso de la fuente
                padding: "10px",              // Relleno
                borderRadius: "4px",          // Bordes redondeados
                cursor: "pointer",           // Cursor de puntero
                transition: "background-color 0.3s ease",  // Transición de color al hacer hover
                textTransform: "none",       // Evitar que el texto se ponga en mayúsculas
                border: "none",              // Sin borde
                width: "30%",                 // Ancho del botón
                alignSelf: "center",         // Centrado
                "&:hover": {
                  backgroundColor: "#d32f2f",  // Cambio de color de fondo cuando se pasa el mouse
                },
              }}
            >
              ENVIAR
            </Button>
          </form>
        </div>
      </div>

      {/* Mapa */}
      <div className="contact-form-with-map__map-container">
        <div className="contact-form-with-map__map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.7726624167444!2d-85.6433989259931!3d9.974981273466868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f9e5376f7f4cc09%3A0xa723a345ff5e4179!2sEdun%C3%A1mica%20Nosara!5e1!3m2!1ses-419!2scr!4v1732293559209!5m2!1ses-419!2scr"
            width="100%"
            height="400"
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
