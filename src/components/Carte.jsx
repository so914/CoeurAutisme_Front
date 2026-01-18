import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // N'oubliez pas d'importer le CSS de Leaflet

const Carte = () => {
  const position = [51.505, -0.09]; // Coordonnées [latitude, longitude]

  return (
    <div className="container mt-3">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "800px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Un popup CSS3 assez simple. <br /> Facilement personnalisable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Carte;
