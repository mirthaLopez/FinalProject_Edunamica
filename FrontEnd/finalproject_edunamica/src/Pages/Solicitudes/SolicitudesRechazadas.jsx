import React from 'react';
import RejectedApplications from '../../Components/ApplicationsForm/RejectedApplications';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

function SolicitudesRechazadas() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"950px"}}>
        <SidebarAdmin /> 
        <NavAdministration />
        <RejectedApplications />

    </div>
  )
}

export default SolicitudesRechazadas