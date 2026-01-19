import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatSide from '../components/ChatSide';
import InterfaceChat from '../components/InterfaceChat';

const Chatbot = () => {
    // On récupère le thème et la fonction depuis App.jsx via le contexte
    const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
        <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <div className="d-flex flex-grow-1 overflow-hidden position-relative">
          <ChatSide/>
          <main className="flex-grow-1 overflow-y-auto bg-background-light dark:bg-background-dark">
            <div className="mx-auto" style={{maxWidth:"930px"}}>
                <InterfaceChat/>
            </div>
         </main>
        </div>
    </div>
  )
}

export default Chatbot