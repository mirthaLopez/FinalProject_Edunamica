import React from 'react'
import EventForm from '../../Components/Events/EventsForm'
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

function Eventos() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"950px"}}>
        <SidebarAdmin /> 
        <NavAdministration />
        <EventForm />
    </div>
  )
}

export default Eventos