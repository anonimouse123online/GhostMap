// src/components/PinConfirmationModal.jsx
import React from 'react';

export default function PinConfirmationModal({ position, onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -110%)',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        padding: '16px 18px',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        zIndex: 2000,
        textAlign: 'center',
        width: '220px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <p
        style={{
          margin: '0 0 14px 0',
          fontWeight: '600',
          color: '#333',
          fontSize: '15px',
        }}
      >
        📍 Place pin here?
      </p>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => onConfirm(true)}
          style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #4CAF50, #2ECC71)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) =>
            (e.target.style.background = 'linear-gradient(135deg, #5CD65C, #33E699)')
          }
          onMouseOut={(e) =>
            (e.target.style.background = 'linear-gradient(135deg, #4CAF50, #2ECC71)')
          }
        >
          ✅ Yes
        </button>
        <button
          onClick={() => onConfirm(false)}
          style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #ff5f6d, #ff7d7d)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) =>
            (e.target.style.background = 'linear-gradient(135deg, #ff7373, #ff4d4d)')
          }
          onMouseOut={(e) =>
            (e.target.style.background = 'linear-gradient(135deg, #ff5f6d, #ff7d7d)')
          }
        >
          ❌ No
        </button>
      </div>

      {/* Mobile friendly styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -120%) scale(0.95); }
            to { opacity: 1; transform: translate(-50%, -110%) scale(1); }
          }

          @media (max-width: 600px) {
            div[style] {
              width: 180px !important;
              font-size: 14px !important;
              padding: 12px !important;
            }
            div[style] p {
              font-size: 14px !important;
            }
            div[style] button {
              padding: 6px 12px !important;
              font-size: 13px !important;
            }
          }
        `}
      </style>
    </div>
  );
}
