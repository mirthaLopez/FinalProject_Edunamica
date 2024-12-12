import React from 'react';
import SidebarStudent from '../Components/SidebarStudent';
import NavAdministration from '../Components/AdminComponents/NavAdministration';
import StudentPayment from '../Components/StudentPayment'

function MisPagos() {
  return (
    <div>
        <SidebarStudent />
        <NavAdministration />
        <StudentPayment />
    </div>
  )
}

export default MisPagos