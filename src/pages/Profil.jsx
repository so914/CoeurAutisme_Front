import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LogoChat from "../components/LogoChat";
import Footer from "../components/Footer";
import ProfilSide from "../components/ProfilSide";
import { useOutletContext } from 'react-router-dom';

const Profil = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, toggleTheme } = useOutletContext();
  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme}  />
      <LogoChat />
      <div className="row">
        <div className="col-md-4">
          <ProfilSide />
        </div>
        <div className="col-md-8">
          <div className="card mb-4 border-0 shadow-sm rounded-4 px-4">
            <div className="card-img">
              <img
                className="rounded-pill mt-3"
                src="./Gemini_Generated_Image_d3cwmhd3cwmhd3cw.png"
                alt="Profil"
              />

             <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                <span className="material-symbols-outlined">edit</span>
            </label>
            <input id="file-upload" type="file" style={{ display: 'none' }} />
            </div>
            <h5 className="mb-3">Modifier les informations du profil</h5>
          </div>
          <div>
            <form>
              <div className="row me-2">
                <div className="col-md-6">
                  <label htmlFor="nom">Nom</label>
                  <input type="text" className="form-control" />
                  <label htmlFor="age">Date de naissance</label>
                  <input type="date" name="" id="" className="form-control" />
                  <label htmlFor="genre">Genre</label>
                  <select name="" id="" className="form-control"></select>
                  <label htmlFor="Date d'admission">Date d'admission</label>
                  <p className="p-2 rounded-3 border">27/11/2025</p>
                  <button
                    type="submit"
                    className="btn-primary-custom rounded-3 p-3 mt-2"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
                <div className="col-md-6">
                  <label htmlFor="prenom">Email</label>
                  <input type="mail" name="" id="" className="form-control" />
                  <label htmlFor="profil">Profil</label>
                  <select name="" id="" className="form-control"></select>
                  <label htmlFor="pays">Pays de résidence</label>
                  <select name="" id="" className="form-control"></select>
                  <label htmlFor="password">Mot de passe</label>
                  <div className="input-group custom-pass-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border-end-0 p-2 rounded-start-3"
                      placeholder="**********"
                      style={{ boxShadow: "none" }}
                    />
                    <button
                      type="button"
                      className="btn border border-start-0 rounded-end-3 bg-transparent d-flex align-items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ borderColor: "#dee2e6" }}
                    >
                      <span className="material-symbols-outlined fs-5 text-muted">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profil;
