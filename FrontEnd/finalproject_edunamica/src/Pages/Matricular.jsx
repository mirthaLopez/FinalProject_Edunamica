import React from 'react'
import SidebarStudent from '../Components/SidebarStudent'
import NavAdministration from '../Components/AdminComponents/NavAdministration';
import RegisterStudent from '../Components/RegisterStudent'

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