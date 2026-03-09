import React, { useState } from 'react';
import ChatSide from '../components/ChatSide';
import InterfaceChat from '../components/InterfaceChat';

const Chatbot= () => {
    // l'état pour contrôler les deux enfants
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    return (
        <div className="d-flex" style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
            {/* on passe l'état et la fonction au composant Side */}
            <ChatSide isVisible={isSidebarVisible} toggle={toggleSidebar} />

            {/* le chat prend tout l'espace restant grâce à flex-grow-1 */}
            <main className="flex-grow-1 h-100 overflow-auto">
                <InterfaceChat isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            </main>
        </div>
    );
};

export default Chatbot;