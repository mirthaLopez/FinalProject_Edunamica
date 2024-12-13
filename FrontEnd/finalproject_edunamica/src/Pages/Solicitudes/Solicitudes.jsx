import React from 'react';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';
import Applications from '../../Components/ApplicationsForm/Applications';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
function Solicitudes() {
  return (
        <div>
          <SidebarAdmin />
          <NavAdministration />
          <Applications />
        </div>
  )
}

export default Solicitudes