import React from 'react'
import { NavLink } from 'react-router-dom'

const LogoChat = () => {
  return (
    <div>
        <div className="logo-chat">
            <div className="contour-chat">
                <NavLink to='/chat'>
                    <img src="/images/ChatGPT Image 8 janv. 2026, 16_42_48.png" alt="chat"/>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default LogoChat