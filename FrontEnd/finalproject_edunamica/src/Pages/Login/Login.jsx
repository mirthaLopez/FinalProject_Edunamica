import React from 'react'
import FormLogin from '../../Components/Login/LoginForm'
import Footer from '../../Components/MainComponents/Footer'
import HeaderNav from '../../Components/MainComponents/Header'

function Login() {
  return (
    <div>
      <HeaderNav />
      <FormLogin />
      <Footer />
    </div>
  )
}

export default Login