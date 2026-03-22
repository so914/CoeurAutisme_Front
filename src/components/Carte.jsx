import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Carte = () => {
  const location = useLocation();
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    // 🔹 Initialiser la map une seule fois
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([0, 20], 4); // centre Afrique par défaut
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap",
      }).addTo(mapRef.current);
    }

    const placeMarker = (lat, lng, accuracy) => {
      if (!mapRef.current) return;

      // Supprimer l'ancien marker et cercle
      if (markerRef.current) {
        mapRef.current.removeLayer(markerRef.current);
        markerRef.current = null;
      }
      if (circleRef.current) {
        mapRef.current.removeLayer(circleRef.current);
        circleRef.current = null;
      }

      // Ajouter le nouveau marker et cercle
      markerRef.current = L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup("📍 Vous êtes ici")
        .openPopup();

      circleRef.current = L.circle([lat, lng], {
        radius: accuracy,
        color: "blue",
        fillOpacity: 0.1,
      }).addTo(mapRef.current);

      mapRef.current.setView([lat, lng], 15);
    };

    // 🔹 Cas 1 : position déjà récupérée depuis Infrastructures.jsx via navigate state
    if (location.state?.lat && location.state?.lng) {
      const { lat, lng, accuracy } = location.state;
      placeMarker(lat, lng, accuracy ?? 50);
    } else {
      // 🔹 Cas 2 : pas de state → on relance watchPosition directement ici
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          placeMarker(
            pos.coords.latitude,
            pos.coords.longitude,
            pos.coords.accuracy
          );
        },
        (err) => {
          if (err.code === 1)
            alert("Veuillez autoriser l'accès à votre localisation");
          else alert("Impossible de récupérer la localisation actuelle");
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }

    // 🔹 Cleanup au démontage
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="container mt-5">
      <div id="map" style={{ height: "800px" }}></div>
    </div>
  );
};

export default Carte;