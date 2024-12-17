import React, {useState, useEffect} from 'react';

//SERVICIOS
import GetPartners from '../../Services/Partners/GetPartners';

//ESTILOS CSS
import '../../Styles/Partners/Parnertships.css';

function Partnerships() {
  // Estado local para almacenar la lista de partners
  const [partners, setPartners] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const partnersData = await GetPartners();
      setPartners(partnersData); 
    };
    fetchData();
  }, []); 

  // Consola para ver los datos de los partners obtenidos
  console.log(partners);

  return (
    <div className="partnerships-wrapper">
      {/* Título principal de la sección */}
      <h2 className="partnerships-heading">Alianzas Estratégicas</h2>
      {/* Línea horizontal debajo del título */}
      <hr className='hr-title'/>
      <div className="partners-grid">
        {/* Mapea cada partner para crear un elemento visual */}
        {partners.map((partner) => (
          <div key={partner.id} className="partner-item">
            {/* Imagen del logo del partner */}
            <img src={partner.partner_logo_url} alt={`Partner ${partner.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partnerships;