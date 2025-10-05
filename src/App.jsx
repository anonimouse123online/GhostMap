// src/App.jsx
import React from 'react';
import MapPage from './pages/MapPage';

export default function App() {
  return (
    <div className="app">
      <main className="map-container">
        <MapPage />
      </main>
    </div>
  );
}