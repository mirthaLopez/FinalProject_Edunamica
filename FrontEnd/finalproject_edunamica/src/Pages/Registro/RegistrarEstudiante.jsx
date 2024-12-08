import React from 'react';
import RegisterForm from '../../Components/Register/RegisterForm';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

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