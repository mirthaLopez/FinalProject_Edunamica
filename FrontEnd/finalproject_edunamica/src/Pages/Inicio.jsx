import React from 'react'
import Footer from '../Components/Footer'
import HeaderNav from '../Components/Header'
import { minHeight } from '@mui/system'
import ControlledCarousel from '../Components/Carrousel'
import CoursesCards from '../Components/CoursesCards'
import Partnerships from '../Components/Partnerships'
import '../Styles/Partners.css'


function Inicio() {
  return (
    <div>
      <HeaderNav />
      <main>
      <ControlledCarousel />
      <div style={{ minHeight: '400px' }}>
        <CoursesCards />
      </div>
      <div>
        <Partnerships />
      </div>
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  )
}

export default Inicio