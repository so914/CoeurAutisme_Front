import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SuperPouvoirsCalme from '../components/SuperPouvoirsCalme'

const MesSuperPouvoirs = () => {
  return (
    <div>
        <Navbar    />
        <main>
           <SuperPouvoirsCalme/>
        </main>
        <Footer/>
    </div>
  )
}

export default MesSuperPouvoirs