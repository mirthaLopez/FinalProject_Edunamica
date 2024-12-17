import React from 'react'
import BlogForm from '../../Components/BlogEdunamica/BlogForm'
import NavAdministration from '../../Components/AdminComponents/NavAdministration';
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';

function AgregarBlog() {
  return (
    <div style={{backgroundColor:" #e9e9e9", minHeight:"150vh"}}>
     <SidebarAdmin />
      <NavAdministration />
      <BlogForm />
      </div>
  )
}

export default AgregarBlog;