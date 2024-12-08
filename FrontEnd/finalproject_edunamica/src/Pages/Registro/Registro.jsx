import React from 'react'
import Register from '../../Components/Register/Register'
import HeaderNav from '../../Components/MainComponents/Header'
import Footer from '../../Components/MainComponents/Footer'

function Registro() {
  return (

    <div>
      <HeaderNav />
      <div style={{marginTop:'140px'}}></div>
      <Register />
      <Footer />
    </div>
  )
}

export default Registro