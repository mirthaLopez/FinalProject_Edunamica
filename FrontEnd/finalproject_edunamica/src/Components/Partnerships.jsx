import React, { useState, useEffect } from 'react';
import GetPartners from '../Services/Partners/GetPartners'

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
<div style={{marginTop:'60px'}}>
  <h2 className="title">Alianzas Estratégicas</h2>
  <div className="partners-container">
    {partners.map((partner) => (
      <div key={partner.id} className="partner-item">
        <img src={partner.partner_logo_url} alt={`Partner ${partner.id}`} />
      </div>
    ))}
  </div>
</div>
  )
}

export default Partnerships