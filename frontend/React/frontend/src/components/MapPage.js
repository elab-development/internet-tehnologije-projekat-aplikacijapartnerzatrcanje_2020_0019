import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { apiService } from "./ApiService";
import axios from "axios";
import L from "leaflet";
import mapaPin from "../assets/mapaPin.png";

const MapPage = () => {

  const myIcon = new L.Icon({
    iconUrl: mapaPin,
    iconSize: [40, 40], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
  });

  const [trkaci, setTrkaci] = useState([]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    apiService.getTrkaci().then((response) => {
      setTrkaci(response.data.data || []);
    });
  }, []);

  useEffect(() => {
    const fetchMarkers = async () => {
      const markersArray = await Promise.all(
        trkaci.map(async (trkac) => {
          const locationResponse = await apiService.getMestoInfo(trkac.id);

          if (locationResponse && locationResponse.data) {
            const position = await geocodeAddress(locationResponse.data.mesto);
            if (position) {
              return {
                id: trkac.id,
                position: position,
                ime: trkac.ime,
              };
            }
          }
          return null;
        })
      );
      setMarkers(markersArray.filter((marker) => marker !== null));
    };

    if (trkaci.length > 0) {
      fetchMarkers();
    }
  }, [trkaci]);

  const mapStyles = {
    height: "500px",
    width: "100%",
    margin: "20px 0",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const defaultLocation = [44.7872, 20.4573];

  const geocodeAddress = async (address) => {
    try {
      const apiKey = "5c8add91557141d9a5d5368e704e68e5";
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`);

      if (response && response.data.results && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        return [lat, lng];
      }
    } catch (error) {
      console.error("Greška prilikom geokodiranja adrese:", error);
    }

    return null;
  };

  return (
    <div className="map-page">
      <MapContainer center={defaultLocation} zoom={6} style={mapStyles}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={myIcon}>
            <Popup>{marker.ime}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
