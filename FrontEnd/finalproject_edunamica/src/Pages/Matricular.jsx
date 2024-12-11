import React from 'react'
import SidebarStudent from '../Components/SidebarStudent'
import NavAdministration from '../Components/AdminComponents/NavAdministration';
import RegisterStudent from '../Components/RegisterStudent'

function Matricular() {
  return (
    <div>
        <SidebarStudent />
        <NavAdministration />
        <RegisterStudent />
    </div>
  )
}

export default Matricular