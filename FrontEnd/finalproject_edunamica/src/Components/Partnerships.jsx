import React, { useState, useEffect } from 'react';
import GetPartners from '../Services/Partners/GetPartners';
import '../Styles/Parnertships.css';

function Partnerships() {
  const [partners, setPartners] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const partnersData = await GetPartners();
      setPartners(partnersData);
    };
    fetchData();
  }, []);

  console.log(partners);

  return (
    <div className="partnerships-wrapper">
      <h2 className="partnerships-heading">Alianzas Estratégicas</h2>
      <hr className='hr-title'/>
      <div className="partners-grid">
        {partners.map((partner) => (
          <div key={partner.id} className="partner-item">
            <img src={partner.partner_logo_url} alt={`Partner ${partner.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Partnerships;
