import React from 'react';
import SidebarStudent from '../../Components/Students/SidebarStudent';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import StudentPayment from '../../Components/Students/StudentPayment'

function MisPagos() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"100vh"}}>
        <SidebarStudent />
        <NavAdministration />
        <StudentPayment />
    </div>
  )
}

export default MisPagos