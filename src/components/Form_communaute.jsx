import React from 'react'

const Form_communaute = () => {
  return (
    <div>
      <form className='form_module'>
        <h3>Création d'une communauté</h3>
        <label htmlFor="nom">Nom de la communaute</label>
        <input type="text" name="nom" id="" className='form-control' />
        <label htmlFor="description">Description de la communauté</label>
        <input type="text" name="description" id="" className='form-control' />
        <label htmlFor="statut">Statut de la communauté</label>
        <select name="statut" id="" className='form-control'>
          <option value="privé">Privé</option>
          <option value="public">Public</option>
        </select>
        <label htmlFor="category">Catégorie de la communauté</label>
        <select name="category" id="" className='form-control'>
          <option value="Soutien Familial">Soutien Familial</option>
          <option value="Auto-représentation">Auto-représentation</option>
          <option value="Scientifique"></option>
          <option value="autre">Autre</option>
        </select>
        <label htmlFor="photo_behind">Photo d'arrière plan de la communauté</label>
        <input type="file" name="photo_behind" id="" className='form-control'/>
        <label htmlFor="photo_communaute">Photo de couverture de la communauté</label>
        <input type="file" name="photo_communaute" id="" className='form-control'/>
        <label htmlFor="border">Couleur de bordure de la photo</label><br />
        <input type="color" name="border" id=""/><br />
        <label htmlFor='regles'>Règles de la communauté</label>
        <textarea name="regles" id="" className='form-control' rows={4}></textarea>
        <input type="submit" value="Créer la communauté" className='btn btn-primary-custom rounded-3 p-2 mt-4' />
      </form>
    </div>
  )
}

export default Form_communaute