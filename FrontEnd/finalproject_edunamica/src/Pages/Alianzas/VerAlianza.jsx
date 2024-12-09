import React from 'react'
import ViewPartners from '../../Components/Partners/ViewPartners'
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';



function VerAlianza() {
  return (
    <div>
        <SidebarAdmin /> 
        <NavAdministration />
        <ViewPartners />
    </div>
  )
}

export default VerAlianza