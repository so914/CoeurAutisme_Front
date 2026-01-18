import React from 'react'
import { useOutletContext } from 'react-router-dom';
import ProfilSide from '../components/ProfilSide'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LogoChat from '../components/LogoChat'

const Telechargements = () => {
    const { theme, toggleTheme } = useOutletContext();
    const autismResources = [
  {
    id: "res-001",
    title: "Séquence : Se brosser les dents",
    category: "Autonomie", 
    type: "video",
    format: "MP4",
    visualSupport: true,
    details: {
      fileSize: "45 MB",
      duration: "03:20",
      resolution: "1080p"
    },
    downloadStatus: {
      state: "downloading", 
      progress: 65, 
      downloadedBytes: "29.2 MB",
      error: null
    },
    metadata: {
      tags: ["Hygiène", "Routine", "Pictogrammes"],
      targetAge: "Enfants (3-7 ans)",
      lastUpdated: "2026-01-10"
    },
    thumbnailUrl: "/assets/thumbs/brushing-teeth.jpg"
  },
  {
    id: "res-002",
    title: "Banque de Pictogrammes : Émotions",
    category: "Communication",
    type: "photo", 
    format: "ZIP",
    details: {
      fileSize: "12 MB",
      itemCount: 24, //
    },
    downloadStatus: {
      state: "completed",
      progress: 100,
      downloadedBytes: "12 MB",
      error: null
    },
    metadata: {
      tags: ["Émotions", "PECS", "Expression"],
      targetAge: "Tous âges",
      lastUpdated: "2025-11-20"
    },
    thumbnailUrl: "/assets/thumbs/emotions-pecs.jpg"
  }
];


    const telechargPending = autismResources.filter((t) => t.downloadStatus.state === "downloading");
    const telechargCompleted = autismResources.filter((t) => t.downloadStatus.state === "completed");

    return (
        <div>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <ProfilSide />
                    </div>
                    <div className="col-md-8 mt-4">
                        <h4 className='mb-5'>Mes téléchargements</h4>
                        <h5 className='mt-3 mb-3'>Téléchargements en cours</h5>
                        {telechargPending.length === 0 ? (
                            <p className="text-muted">Aucun téléchargement en cours</p>
                        ) : (
                            telechargPending.map((t) => (
                                <div className="card mb-3 p-3 rounded-3 shadow-sm" key={t.id}>
                                    <div className="progress mb-2" style={{ height: '8px' }}>
                                        <div 
                                            className="progress-bar progress-bar-striped progress-bar-animated " 
                                            role="progressbar" 
                                            style={{ width: `${t.downloadStatus.progress}%`, backgroundColor:'var(--primary-dark)' }}
                                            aria-valuenow={t.downloadStatus.progress} 
                                            aria-valuemin="0" 
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                    
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-0 fw-bold">{t.title} | {t.details.fileSize}</p>
                                        <small className="text-muted">{t.downloadStatus.progress}%</small>
                                    </div>
                                </div>
                            ))
                        )}

                        <h5 className='mt-5 mb-3'>Téléchargements terminés</h5>
                        {telechargCompleted.map((t) => (
                            <div className="card mb-2 p-4 rounded-3 shadow-sm" key={t.id}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className='d-flex'>
                                        <span className="material-symbols-outlined text-success me-2">check_circle</span>
                                    <p className="mb-0">{t.title} | {t.details.fileSize}    </p>
                                    
                                    </div>
                                    <span className="material-symbols-outlined me-2">delete</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <LogoChat />
            <Footer />
        </div>
    )}
export default Telechargements