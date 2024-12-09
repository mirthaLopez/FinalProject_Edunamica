import React from 'react'
import Partners from '../../Components/Partners/Partners'
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';


function Alianzas() {
  return (
    <div>
        <SidebarAdmin /> 
        <NavAdministration />
        <Partners />
    </div>
  )
}

export default Alianzas