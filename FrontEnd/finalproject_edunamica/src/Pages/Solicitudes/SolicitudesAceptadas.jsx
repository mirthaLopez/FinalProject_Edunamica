import React from 'react'
import AcceptedApplications from '../../Components/ApplicationsForm/AcceptedApplications';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

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