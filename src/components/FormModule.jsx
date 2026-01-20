import React from 'react'

const FormModule = () => {
  return (
    <div>
        <div className="container">
            <form className='form_module rounded-4 mt-4'>
                <h3>Enregistrer un module</h3>
                <label htmlFor="nom" className='mt-2'>Nom du module</label>
                <input type="text" name="nom" id="" className='form-control p-2' placeholder="Lutte contre les suspitions liées à l'autisme "/>
                <label htmlFor="type" className='mt-3'>Sélectionnez le type de modules</label>
                <select name="modules" id="" className='form-control p-2'>
                    <option value="ressources_vidéos">Ressources vidéos</option>
                    <option value="ressources_images">Ressources en images</option>
                    <option value="Infrastructures">Infrastructures</option>
                </select>
                <input type="submit" value="Enregistrer" className='btn btn-primary-custom rounded-3 mt-4 px-4 py-2'/>
            </form>
        </div>
    </div>
  )
}

export default FormModule