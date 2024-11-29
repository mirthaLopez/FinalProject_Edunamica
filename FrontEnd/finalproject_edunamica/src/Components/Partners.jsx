import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button} from '@mui/material';
import PostPartners from '../Services/Partners/PostPartners'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function Partners() {

  // Establecemos el estado para cada campo del formulario
  const [partner_logo_url, setPartnerLogo] = useState(null);
  const [partner_name, setPartnerName] = useState('');

  const [partner, setPartner] = useState([]);

  const [notyf] = useState(new Notyf({ duration: 3000, position: { x: 'center', y: 'center' } }));

  function NewImage(e) {
    const file = e.target.files[0]    
    setPartnerLogo(file)
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
    <div>

        <h1>Partners / Alianzas</h1>
        <br />
        <br />
        <TextField value={partner_name} onChange={(e) => setPartnerName(e.target.value)} label="Nombre de la alianza" name="partner_name" />
        <br />
        <br />
        <div>
            <label>Agregar logo:</label>
            <input type="file" onChange={NewImage} accept="image/*" required />
        </div>
        <br />
        <br />
        <Button onClick={AddNewPartner} type="submit" variant="contained" color="success">Registrar Alianza</Button>

    </div>
  )
}

export default Partners