import React from 'react'
import SidebarStudent from '../../Components/Students/SidebarStudent'
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import StudentCourses from '../../Components/Students/StudentCourses'

function MisCursos() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"100vh"}}>
        <SidebarStudent />
        <NavAdministration />
        <StudentCourses />
    </div>
  )
}

export default MisCursos