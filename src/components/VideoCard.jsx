import React from "react";

const VideoCard = ({ video, onClick }) => {
  return (
    <div className="card-mini" onClick={() => onClick(video)} style={{ position: 'relative', cursor: 'pointer' }}>
      
      {/* Cette div permet de capter le clic par-dessus l'iframe */}
      <div style={{ 
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          zIndex: 10 
      }}></div>

      <div className="thumbnail-container">
        <iframe src={video.url} title={video.titre}> </iframe>
        <span className="duration-tag">{video.duree}</span>
      </div>
      <div className="card-info px-3">
        <span className="category-label mt-5">{video.categorie}</span>
        <h6>{video.titre}</h6>
        <p>{video.auteur} • {video.pays}</p>
      </div>
    </div>
  );
};

export default VideoCard;