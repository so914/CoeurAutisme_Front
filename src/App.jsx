import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

useEffect(() => {
  document.documentElement.setAttribute('data-bs-theme', theme);
}, [theme]);

const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};

  return (
    // On garde la div parente pour le fond et le thème
    <div className={theme === 'dark' ? 'bg-dark text-white' : ''} style={{ minHeight: '100vh', transition: 'all 0.3s' }}>
      {/* On utilise context pour passer la fonction de thème à toutes les pages filles */}
      <Outlet context={{ theme, toggleTheme }} />
    </div>
  );
}

export default App;