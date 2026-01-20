import React from 'react'
import InfraSide from '../components/InfraSide'
import Carte from '../components/Carte'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CarteInfras = () => {
  return (
    <div>
      <Navbar/>
        <div className="container-fluid px-5">
            <div className="row">
              <div className="col-md-5">
                <InfraSide/>
              </div>
              <div className="col-md-7">
                <Carte/>
              </div>
            </div>
        </div>
      <Footer/>
    </div>
  )
}

export default CarteInfras