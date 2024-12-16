import React from 'react'
import ViewPartners from '../../Components/Partners/ViewPartners'
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';



function VerAlianza() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"100vh"}}>
        <SidebarAdmin /> 
        <NavAdministration />
        <ViewPartners />
    </div>
  )
}

export default VerAlianza