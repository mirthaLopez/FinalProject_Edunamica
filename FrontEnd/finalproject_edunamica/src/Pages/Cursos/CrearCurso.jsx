import React from 'react'
import CourseForm from '../../Components/Courses/CourseForm'
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

function Curso() {
  return (
    <div>
     <SidebarAdmin />
      <NavAdministration />
      <CourseForm />
      </div>
  )
}

export default Curso