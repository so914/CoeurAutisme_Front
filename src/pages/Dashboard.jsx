import React from 'react'
import Sidebar from '../components/Sidebar'
import { useOutletContext } from 'react-router-dom';
import TopHeader from '../components/Topheader' 
import AdminDashboard from '../components/Admindashboard'

const Dashboard = () => {
  // On récupère le thème depuis App.jsx
  const { theme, toggleTheme } = useOutletContext();

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <TopHeader theme={theme} toggleTheme={toggleTheme} />
        
        <div className="d-flex flex-grow-1">
          <Sidebar theme={theme} toggleTheme={toggleTheme}  />
          
          <main className={`flex-grow-1 p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
            <AdminDashboard />
          </main>
        </div>
    </div>
  )
}

export default Dashboard