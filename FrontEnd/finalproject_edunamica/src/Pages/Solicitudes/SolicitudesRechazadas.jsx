import React from 'react';
import RejectedApplications from '../../Components/ApplicationsForm/RejectedApplications';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

function SolicitudesRechazadas() {
  return (
    <div>
        <SidebarAdmin /> 
        <NavAdministration />
        <RejectedApplications />

    </div>
  )
}

export default SolicitudesRechazadas