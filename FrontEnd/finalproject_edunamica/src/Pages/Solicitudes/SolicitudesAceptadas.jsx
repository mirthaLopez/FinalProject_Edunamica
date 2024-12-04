import React from 'react'
import AcceptedApplications from '../../Components/ApplicationsForm/AcceptedApplications';
import SidebarAdmin from '../../Components/SidebarAdmin';
import NavAdministration from '../../Components/NavAdministration';

function SolicitudesAceptadas() {
  return (
    <div>
        <SidebarAdmin /> 
        <NavAdministration />
        <AcceptedApplications />
    </div>
  )
}

export default SolicitudesAceptadas