import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

//SERVICIOS
import PostPartners from '../../Services/Partners/PostPartners';

//ESTILOS CSS
import '../../Styles/Partners/Partners.css';

//IMPORTS DE LIBRERIA MUI
import { TextField, Button } from '@mui/material';

//IMPORT DE LIBRERIA NOTYF
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function Partners() {
  // Establecemos el estado para cada campo del formulario
  const [partner_logo_url, setPartnerLogo] = useState(null);
  const [partner_name, setPartnerName] = useState('');

  // Estado para la vista previa de la imagen
  const [imagePreview, setImagePreview] = useState(null);

  const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } }));

  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación
  
  function NewImage(e) {
    const file = e.target.files[0];

    // Establecer el archivo de la imagen en el estado
    setPartnerLogo(file);

    // Crear una URL de vista previa para la imagen seleccionada
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }

  const AddNewPartner = async (e) => {
    console.log("Botón agregar new partner");
    e.preventDefault();

    
    try {
        const data = await PostPartners(partner_logo_url, partner_name); // se envian los datos del curso
        console.log("Soy la respuesta del server:", data);

        notyf.success('Alianza agregada de manera exitosa!');
        
        if (!data) {
            console.log("No se obtuvieron datos"); 
            notyf.error(`Error al agregar la alianza, datos incompletos`);
        }
    } catch (error) {
        console.error("Hubo un error al agregar el nuevo partner:", error);
        notyf.error(`Error al agregar la alianza`);
    }
  };

  return (
    <div className="partners-container">
      <h1 className="partners-title">Partners / Alianzas</h1>
      <TextField
        value={partner_name}
        onChange={(e) => setPartnerName(e.target.value)}
        label="Nombre de la alianza"
        name="partner_name"
        className="partner-name-input"
      />
      <div className="partner-logo-container">
        <label htmlFor="partner-logo" className="partner-logo-label">Agregar logo:</label>
        <input
          type="file"
          onChange={NewImage}
          accept="image/*"
          required
          className="partner-logo-input"
          id="partner-logo"
        />
      </div>

      {/* Mostrar la vista previa de la imagen si se seleccionó una */}
      {imagePreview && (
        <div className="image-preview-container">
          <img src={imagePreview} alt="Vista previa del logo" className="image-preview" />
        </div>
      )}

      <Button
        onClick={AddNewPartner}
        type="submit"
        variant="contained"
        color="success"
        className="register-partner-button"
      >
        Registrar Alianza
      </Button>
    </div>
  );
}

export default Partners;
