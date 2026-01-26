import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Carte = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    // 🔹 Créer la map si elle n'existe pas
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([6.5244, 3.3792], 5); // centre Afrique par défaut

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap",
      }).addTo(mapRef.current);
    }

    // 🔹 wait que la map soit ready
    mapRef.current.whenReady(() => {
      // 🔹 watchPosition pour mettre à jour marker et cercle
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = pos.coords.accuracy;

          if (!mapRef.current) return;

          // supprime l'ancien marker/cercle
          if (markerRef.current) mapRef.current.removeLayer(markerRef.current);
          if (circleRef.current) mapRef.current.removeLayer(circleRef.current);

          // 🔹 ajouter marker et cercle
          markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
          circleRef.current = L.circle([lat, lng], { radius: accuracy }).addTo(mapRef.current);

          mapRef.current.setView([lat, lng], 15);
        },
        (err) => {
          if (err.code === 1) alert("Veuillez autoriser l'accès à votre localisation");
          else alert("Impossible de récupérer la localisation actuelle");
        },
        { enableHighAccuracy: true }
      );
    });

    // cleanup
    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      if (mapRef.current) mapRef.current.remove();
    };
  }, []);

  return (
    <div className="container mt-5">
      <div id="map" style={{ height: "800px" }}></div>
    </div>
  );
};

export default Carte;
