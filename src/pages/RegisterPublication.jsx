import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ComSide from '../components/ComSide'

const RegisterPublication = () => {
  return (
    <div>
        <Navbar/>
        <div className="d-flex flex-grow-1 overflow-hidden position-relative">
            <ComSide/>
            <main className="flex-grow-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-5">
            <form className='form_module mt-3'>
                <h3>Création d'un post</h3>
                <label htmlFor="title">Sujet de la publication</label>
                <input type="text" name="title" id="" className='form-control'/>
                <label htmlFor="content">Contenu de la publication</label>
                <input type="text" name="content" id="" className='form-control'/>
                <label htmlFor="file">Média (photo/vidéo optionnel) </label>
                <input type="file" name="file" id="" className='form-control' />
                <input type="submit" value="Poster la publication" className='form-control mt-4 btn btn-primary-custom rounded-3' />
            </form>
        </main>
        </div>
        
        <Footer/>
    </div>
  )
}

export default RegisterPublication