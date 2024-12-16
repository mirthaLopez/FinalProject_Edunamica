import React from 'react'
import AdministratorProfile from '../../Components/Administration/AdministratorProfile'
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin'
import NavAdministration from '../../Components/AdminComponents/NavAdministration'

function PerfilAdministrador() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"100vh"}}>
        <SidebarAdmin />
        <NavAdministration />
        <AdministratorProfile />
    </div>
  )
}

export default PerfilAdministrador