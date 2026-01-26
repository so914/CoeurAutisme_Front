import React from 'react'
import Sidebar from '../components/Sidebar'
import { useOutletContext } from 'react-router-dom';
import TopHeader from '../components/Topheader' 

const Users = () => {
    const { theme, toggleTheme } = useOutletContext();
    const users=[
        {
            id:1,
            nom:"sophia",
            email:"ibaranaidesophia@gmail.com",
            password:"**********",
            genre:"féminin",
            profil:"parent d'un enfant autiste",
            pays:"Congo",
            data_naissance:"11-05-2006"
        },
        {
            id:2,
            nom:"elda",
            email:"elda@gmail.com",
            password:"**********",
            profil:"enfant autiste",
            genre:"féminin",
            pays:"RDC",
            data_naissance:"10-05-2002"
        },
        {
            id:3,
            nom:"Junior",
            email:"Juniorty@gmail.com",
            password:"**********",
            genre:"masculin",
            profil:"spécialiste",
            pays:"USA",
            data_naissance:"14-03-2002"
        }

    ]
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
        <TopHeader theme={theme} toggleTheme={toggleTheme} />
        
        <div className="d-flex flex-grow-1">
          <Sidebar theme={theme} toggleTheme={toggleTheme}  />
          
          <main className={`flex-grow-1 p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
            <h3 className='text-color my-4'>Gestion des utilisateurs</h3>
            <div className="row my-4">
                <div className="col-md-1">#Id</div>
                <div className="col-md-3">Email</div>
                <div className="col-md-2">Profil</div>
                <div className="col-md-2">Genre</div>
                <div className="col-md-2">Date naissance</div>
                <div className="col-md-2">Pays</div>
            </div>
            <div>
                {users.map((u)=>(
                    <div className="card p-2 border-0 shadow mb-2" key={u.id}>
                        <div className="row">
                            <div className="col-md-1">{u.id}</div>
                            <div className="col-md-3">{u.email}</div>
                            <div className="col-md-2">{u.profil}</div>
                            <div className="col-md-2">{u.genre}</div>
                            <div className="col-md-2">{u.data_naissance}</div>
                            <div className="col-md-2">{u.pays}</div>
                            
                        </div>
                    </div>
                ))}
            </div>
          </main>
        </div>
    </div>
  )
}

export default Users