import React from 'react'
import BlogEdunamica from '../../Components/BlogEdunamica/BlogEdunamica'
import SidebarAdmin from '../../Components/AdminComponents/SidebarAdmin';
import NavAdministration from '../../Components/AdminComponents/NavAdministration';

function Blog() {
  return (
    <div>
        <SidebarAdmin /> 
        <NavAdministration />
        <BlogEdunamica />
    </div>
  )
}

export default Blog