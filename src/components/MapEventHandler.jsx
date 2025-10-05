// src/components/MapEventHandler.jsx
import { useMapEvents } from 'react-leaflet';

export default function MapEventHandler({ onMapClick, isActive }) {
  useMapEvents({
    click(e) {
      if (isActive) {
        onMapClick(e); // e is a Leaflet event → e.latlng exists
      }
    },
    // Optional: handle mobile tap
    tap(e) {
      if (isActive) {
        onMapClick(e);
      }
    }
  });
  return null;
}