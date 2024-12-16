import React from 'react'
import NewAdmin from '../../Components/Administration/NewAdmin'
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
function Administradores() {
  return (

    <div style={{backgroundColor:" #e9e9e9", minHeight:"100vh"}}>
     <SidebarAdmin /> 
     <NavAdministration />
     <NewAdmin />
    </div>

  )
}


export default Administradores