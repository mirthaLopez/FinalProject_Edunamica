import React from 'react'
import SidebarStudent from '../Components/SidebarStudent'
import NavAdministration from '../Components/AdminComponents/NavAdministration';
import StudentCourses from '../Components/StudentCourses'

function MisCursos() {
  return (
    <div>
        <SidebarStudent />
        <NavAdministration />
        <StudentCourses />
    </div>
  )
}

export default MisCursos