// src/components/FloatingButtons.jsx
import React, { useState } from 'react';
import './FloatingButtons.css';

export default function FloatingButtons({ onPinClick }) {
  const [showNotice, setShowNotice] = useState(false);

  const handlePinClick = () => {
    onPinClick(); // call parent handler
    setShowNotice(true);
    setTimeout(() => setShowNotice(false), 3000); // hide notice after 3 seconds
  };

  return (
    <>
      <div className="floating-buttons">
        <button className="btn-pin" onClick={handlePinClick}>
          <span>📍</span> Pin on Map
        </button>
      </div>

      {showNotice && (
        <div className="pin-notice">
          📍 Pin mode active — click anywhere on the map to drop a marker.
        </div>
      )}
    </>
  );
}
