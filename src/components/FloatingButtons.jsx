// src/components/FloatingButtons.jsx
import React from 'react';
import './FloatingButtons.css';

export default function FloatingButtons({ onPinClick }) {
  return (
    <div className="floating-buttons">
      <button className="btn-search" onClick={() => alert('Search coming soon')}>
        <span>🔍</span> Search Location
      </button>
      <button className="btn-pin" onClick={onPinClick}> {/* 👈 This must call onPinClick */}
        <span>📍</span> Pin on Map
      </button>
    </div>
  );
}