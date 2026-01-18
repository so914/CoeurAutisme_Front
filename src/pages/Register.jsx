import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'
import { useOutletContext } from 'react-router-dom';

const Register = () => {
    // On récupère le thème et la fonction depuis App.jsx via le contexte
    const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
        <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <RegisterForm/>
        <Footer/>
    </div>
  )
}

export default Register