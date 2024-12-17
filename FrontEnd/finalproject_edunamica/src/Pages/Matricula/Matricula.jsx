import React from 'react'
import EnrollmentForm from '../../Components/Enrollment/EnrollmentForm'
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

function Matricula() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"750px"}}>
      <SidebarAdmin /> 
      <NavAdministration />
      <EnrollmentForm  />
    </div>
  )
}

export default Matricula