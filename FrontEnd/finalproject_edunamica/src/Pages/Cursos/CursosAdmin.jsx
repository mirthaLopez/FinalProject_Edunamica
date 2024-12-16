import React from 'react'
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';
import CoursesShow from '../../Components/Courses/CoursesShow'

function CursosAdmin() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"100vh"}}>
        <SidebarAdmin />
        <NavAdministration />
        <CoursesShow />
    </div>
  )
}

export default CursosAdmin