import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LogoChat from '../components/LogoChat'
import Carte from '../components/Carte'
import InfraSide from '../components/InfraSide'


const InfrasPays = () => {
  
  return (
    <div>
        <Navbar/>
        <div className="container mt-5">
            <div className="row">
            <div className="col-md-5">
                <InfraSide/>
            </div>
            <div className="col-md-7 mt-5">
                <Carte/>
            </div>
        </div>
        </div>
        <LogoChat/>
        <Footer/>
    </div>
  )
}

export default InfrasPays