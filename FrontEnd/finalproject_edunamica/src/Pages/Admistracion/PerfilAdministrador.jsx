import React from 'react'
import AdministratorProfile from '../../Components/Administration/AdministratorProfile'
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin'
import NavAdministration from '../../Components/AdminComponents/NavAdministration'

function PerfilAdministrador() {
  return (
    <div>
        <SidebarAdmin />
        <NavAdministration />
        <AdministratorProfile />
    </div>
  )
}

export default PerfilAdministrador