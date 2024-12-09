import React from 'react'
import SidebarStudent from '../Components/SidebarStudent'
import NavAdministration from '../Components/AdminComponents/NavAdministration';
import StudentProfile from '../Components/Students/StudentProfile'

function PerfilEstudiante() {
  return (
    <div>
        <SidebarStudent />
        <NavAdministration />
        <StudentProfile />
    </div>
  )
}

export default PerfilEstudiante