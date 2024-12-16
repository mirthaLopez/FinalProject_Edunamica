import React from 'react'
import Partners from '../../Components/Partners/Partners'
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';


function Alianzas() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"650px"}}>
        <SidebarAdmin /> 
        <NavAdministration />
        <Partners />
    </div>
  )
}

export default Alianzas