import React, { useState, useEffect } from 'react';

//SERVICIOS
import GetPartners from '../../Services/Partners/GetPartners';
import DeletePartners from '../../Services/Partners/DeletePartners';

//ESTILOS CSS
import '../../Styles/Partners/ViewPartners.css'

function ViewPartners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const partnersData = await GetPartners();
      setPartners(partnersData);
    };
    fetchData();
  }, []);

  // Función para eliminar un partner
  const handleDelete = async (partnerId) => {
    try {
      await DeletePartners(partnerId); // Llamar a la función para eliminar el partner
      setPartners(partners.filter(partner => partner.id !== partnerId)); // Actualizar el estado
      console.log("Eliminado exitosamente");
      
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div className="view-partners-div">
      <h2 className="view-partners-heading">Alianzas Estratégicas</h2>
      <hr className='view-partners-title'/>
      <div className="view-partners-grid">
        {partners.map((partner) => (
          <div key={partner.id} className="view-partners-item">
            <img src={partner.partner_logo_url} alt={`Partner ${partner.id}`} />
            <button 
              className="view-partners-delete-button" 
              onClick={() => handleDelete(partner.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPartners;
