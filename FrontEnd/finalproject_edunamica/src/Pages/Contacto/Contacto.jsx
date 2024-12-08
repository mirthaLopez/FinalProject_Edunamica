import React from 'react'
import HeaderNav from '../../Components/MainComponents/Header'
import Contact from '../../Components/Contact/Contact'
import ContactFormWithMap from '../../Components/Contact/ContactFormWithMap'
import Footer from '../../Components/MainComponents/Footer'

function Contacto() {
  return (
    <div>
      <HeaderNav />
      <Contact />
      <ContactFormWithMap />
      <Footer />
    </div>
  )
}

export default Contacto