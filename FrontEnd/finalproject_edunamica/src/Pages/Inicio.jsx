import React from 'react'
import Footer from '../Components/Footer'
import HeaderNav from '../Components/Header'
import ControlledCarousel from '../Components/Carrousel'
import CoursesCards from '../Components/CoursesCards'
import Partnerships from '../Components/Partnerships'
import EventSlider from '../Components/SliderEvents'


function Inicio() {
  return (
    <div>
      <HeaderNav />
      <ControlledCarousel />
      <CoursesCards />
      <EventSlider />
      <Partnerships />
      <Footer />
    </div>
  )
}

export default Inicio