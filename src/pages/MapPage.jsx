// src/pages/MapPage.jsx
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { usePins } from '../hooks/usePins';
import PinMarker from '../components/PinMarker';
import FloatingButtons from '../components/FloatingButtons';
import PinConfirmationModal from '../components/PinConfirmationModal';
import PinFormModal from '../components/PinFormModal';
import MapEventHandler from '../components/MapEventHandler'; // ✅

export default function MapPage() {
  const { pins, addPin } = usePins();
  const [isPinMode, setIsPinMode] = useState(false);
  const [tempLocation, setTempLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formPosition, setFormPosition] = useState({ x: 0, y: 0 });

  const handleMapClick = (leafletEvent) => {
    // ✅ leafletEvent.latlng is guaranteed to exist
    const latlng = leafletEvent.latlng;
    const map = leafletEvent.target; // the map instance

    // Convert latlng to pixel position
    const point = map.latLngToContainerPoint(latlng);
    setTempLocation(latlng);
    setFormPosition({ x: point.x, y: point.y });
    setIsPinMode(false);
  };

  const handleAddReport = () => {
    setIsPinMode(true);
  };

  const handleConfirmLocation = (confirm) => {
    if (confirm) {
      setShowForm(true);
    } else {
      setTempLocation(null);
      setShowForm(false);
      setIsPinMode(true);
    }
  };

  const handleSubmit = async (formData) => {
    if (!tempLocation) return;
    await addPin({
      ...formData,
      lat: tempLocation.lat,
      lng: tempLocation.lng
    });
    resetState();
  };

  const resetState = () => {
    setIsPinMode(false);
    setTempLocation(null);
    setShowForm(false);
  };

  return (
    <div className="map-page">
      <MapContainer
        center={[12.8797, 121.7740]}
        zoom={6}
        style={{ height: '100vh', width: '100vw' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* ✅ Handle map events safely */}
        <MapEventHandler onMapClick={handleMapClick} isActive={isPinMode} />

        <FloatingButtons onPinClick={handleAddReport} />

        {pins.map(pin => (
          <PinMarker key={pin.id} pin={pin} onClick={() => {}} />
        ))}

        {tempLocation && !showForm && (
          <PinConfirmationModal
            position={formPosition}
            onConfirm={handleConfirmLocation}
            onCancel={resetState}
          />
        )}

        {showForm && (
          <PinFormModal
            isOpen={true}
            position={formPosition}
            onClose={resetState}
            onSubmit={handleSubmit}
          />
        )}
      </MapContainer>
    </div>
  );
}