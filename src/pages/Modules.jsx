import React from 'react'
import { useOutletContext } from 'react-router-dom';
import TopHeader from '../components/Topheader'
import Sidebar from '../components/Sidebar'
const Modules = () => {
    const { theme, toggleTheme } = useOutletContext();
    const categories=["Ressources vidéos","Ressources en images","Infrastructures"]
  return (
    <div>
            <TopHeader/>
            <div className="d-flex flex-grow-1">
                      <Sidebar theme={theme} toggleTheme={toggleTheme}  />
                      
                      <main className={`flex-grow-1 p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
                        <div className="container">
                            <h4>Gestion des modules</h4>
                            {categories.map((c)=>(
                                <button className='border-0 m-2 p-2 rounded-4' key={c}>{c}</button>
                            ))}
                        </div>
                      </main>
                    </div>
        </div>
  )
}

export default Modules