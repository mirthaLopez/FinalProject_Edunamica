import React from 'react';
import ViewAdmin from '../../Components/Administration/ViewAdmin';  
import NavAdministration from '../../Components/NavAdministration';
import SidebarAdmin from '../../Components/SidebarAdmin';

function Administracion() {
  return (
    <div>
        <SidebarAdmin /> 
        <NavAdministration />
        <ViewAdmin />
    </div>
  )
}

export default Administracion