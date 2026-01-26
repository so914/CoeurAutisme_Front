import React from 'react'
import { useOutletContext } from 'react-router-dom';
import TopHeader from '../components/Topheader'
import Sidebar from '../components/Sidebar'
import FormModule from '../components/FormModule';

const RegisterModule = () => {
    const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
         <TopHeader theme={theme} toggleTheme={toggleTheme}/>
        <div className="d-flex flex-grow-1">
                  <Sidebar />
                  
                  <main className={`flex-grow-1 p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
                    <FormModule/>
                  </main>
                </div>
    </div>
  )
}

export default RegisterModule