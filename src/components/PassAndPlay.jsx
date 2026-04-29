import React, { useState } from 'react';

export function PassAndPlay({ nextPlayerName, onReady }) {
  const [show, setShow] = useState(true);

  const handleReady = () => {
    setShow(false);
    onReady();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" style={{ background: 'var(--bg-dark)', zIndex: 200 }}>
      <div className="modal-content" style={{ border: 'none', background: 'transparent' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>À ton tour !</h1>
        <h2 style={{ fontSize: '2rem', color: 'var(--color-accent)', marginBottom: '40px' }}>{nextPlayerName}</h2>
        <p className="text-muted" style={{ marginBottom: '40px' }}>
          Passez l'appareil à {nextPlayerName} pour qu'il puisse jouer son trimestre.
        </p>
        <button className="btn-primary" onClick={handleReady} style={{ padding: '20px', fontSize: '1.2rem' }}>
          Je suis prêt !
        </button>
      </div>
    </div>
  );
}
