// src/components/PinMarker.jsx
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './PinMarker.css'; // ✅ Import styles

function createEmojiIcon() {
  return new L.DivIcon({
    html: `<div class="pin-emoji">👻</div>`,
    iconSize: [24, 24],
    className: 'custom-marker'
  });
}

export default function PinMarker({ pin, onClick }) {
  return (
    <Marker
      position={[pin.lat, pin.lng]}
      icon={createEmojiIcon()}
      eventHandlers={{ click: () => onClick(pin) }}
    >
      <Popup>
        <strong>{pin.title}</strong><br />
        {pin.description}
      </Popup>
    </Marker>
  );
}