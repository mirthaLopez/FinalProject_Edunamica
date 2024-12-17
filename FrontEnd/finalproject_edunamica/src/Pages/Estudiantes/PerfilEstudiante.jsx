import React from 'react'
import SidebarStudent from '../../Components/Students/SidebarStudent'
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import StudentProfile from '../../Components/Students/StudentProfile'

function PerfilEstudiante() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"740px"}}>
        <SidebarStudent />
        <NavAdministration />
        <StudentProfile />
    </div>
  )
}

export default PerfilEstudiante