import React from 'react';

export function EventModal({ event, onResolve }) {
  if (!event) return null;

  const isGlobal = event.category === 'global';
  const isDanger = event.category === 'illegal' || event.category === 'global';

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ borderColor: isDanger ? 'var(--color-danger)' : 'var(--bg-panel-light)' }}>
        <h2 className="modal-title" style={{ color: isDanger ? 'var(--color-danger)' : 'var(--color-accent)' }}>
          {isGlobal ? "⚠️ ALERTE MONDIALE ⚠️" : "Événement de Vie"}
        </h2>
        <h3 style={{ marginBottom: '15px' }}>{event.title}</h3>
        <p className="modal-desc">{event.description}</p>
        
        {isGlobal ? (
          <button className="btn-primary" onClick={() => onResolve()}>
            Continuer
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {event.choices.map((choice, index) => (
              <button key={index} className="btn-primary" onClick={() => onResolve(index)}>
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
