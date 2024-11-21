import React from 'react'
import Footer from '../Components/Footer'
import HeaderNav from '../Components/Header'
import { minHeight } from '@mui/system'
import ControlledCarousel from '../Components/Carrousel'


function Inicio() {
  return (
    <div style={{ marginTop: '120px' }}>
      <HeaderNav />
      <ControlledCarousel />
      <div style={{ minHeight: '400px' }}></div>
      <Footer />
    </div>
  )
}

export default Inicio