import React from 'react'

const VideoLine = ({ video, onClick }) => {
  return (
    <div className="card-mini mini-carte d-flex gap-2 mb-3" 
         onClick={() => onClick(video)} 
         style={{ cursor: 'pointer', position: 'relative' }}>
      <div className="thumbnail-container" style={{ flex: '0 0 150px', height: '90px' }}>
        <iframe 
            src={video.url} 
            title={video.titre}
            frameBorder="0"
            style={{ width: '100%', height: '60%', borderRadius: '8px' }}
        ></iframe>
        {/* Couche invisible pour intercepter le clic */}
        <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '150px', height: '90px',
            zIndex: 10
        }}></div>
      </div>

      <div className="card-info">
        <span className="category-label">{video.categorie}</span>
        <h6>{video.titre}</h6>
        <p>{video.auteur}</p>
      </div>
    </div>
  );
};

export default VideoLine;