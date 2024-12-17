import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto para autenticación

//SERVICIOS
import PostPartners from '../../Services/Partners/PostPartners'; // Función para enviar datos del nuevo partner al servidor

//ESTILOS CSS
import '../../Styles/Partners/Partners.css'; // Archivo de estilos para la vista de los partners

//IMPORTS DE LIBRERIA MUI
import { TextField, Button } from '@mui/material'; // Componentes de Material UI para campos de texto y botones

//IMPORT DE LIBRERIA NOTYF
import { Notyf } from 'notyf'; // Notyf para mostrar notificaciones
import 'notyf/notyf.min.css'; // Importación de los estilos de Notyf

function Partners() {
  // Establecemos el estado para cada campo del formulario
  const [partner_logo_url, setPartnerLogo] = useState(null); // Estado para guardar el archivo de la imagen del logo
  const [partner_name, setPartnerName] = useState(''); // Estado para el nombre de la alianza

  // Estado para la vista previa de la imagen
  const [imagePreview, setImagePreview] = useState(null); // Guardará la URL para la vista previa del logo

  const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } })); // Configuración de la librería Notyf para notificaciones

  const { setAuthData } = useAuth(); // Usamos el contexto de autenticación para manejar datos de usuario
  
  // Función para manejar la carga de una nueva imagen (logo del partner)
  function NewImage(e) {
    const file = e.target.files[0]; // Obtenemos el archivo de la imagen

    // Establecer el archivo de la imagen en el estado
    setPartnerLogo(file);

    // Crear una URL de vista previa para la imagen seleccionada
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl); // Actualizar el estado de la vista previa
  }

  // Función para manejar el envío del formulario para agregar un nuevo partner
  const AddNewPartner = async (e) => {
    console.log("Botón agregar new partner"); // Mensaje en consola para depuración
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    try {
        const data = await PostPartners(partner_logo_url, partner_name); // Llamar al servicio PostPartners para enviar los datos del partner
        console.log("Soy la respuesta del server:", data); // Mostrar la respuesta del servidor en consola

        notyf.success('Alianza agregada de manera exitosa!'); // Mostrar una notificación de éxito
        
        if (!data) { // Si no se recibe respuesta del servidor
            console.log("No se obtuvieron datos"); // Mensaje de error en consola
            notyf.error(`Error al agregar la alianza, datos incompletos`); // Mostrar una notificación de error
        }
    } catch (error) {
        console.error("Hubo un error al agregar el nuevo partner:", error); // Manejar cualquier error de la petición
        notyf.error(`Error al agregar la alianza`); // Notificar el error
    }
  };

  return (
    <div>
      <div className="partners-container"> {/* Contenedor principal del formulario */}
        <h1 className="partners-title">Añadir una Nueva Alianza</h1> {/* Título del formulario */}
        
        <TextField
          value={partner_name} // Enlace bidireccional del estado 'partner_name' con el campo de texto
          onChange={(e) => setPartnerName(e.target.value)} // Actualiza el estado 'partner_name' cuando el valor cambia
          label="Nombre de la alianza" // Etiqueta del campo
          name="partner_name" // Atributo name para el campo
          className="partner-name-input" // Clase de estilo para el campo de texto
        />
        
        <div className="partner-logo-container">
          <label htmlFor="partner-logo" className="partner-logo-label">Agregar logo:</label> {/* Etiqueta para el campo de carga de imagen */}
          <input
            type="file" // Tipo de entrada para cargar archivos
            onChange={NewImage} // Función que se llama cuando se selecciona una imagen
            accept="image/*" // Solo permitir imágenes
            required // Campo obligatorio
            className="partner-logo-input" // Clase de estilo para el input
            id="partner-logo" // ID del input
          />
        </div>

        {/* Mostrar la vista previa de la imagen si se seleccionó una */}
        {imagePreview && ( // Condicional que solo muestra la vista previa si 'imagePreview' tiene valor
          <div className="image-preview-container">
            <img src={imagePreview} alt="Vista previa del logo" className="image-preview" /> {/* Imagen de vista previa */}
          </div>
        )}

        <button
          onClick={AddNewPartner} // Llamada a la función AddNewPartner cuando se hace clic
          type="submit" // Tipo de botón para enviar el formulario
          variant="contained" // Estilo de Material UI para el botón
          color="success" // Color verde de éxito
          className="register-partner-button" // Clase de estilo para el botón
        >
          Registrar Alianza {/* Texto del botón */}
        </button>
      </div>
    </div>
  );
}

export default Partners; // Exportación del componente para poder utilizarlo en otros lugares