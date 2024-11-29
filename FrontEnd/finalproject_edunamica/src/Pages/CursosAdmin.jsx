import React from 'react'
import SidebarAdmin from '../Components/SidebarAdmin'
import NavAdministration from '../Components/NavAdministration'
import CoursesShow from '../Components/CoursesShow'

function CursosAdmin() {
  return (
    <div>
        <SidebarAdmin />
        <NavAdministration />
        <CoursesShow />
    </div>
  )
}

export default CursosAdmin