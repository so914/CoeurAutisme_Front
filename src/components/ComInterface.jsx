import React from 'react'
import { Outlet } from 'react-router-dom'


const ComInterface = () => {
  return (
    <div>
        <main className="communaute-content" >
            <Outlet />
      </main>
    </div>
  )
}

export default ComInterface