import React from 'react';
import LoginForm from '../components/LoginForm';
import LoginHero from '../components/LoginHero';
import Navbar from '../components/Navbar';
import { useOutletContext } from 'react-router-dom';

const Login = () => {
  // On récupère le thème et la fonction depuis App.jsx via le contexte
  const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme}/>
      <div className="container mr-5">
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-column transition-colors duration-200">
          <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4 lg:p-5">
            <div className="w-100 max-w-1200 h-auto lg:h-700 bg-surface-light dark:bg-surface-dark rounded-4 shadow-sm overflow-hidden d-flex flex-column flex-lg-row border border-success-subtle dark:border-secondary">
          
              <LoginHero />

              <div className="w-100 card-form p-lg-5 d-flex flex-column bg-white dark:bg-dark">
                < LoginForm />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;