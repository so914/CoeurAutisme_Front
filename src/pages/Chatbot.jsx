import React, { useState, useEffect } from 'react';
import ChatSide from '../components/ChatSide';
import InterfaceChat from '../components/InterfaceChat';

const Chatbot = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarVisible(true); // desktop
      } else {
        setSidebarVisible(false); // mobile
      }
    };   

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="d-flex position-relative" style={{ height: "100vh", overflow: "hidden" }}>

      <div
        className={`chat-sidebar ${isSidebarVisible ? 'show' : ''}`}
      >
        <ChatSide isVisible={isSidebarVisible} toggle={toggleSidebar} />
      </div>

      {isSidebarVisible && window.innerWidth < 768 && (
        <div
          className="overlay"
          onClick={toggleSidebar}
        ></div>
      )}

      <main className="flex-grow-1 h-100 overflow-auto">
        <InterfaceChat toggleSidebar={toggleSidebar} />
      </main>
    </div>
  );
};

export default Chatbot;