import React from 'react'
import { useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import FruitDuo from '../components/FruitDuo';

const FruitGame = () => {
    const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
        <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <main>
          <div className='container' >
            <div>
              <FruitDuo />
            </div>
          </div>
        </main>
    </div>
  )
}
export default FruitGame;
