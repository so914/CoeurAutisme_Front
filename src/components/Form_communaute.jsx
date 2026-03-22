import React, { useState } from 'react'
import Cookies from 'js-cookie'

const Form_communaute = () => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    statut: '',
    category: '',
    photo_behind: null,
    photo_communaute: null,
    border: '#000000',
    regles: ''
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // FormData obligatoire car il y a 2 fichiers (photo_behind + photo_communaute)
      const payload = new FormData();
      payload.append("name",             formData.nom);
      payload.append("description",      formData.description);
      payload.append("status",           formData.statut);
      payload.append("category",         formData.category);
      payload.append("border_color",     formData.border);
      payload.append("rules",            formData.regles);
      if (formData.photo_behind)     payload.append("cover_image",      formData.photo_behind);
      if (formData.photo_communaute) payload.append("profile_image",    formData.photo_communaute);

      const token = Cookies.get("auth_token");

      const response = await fetch("http://localhost:8000/api/forums", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          // ⚠️ Pas de Content-Type ici : FormData le gère automatiquement
        },
        body: payload,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Communauté créée avec succès !");
        console.log(data);
        // Reset du formulaire
        setFormData({
          nom: '', description: '', statut: '', category: '',
          photo_behind: null, photo_communaute: null,
          border: '#000000', regles: ''
        });
        e.target.reset();
      } else {
        alert("Erreur : " + (data.message || "Échec de l'enregistrement"));
        console.error(data.errors || data);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form className='form_module' onSubmit={handleSubmit}>
        <h3>Création d'une communauté</h3>

        <label htmlFor="nom">Nom de la communaute</label>
        <input type="text" name="nom" id="" className='form-control'
          value={formData.nom} onChange={handleChange} />

        <label htmlFor="description">Description de la communauté</label>
        <input type="text" name="description" id="" className='form-control'
          value={formData.description} onChange={handleChange} />

        <label htmlFor="statut">Statut de la communauté</label>
        <select name="statut" id="" className='form-control'
          value={formData.statut} onChange={handleChange}>
          <option value="privé">Privé</option>
          <option value="public">Public</option>
        </select>

        <label htmlFor="category">Catégorie de la communauté</label>
        <select name="category" id="" className='form-control'
          value={formData.category} onChange={handleChange}>
          <option value="Soutien Familial">Soutien Familial</option>
          <option value="Auto-représentation">Auto-représentation</option>
          <option value="Scientifique">Scientifique</option>
          <option value="autre">Autre</option>
        </select>

        <label htmlFor="photo_behind">Photo d'arrière plan de la communauté</label>
        <input type="file" name="photo_behind" id="" className='form-control'
          onChange={handleChange} />

        <label htmlFor="photo_communaute">Photo de couverture de la communauté</label>
        <input type="file" name="photo_communaute" id="" className='form-control'
          onChange={handleChange} />

        <label htmlFor="border">Couleur de bordure de la photo</label><br />
        <input type="color" name="border" id=""
          value={formData.border} onChange={handleChange} /><br />

        <label htmlFor='regles'>Règles de la communauté</label>
        <textarea name="regles" id="" className='form-control' rows={4}
          value={formData.regles} onChange={handleChange}>
        </textarea>

        <input
          type="submit"
          value={loading ? "Création en cours..." : "Créer la communauté"}
          className='btn btn-primary-custom rounded-3 p-2 mt-4'
          disabled={loading}
        />
      </form>
    </div>
  )
}

export default Form_communaute