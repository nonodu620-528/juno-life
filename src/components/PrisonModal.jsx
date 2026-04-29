import React from 'react';

export function PrisonModal({ phase, onResolve }) {
  if (!phase || !phase.active) return null;

  const expensiveFine = phase.baseFine * 2;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ borderColor: 'var(--color-danger)', borderStyle: 'solid', borderWidth: 2 }}>
        <h2 className="text-danger">TRIBUNAL</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          Vous êtes poursuivi par la justice pour : <strong>{phase.reason}</strong>.
        </p>
        <p style={{ marginBottom: '30px' }}>
          Vous devez faire face à vos actes. Quelle est votre stratégie de défense ?
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={() => onResolve('expensive')}
            style={{ 
              padding: '15px', 
              backgroundColor: '#2c2c2c', 
              border: '1px solid var(--color-money)',
              textAlign: 'left'
            }}
          >
            <div style={{ fontWeight: 'bold', color: 'var(--color-money)' }}>
              Engager les meilleurs avocats
            </div>
            <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>
              Coût : -{expensiveFine} €<br/>
              Peine : 0 mois de prison (Acquitté grâce aux failles juridiques)
            </div>
          </button>

          <button 
            onClick={() => onResolve('normal')}
            style={{ 
              padding: '15px', 
              backgroundColor: '#2c2c2c', 
              border: '1px solid var(--color-danger)',
              textAlign: 'left'
            }}
          >
            <div style={{ fontWeight: 'bold', color: 'var(--color-danger)' }}>
              Plaider Coupable
            </div>
            <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>
              Amende de base : -{phase.baseFine} €<br/>
              Peine : 6 mois de prison ferme
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
