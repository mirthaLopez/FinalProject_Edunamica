import React from 'react';
import ViewAdmin from '../../Components/Administration/ViewAdmin';  
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

function Administracion() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"100vh"}}>
        <SidebarAdmin /> 
        <NavAdministration />
        <ViewAdmin />
    </div>
  )
}

export default Administracion