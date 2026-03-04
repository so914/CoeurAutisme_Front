import {React ,useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';

const ChatSide = () => {

    const [isActif,setActif]=useState(true);

    useEffect(
        ()=>{
            const closeSide=()=>{
                setActif(false);
                console.log("isactif après le clik",isActif);
            }
},[isActif]);


    return (
        <aside className={ `cursor-pointer  bg-background-light dark:bg-background-dark border-end p-4 side-bar-diagnostic h-auto ${isActif===false ? 'hidden' : 'd-none d-lg-flex flex-column'}`} style={{height:"100vh", minWidth:"300px"}}>
  
        <div className='d-flex'>
            <img className="logo-image d-inline-block align-top rounded-5" src="./images/ChatGPT Image 8 janv. 2026, 16_42_48.png" alt="logochat" style={{width:'55px',height:'55px'}}/>
            <span onClick={closeSide} className="material-symbols-outlined logo-separateur">split_scene</span>
        </div>

        <div className='my-3 px-3'>
            <span className='d-flex'>
                <span className="material-symbols-outlined me-2">edit_square</span>Nouveau chat
            </span><br />
            <span className='d-flex'><span className="material-symbols-outlined me-2">search</span>Rechercher des chats</span>
        </div>
  
        <div className='my-3 px-3'>
            <h6>Vos chats</h6>
            <div className="cart-chat mt-3">
                <p>Signes alertants</p>
                <p>Centres locales</p>
                <p>Stratégies en cas de crise</p>
            </div>
        </div>
      </aside>
    );
  };

export default ChatSide