import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Modules from '../components/Modules';
import Testimonials from '../components/Testimonials';
import AfricanImpact from '../components/AfricanImpact';
import LogoChat from '../components/LogoChat';

const Home = () => {
  // On récupère le thème et la fonction depuis App.jsx via le contexte
  const { theme, toggleTheme } = useOutletContext();

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <LogoChat/>
      <Modules/>
      <AfricanImpact/>
      <Testimonials/>
      <Footer />
    </>
  );
};

export default Home;