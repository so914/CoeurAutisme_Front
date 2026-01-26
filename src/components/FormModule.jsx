import React from 'react'

const FormModule = () => {
  return (
    <div>
        <div className="container">
            <form className='form_module'>
                <h3>Enregistrer un module</h3>
                <label htmlFor="nom">Titre du module</label>
                <input type="text" name="nom" id="" className='form-control p-2' placeholder="Lutte contre les suspitions liées à l'autisme "/>
                <label htmlFor="type">Type de ressources</label>
                <select name="modules" id="" className='form-control p-2'>
                    <option value="ressources_vidéos">Vidéos</option>
                    <option value="ressources_images">Images</option>
                </select>
                <label htmlFor="photo">Photo de couverture du module</label>
                <input type="file" name="photo" id="" className='form-control'/>
                <label htmlFor="public">Public cible</label>
                <select name="public" id="" className='form-control'>
                  <option value="parents">Parents</option>
                  <option value="professionnel">Professionnel</option>
                  <option value="Enfants">Enfants</option>
                  <option value="Adultes">Adultes</option>
                  <option value="Tout le monde">Tout le monde</option>
                </select>
                <label htmlFor="description">Description courte</label>
                <textarea name="description" id="" className='form-control' rows={2}></textarea>
                <label htmlFor="objectif">Objectif pédagogique</label>
                <textarea name="objectif" id="" className='form-control' rows={2}></textarea>
                <input type="submit" value="Enregistrer" className='btn btn-primary-custom rounded-3 mt-4 px-4 py-2'/>
            </form>
        </div>
    </div>
  )
}

export default FormModule