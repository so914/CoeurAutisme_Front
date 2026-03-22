import React, { useState } from 'react'
import Cookies from 'js-cookie'

const FormModule = () => {

  const [formData, setFormData] = useState({
    nom: "",
    type: "",
    public: "",
    description: "",
    objectif: "",
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const payload = new FormData();
      payload.append("title",       formData.nom);
      payload.append("type",        formData.type);
      payload.append("target",      formData.public);
      payload.append("description", formData.description);
      payload.append("objective",   formData.objectif);
      if (photo) payload.append("cover_photo", photo);

      const token = Cookies.get("auth_token");

      const response = await fetch("http://localhost:8000/api/resources", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",  },
        body: payload,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Module enregistré avec succès !");
        setFormData({ nom: "", type: "", public: "", description: "", objectif: "" });
        setPhoto(null);
        e.target.reset();
      } else {
        alert("Erreur : " + (data.message || "Échec de l'enregistrement"));
        console.error(data);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <form className='form_module' onSubmit={handleSubmit}>
          <h3>Enregistrer un module</h3>

          <label htmlFor="nom">Titre du module</label>
          <input type="text" name="nom" id="" className='form-control p-2'
            placeholder="Lutte contre les suspitions liées à l'autisme"
            value={formData.nom}
            onChange={handleChange}
          />

          <label htmlFor="type">Type de ressources</label>
          <select name="type" id="" className='form-control p-2'
            value={formData.type}
            onChange={handleChange}>
            <option value="">--- Sélectionnez un type ---</option>
            <option value="ressources_vidéos">Vidéos</option>
            <option value="ressources_images">Images</option>
          </select>

          <label htmlFor="photo">Photo de couverture du module</label>
          <input type="file" name="photo" id="" className='form-control'
            onChange={handleFileChange}
          />

          <label htmlFor="public">Public cible</label>
          <select name="public" id="" className='form-control'
            value={formData.public}
            onChange={handleChange}>
            <option value="">--- Sélectionnez un public ---</option>
            <option value="parents">Parents</option>
            <option value="professionnel">Professionnel</option>
            <option value="Enfants">Enfants</option>
            <option value="Adultes">Adultes</option>
            <option value="Tout le monde">Tout le monde</option>
          </select>

          <label htmlFor="description">Description courte</label>
          <textarea name="description" id="" className='form-control' rows={2}
            value={formData.description}
            onChange={handleChange}>
          </textarea>

          <label htmlFor="objectif">Objectif pédagogique</label>
          <textarea name="objectif" id="" className='form-control' rows={2}
            value={formData.objectif}
            onChange={handleChange}>
          </textarea>

          <input
            type="submit"
            value={loading ? "Enregistrement..." : "Enregistrer"}
            className='btn btn-primary-custom rounded-3 mt-4 px-4 py-2'
            disabled={loading}
          />
        </form>
      </div>
    </div>
  )
}

export default FormModule