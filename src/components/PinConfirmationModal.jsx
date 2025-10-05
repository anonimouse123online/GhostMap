// src/components/PinConfirmationModal.jsx
import React from 'react';

export default function PinConfirmationModal({ position, onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 2000,
        textAlign: 'center',
      }}
    >
      <p>Place pin here?</p>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button onClick={() => onConfirm(true)} style={{ padding: '6px 12px' }}>✅ Yes</button>
        <button onClick={() => onConfirm(false)} style={{ padding: '6px 12px' }}>❌ No</button>
      </div>
    </div>
  );
}