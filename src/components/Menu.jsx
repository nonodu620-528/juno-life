import React from 'react';
import { SaveManager } from '../engine/SaveManager';

export function Menu({ onStartGame, onContinueGame }) {
  const hasSave = SaveManager.hasSave();

  return (
    <div className="panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: 'none', background: 'transparent', boxShadow: 'none' }}>
      <h1 style={{ 
        fontSize: '4rem', 
        marginBottom: '10px', 
        background: 'linear-gradient(to right, var(--color-happiness), var(--color-money))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0px 0px 15px rgba(16, 185, 129, 0.4))'
      }}>Juno Life</h1>
      <p className="text-muted" style={{ marginBottom: '50px', textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.6' }}>
        Une simulation de vie impitoyable.<br/>
        <strong style={{color: '#fff'}}>1 Tour = 1 An.</strong><br/>
        Jusqu'à ce que la mort vous sépare.
      </p>

      {hasSave && (
        <button className="btn-success" onClick={onContinueGame} style={{ padding: '16px', fontSize: '1.2rem', animation: 'fadeIn 0.5s ease' }}>
          Reprendre la partie
        </button>
      )}

      <button className="btn-primary" onClick={onStartGame} style={{ padding: '16px', fontSize: '1.2rem', marginTop: '10px' }}>
        Nouvelle Partie (2 Joueurs)
      </button>
    </div>
  );
}
