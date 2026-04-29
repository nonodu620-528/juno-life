import React from 'react';

export function TaxModal({ player, onResolve }) {
  const currentIncome = player.money;
  const estimatedTax = Math.floor(currentIncome * 0.20);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title text-danger">Fin d'Année : Les Impôts</h2>
        <h3 style={{ marginBottom: '15px' }}>Déclaration Fiscale</h3>
        <p className="modal-desc">
          Il est temps de payer vos impôts pour cette année.<br/><br/>
          Votre patrimoine liquide : <span className="text-money">{currentIncome}€</span><br/>
          Impôt estimé (20%) : <span className="text-danger">-{estimatedTax}€</span>
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="btn-success" onClick={() => onResolve('declare')}>
            Déclarer honnêtement (Payer {estimatedTax}€)
          </button>
          <button className="btn-danger" onClick={() => onResolve('fraud')}>
            Frauder (Payer 0€, risque de contrôle)
          </button>
        </div>
      </div>
    </div>
  );
}
