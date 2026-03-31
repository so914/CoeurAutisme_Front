import {React,useState } from 'react'
import { CiLocationArrow1 } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { CgMoreVerticalAlt } from "react-icons/cg";
import useLocalStorage from 'use-local-storage';


const InterfaceChat = ({ isSidebarVisible, toggleSidebar }) => {
    const [clicked, setClicked] = useState(false);
    const handleClicked=()=>{
        setClicked(!clicked);
        console.log(clicked);
    };
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const toggleTheme = () => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};

  return (
    <div className="container-fluid" style={{ overflow: "hidden" }}>
        <div className='row p-2 align-items-center mt-2 shadow-sm'>
            <div className="col-md-9 d-flex align-items-center">
                <div className="flex">
                {!isSidebarVisible && window.innerWidth < 768 && (
                    <span onClick={toggleSidebar} className="me-3 cursor-pointer" >
                       <IoMenu size={24}/>
                    </span>
                )}
               </div>
                 <div className="d-flex align-items-center circle rounded-pill">
                    <div className="rounded-pill point"></div>
                    <img 
                        className="logo-image d-inline-block rounded-5 m-auto" 
                        src="./images/ChatGPT Image 8 janv. 2026, 16_42_48.png" 
                        alt="logochat" 
                    />
                </div>

                <div className="ms-2 align-items-center">
                    <h5 className='light:text-black me-2 dark:text-white'>SIA</h5>
                    <p className="text-muted m-0"> 
                        En ligne | ici pour t'écouter et te guider
                    </p>
                </div>
            </div>
            <div className="col-md-3 d-flex justify-content-end">
                <span className="py-1 px-2 rounded-pill bg-primary-custom "
                    onClick={handleClicked}>
                    <CgMoreVerticalAlt />
                </span>
                
            </div>
        </div>
        <div className='d-flex justify-content-end'>
                {clicked && (
                    <div className='position-absolute bg-background-light dark:bg-background-dark border rounded-4 p-3 mt-2 shadow-sm' style={{right:"20px", zIndex:"1000"}}>
                        {theme==='light'?(<p className='mb-2 cursor-pointer' onClick={toggleTheme}>sombre</p>):(<p className='mb-2 cursor-pointer' onClick={toggleTheme}>Mode clair</p>)}
                        
                        <p className='mb-2 cursor-pointer'>Paramètres de la conversation</p>
                    </div>
                )}
            </div>
            <div className='container d-flex align-items-center justify-content-center' style={{minHeight:"320px"}}>
                <div>
                    <div className="text-center align-items-center">
                        <h4>Bonjour , comment puis-je vous aider aujourd'hui?</h4>
                    </div>
                </div> 
            </div>
            <div className="container">
                <form className='mx-4'>
                    <div className='input-group custom-pass-group '>
                        <input type="text" className='form-control border-end-0 px-3 rounded-start-5 input-p' placeholder="Demandez moi n'importe quoi concernant l'autisme ..." />
                        <button className='input-group-text rounded-end-5 bg-background-light dark:bg-background-dark' >
                            <span className="rounded-pill p-2 bg-primary-custom text-white m-1"> <CiLocationArrow1 size={28} /></span>
                        </button>
                    </div>
                </form>
                <div className="container d-flex justify-content-center ">
                    <p className='d-flex my-3'><span className=" me-2"><BsInfoCircle/></span> SIA peut se tromper dans ses réponses, il est important de vérifier chaque réponse fournie</p>
                </div>
            </div>
    </div>
  )
}

export default InterfaceChat;