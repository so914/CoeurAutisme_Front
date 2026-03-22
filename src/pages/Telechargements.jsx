import React, { useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom';
import ProfilSide from '../components/ProfilSide'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LogoChat from '../components/LogoChat'

const Telechargements = () => {
    const { theme, toggleTheme } = useOutletContext();

    const [autismResources, setAutismResources] = useState([
        {
            id: "res-001",
            title: "Séquence : Se brosser les dents",
            category: "Autonomie",
            type: "video",
            format: "MP4",
            details: { fileSize: "45 MB", duration: "03:20", resolution: "1080p" },
            downloadStatus: { state: "idle", progress: 0, downloadedBytes: "0 MB", error: null },
            metadata: { tags: ["Hygiène", "Routine", "Pictogrammes"], targetAge: "Enfants (3-7 ans)", lastUpdated: "2026-01-10" },
            fileUrl: "/assets/videos/brushing-teeth.mp4", // ← ton vrai fichier
        },
        {
            id: "res-002",
            title: "Banque de Pictogrammes : Émotions",
            category: "Communication",
            type: "photo",
            format: "ZIP",
            details: { fileSize: "12 MB", itemCount: 24 },
            downloadStatus: { state: "idle", progress: 0, downloadedBytes: "0 MB", error: null },
            metadata: { tags: ["Émotions", "PECS", "Expression"], targetAge: "Tous âges", lastUpdated: "2025-11-20" },
            fileUrl: "/assets/zips/emotions-pecs.zip",
        }
    ]);

    // Garde une ref des AbortController pour pouvoir annuler
    const abortRefs = useRef({});

    // Met à jour le downloadStatus d'une ressource par id
    const updateStatus = (id, patch) => {
        setAutismResources(prev =>
            prev.map(r => r.id === id
                ? { ...r, downloadStatus: { ...r.downloadStatus, ...patch } }
                : r
            )
        );
    };

    const formatBytes = (bytes) => {
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // ── Téléchargement avec suivi en temps réel ──────────────────
    const startDownload = async (resource) => {
        const { id, fileUrl, title, format } = resource;

        // Créer un AbortController pour pouvoir annuler
        const controller = new AbortController();
        abortRefs.current[id] = controller;

        updateStatus(id, { state: "downloading", progress: 0, downloadedBytes: "0 MB", error: null });

        try {
            const response = await fetch(fileUrl, { signal: controller.signal });

            if (!response.ok) throw new Error(`Erreur serveur : ${response.status}`);

            // Content-Length pour calculer le % (si le serveur l'envoie)
            const contentLength = response.headers.get("Content-Length");
            const total = contentLength ? parseInt(contentLength) : null;

            const reader = response.body.getReader();
            const chunks = [];
            let received = 0;

            // 🔹 Lecture chunk par chunk → mise à jour en temps réel
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                chunks.push(value);
                received += value.length;

                const progress = total ? Math.round((received / total) * 100) : null;

                updateStatus(id, {
                    progress: progress ?? 99, // si pas de Content-Length, on met 99% jusqu'à la fin
                    downloadedBytes: formatBytes(received),
                });
            }

            // 🔹 Tout reçu → assembler le blob et déclencher le téléchargement navigateur
            const blob = new Blob(chunks);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${title}.${format.toLowerCase()}`;
            a.click();
            URL.revokeObjectURL(url);

            updateStatus(id, { state: "completed", progress: 100 });

        } catch (err) {
            if (err.name === "AbortError") {
                updateStatus(id, { state: "idle", progress: 0, downloadedBytes: "0 MB" });
            } else {
                updateStatus(id, { state: "error", error: err.message });
            }
        } finally {
            delete abortRefs.current[id];
        }
    };

    // ── Annuler un téléchargement ─────────────────────────────────
    const cancelDownload = (id) => {
        if (abortRefs.current[id]) {
            abortRefs.current[id].abort();
        }
    };

    const telechargPending   = autismResources.filter(t => t.downloadStatus.state === "downloading");
    const telechargCompleted = autismResources.filter(t => t.downloadStatus.state === "completed");
    const telechargIdle      = autismResources.filter(t => t.downloadStatus.state === "idle" || t.downloadStatus.state === "error");

    return (
        <div>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <ProfilSide />
                    </div>
                    <div className="col-md-8 mt-4">
                        <h4 className='mb-2 mt-4'>Mes téléchargements</h4>

                        {/* ── Disponibles ───────────────────────────── */}
                        {telechargIdle.length > 0 && (
                            <>
                                <h5 className='mt-3 mb-3'>Disponibles</h5>
                                {telechargIdle.map(t => (
                                    <div className="card mb-3 p-3 rounded-3 shadow-sm" key={t.id}>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <p className="mb-0 fw-bold">{t.title}</p>
                                                <small className="text-muted">{t.details.fileSize} · {t.format}</small>
                                                {t.downloadStatus.state === "error" && (
                                                    <div className="text-danger small mt-1">
                                                        ⚠ {t.downloadStatus.error}
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                className="btn btn-sm btn-outline-primary-custom rounded-3"
                                                onClick={() => startDownload(t)}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>download</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* ── En cours ──────────────────────────────── */}
                        <h5 className='mt-4 mb-3'>Téléchargements en cours</h5>
                        {telechargPending.length === 0 ? (
                            <p className="text-muted">Aucun téléchargement en cours</p>
                        ) : (
                            telechargPending.map(t => (
                                <div className="card mb-3 p-3 rounded-3 shadow-sm" key={t.id}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <p className="mb-0 fw-bold">{t.title}</p>
                                        {/* Bouton annuler */}
                                        <button
                                            className="btn btn-sm btn-outline-danger rounded-3"
                                            onClick={() => cancelDownload(t.id)}
                                            title="Annuler"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                                        </button>
                                    </div>

                                    {/* Barre de progression */}
                                    <div className="progress mb-2" style={{ height: '8px' }}>
                                        <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            role="progressbar"
                                            style={{ width: `${t.downloadStatus.progress}%`, backgroundColor: 'var(--primary-dark)' }}
                                            aria-valuenow={t.downloadStatus.progress}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <small className="text-muted">{t.downloadStatus.downloadedBytes} / {t.details.fileSize}</small>
                                        <small className="text-muted">{t.downloadStatus.progress}%</small>
                                    </div>
                                </div>
                            ))
                        )}

                        {/* ── Terminés ──────────────────────────────── */}
                        <h5 className='mt-5 mb-3'>Téléchargements terminés</h5>
                        {telechargCompleted.length === 0 ? (
                            <p className="text-muted">Aucun téléchargement terminé</p>
                        ) : (
                            telechargCompleted.map(t => (
                                <div className="card mb-2 p-4 rounded-3 shadow-sm" key={t.id}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className='d-flex align-items-center'>
                                            <span className="material-symbols-outlined text-success me-2">check_circle</span>
                                            <div>
                                                <p className="mb-0 fw-bold">{t.title}</p>
                                                <small className="text-muted">{t.details.fileSize} · {t.format}</small>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-2">
                                            {/* Re-télécharger */}
                                            <button
                                                className="btn btn-sm btn-outline-secondary rounded-3"
                                                onClick={() => startDownload(t)}
                                                title="Re-télécharger"
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
                                            </button>
                                            {/* Supprimer de la liste */}
                                            <button
                                                className="btn btn-sm btn-outline-danger rounded-3"
                                                onClick={() => setAutismResources(prev => prev.filter(r => r.id !== t.id))}
                                                title="Supprimer"
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <LogoChat />
            <Footer />
        </div>
    );
};

export default Telechargements;