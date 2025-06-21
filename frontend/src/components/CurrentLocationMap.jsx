import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// ESM-friendly way to import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Get API key from .env
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const CurrentLocationMap = () => {
  const [position, setPosition] = useState(null);
  const [locationName, setLocationName] = useState(""); // For storing the location name (e.g., "Shrushti Chowk")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        // Reverse geocoding to get the exact location name
        axios
          .get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&lang=en`)
          .then((response) => {
            setLocationName(response.data.display_name); // Save the detailed location name
          })
          .catch((err) => {
            console.error("Error fetching location name:", err);
          });
      },
      (err) => {
        console.error("Error fetching location:", err);
      }
    );
  }, []);

  return (
    <div className="mt-16 px-6 md:px-16" style={{ minHeight: "calc(100vh - 100px)" }}>
  <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
    Your Current Location with Live Weather Overlays
  </h2>

      {position ? (
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={false}
          style={{
            height: "600px", // Increased the height of the map
            width: "100%",
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Default">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay name="Clouds">
              <TileLayer
                url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Temperature">
              <TileLayer
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Wind">
              <TileLayer
                url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              />
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Precipitation">
              <TileLayer
                url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
              />
            </LayersControl.Overlay>
          </LayersControl>

          <Marker position={position}>
            <Popup>
              Your Current Location: <br /> {locationName || "Fetching location..."}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Fetching your location...
        </p>
      )}
    </div>
  );
};

export default CurrentLocationMap;
