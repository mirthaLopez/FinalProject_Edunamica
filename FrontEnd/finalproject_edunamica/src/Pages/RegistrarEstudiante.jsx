import React from 'react'
import RegisterForm from '../Components/RegisterForm'
import NavAdministration from '../Components/NavAdministration'
import SidebarAdmin from '../Components/SidebarAdmin';

function RegistrarEstudiante() {
  return (
    <div>
    <SidebarAdmin /> 
    <NavAdministration />
    <div>
    <RegisterForm />
    </div>
    </div>
  )
}

export default RegistrarEstudiante