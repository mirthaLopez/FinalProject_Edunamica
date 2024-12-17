import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/AuthContext'; // Usar el nuevo contexto

//SERVICIOS
import GetPartners from '../../Services/Partners/GetPartners';
import DeletePartners from '../../Services/Partners/DeletePartners';

//ESTILOS CSS
import '../../Styles/Partners/ViewPartners.css'

function ViewPartners() {
  const [partners, setPartners] = useState([]); // Estado para almacenar los socios
  const { setAuthData } = useAuth(); // Usamos el nuevo contexto de autenticación para acceder o actualizar los datos de autenticación
  
  // useEffect se usa para ejecutar código cuando el componente se monta (al inicio)
  useEffect(() => {
    const fetchData = async () => {
      const partnersData = await GetPartners(); 
      setPartners(partnersData); 
    };
    fetchData(); 
  }, []); 

  // Función para eliminar un partner (socio)
  const handleDelete = async (partnerId) => {
    try {
      // Llamada al servicio para eliminar el socio usando su ID
      await DeletePartners(partnerId); 
      // Actualiza el estado para remover el socio eliminado de la lista
      setPartners(partners.filter(partner => partner.id !== partnerId)); 
      console.log("Eliminado exitosamente"); // Mensaje de éxito
    } catch (error) {
      console.error("Error al eliminar:", error); // Manejo de errores en caso de que falle la eliminación
    }
  };

  return (
    <div className="view-partners-div">
      <h2 className="view-partners-heading">Alianzas Estratégicas</h2> {/* Título principal de la sección */}
      <hr className='view-partners-title'/> {/* Línea horizontal debajo del título */}
      <div className="view-partners-grid">
        {/* Itera sobre los socios y crea un elemento por cada uno */}
        {partners.map((partner) => (
          <div key={partner.id} className="view-partners-item">
            {/* Muestra la imagen del logo del socio */}
            <img src={partner.partner_logo_url} alt={`Partner ${partner.id}`} /> 
            {/* Botón para eliminar un socio */}
            <button 
              className="view-partners-delete-button" 
              onClick={() => handleDelete(partner.id)} // Llama a handleDelete pasando el ID del socio
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPartners; // Exporta el componente para que pueda ser usado en otras partes de la aplicación