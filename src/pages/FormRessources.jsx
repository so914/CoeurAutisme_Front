import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import TopHeader from '../components/Topheader'
import Sidebar from '../components/Sidebar'

const FormRessources = () => {
    const { theme, toggleTheme } = useOutletContext();
    const {id,type,nom}=useParams();
  return (
    <div>
        <TopHeader theme={theme} toggleTheme={toggleTheme}/>
            <div className="d-flex flex-grow-1">
                      <Sidebar />
                      
                      <main className={`flex-grow-1 p-4 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light'}`}>
                        <div className="container">
                            <form className='form_module'>
                              <h3>Ajouter une ressource au module {nom} </h3>
                              <label htmlFor="titre">Titre de la ressource</label>
                              <input type="text" className='form-control' />
                              <label htmlFor="categorie">Categorie</label>
                              <select name="categorie" id="" className='form-control'>
                                <option value="Therapie">Therapie</option>
                                <option value="Education">Education</option>
                                <option value="Sensibilisation">Sensibilisation</option>
                                <option value="Routine">Routine</option>
                              </select>
                              {type === "Vidéos" ? (
                                <>
                                  <label htmlFor="url_photo">Sélectionnez la vidéo</label>
                                  <input type="file" className='form-control' accept='video/mp4'   />
                                  <label htmlFor="durée" className="mb-1 mt-2">Durée de la vidéo</label>
                                  <input 
                                    type="text" 
                                    className='form-control' 
                                    placeholder="ex: 10:30" 
                                  />
                                </>
                              ) : <>
                                <label htmlFor="url_photo">Sélectionnez la photo</label>
                                <input type="file" name="photo" id="" className='form-control' />
                              </>}
                              <label htmlFor="description">Décrivez la ressource</label>
                              <textarea name="description" id="" className='form-control' rows={3}></textarea>
                              <input type="submit" value="Enregistrer" className='btn btn-primary-custom rounded-3 mt-3 px-4 py-2'/>
                        </form>
                        </div>
                      </main>
                 </div>
    </div>
  )
}

export default FormRessources