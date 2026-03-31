import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import Mavoixmagique from '../components/Mavoixmagique';

const MaVoixMagique = () => {
  return (
    <div>
      <Navbar/>
      <main className='container'>
        <Mavoixmagique />
      </main>
      <Footer/>
    </div>
  )
}

export default MaVoixMagique