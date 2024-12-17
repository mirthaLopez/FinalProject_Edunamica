import React from 'react'
import SidebarStudent from '../../Components/Students/SidebarStudent'
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import RegisterStudent from '../../Components/Students/RegisterStudent'

function Matricular() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"100vh"}}>
        <SidebarStudent />
        <NavAdministration />
        <RegisterStudent />
    </div>
  )
}

export default Matricular