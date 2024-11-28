import React from 'react'
import EnrollmentForm from '../Components/EnrollmentForm'
import SidebarAdmin from '../Components/SidebarAdmin'
import NavAdministration from '../Components/NavAdministration'

function Matricula() {
  return (
    <div>
      <SidebarAdmin /> 
      <NavAdministration />
      <EnrollmentForm  />
    </div>
  )
}

export default Matricula