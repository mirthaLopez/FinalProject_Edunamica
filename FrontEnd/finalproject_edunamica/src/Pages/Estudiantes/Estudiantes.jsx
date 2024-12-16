import React from 'react';
import ViewStudents from '../../Components/Students/ViewStudents'; 
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

function Estudiantes() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"100vh"}}>
        <SidebarAdmin /> 
        <NavAdministration />
        <ViewStudents  />
    </div>
  )
}

export default Estudiantes