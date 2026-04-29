import React, { useState } from 'react';
import { JOBS_DB } from '../data/JobsDB';

export function Dashboard({ engine }) {
  const { 
    gameState, activePlayer, advanceMonth, quitJob, updatePlayer 
  } = engine;

  const [showJobs, setShowJobs] = useState(false);

  if (!activePlayer) return null;

  const handleApplyJob = (jobId) => {
    const jobData = JOBS_DB[jobId];
    if (activePlayer.age >= jobData.requiredAge) {
      updatePlayer(gameState.activePlayerIndex, p => {
        p.job = {
          id: jobId,
          title: jobData.title,
          salary: jobData.baseSalary,
          monthsWorked: 0,
          consecutiveYears: 0
        };
        p.history.unshift({ text: `Vous avez été embauché comme ${jobData.title} !`, turn: gameState.turn, month: gameState.currentMonth });
      });
      setShowJobs(false);
    } else {
      alert(`Vous devez avoir ${jobData.requiredAge} ans pour ce poste.`);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header-info">
        <div className="player-badge">
          <h2>Joueur {gameState.activePlayerIndex + 1}</h2>
          <span className="age-badge">{activePlayer.age} ans</span>
        </div>
        <div className="time-info">
          <span>Année {gameState.turn}</span>
          <span className="quarter-badge">Mois {gameState.currentMonth}/12</span>
        </div>
      </div>

      <div className="gauge-container panel">
        <div className="gauge">
          <span>Banque :</span>
          <span className="text-money" style={{ fontSize: '1.2rem' }}>{activePlayer.money} €</span>
        </div>
        <div className="gauge">
          <span>Bonheur :</span>
          <div className="happiness-bar-bg">
            <div 
              className="happiness-bar-fill" 
              style={{ width: `${Math.max(0, Math.min(100, activePlayer.happiness))}%`, backgroundColor: activePlayer.happiness < 30 ? 'var(--color-danger)' : 'var(--color-happiness)' }}
            />
          </div>
          <span style={{ marginLeft: '10px' }}>{activePlayer.happiness} / 100</span>
        </div>
      </div>

      <div className="panel">
        <h3 style={{ marginBottom: '10px' }}>Carrière</h3>
        {activePlayer.job ? (
          <div>
            <p><strong>Poste:</strong> {activePlayer.job.title}</p>
            <p className="text-money"><strong>Salaire:</strong> {activePlayer.job.salary} € / mois</p>
            <p className="text-muted">Ancienneté : {Math.floor(activePlayer.job.monthsWorked / 12)} ans</p>
            <button className="btn-danger" onClick={quitJob} style={{ marginTop: '10px' }}>Démissionner</button>
          </div>
        ) : (
          <div>
            <p className="text-danger" style={{ marginBottom: '10px' }}>Sans emploi</p>
            {activePlayer.status.unemployedDuration > 0 && (
              <p className="text-money" style={{ marginBottom: '10px' }}>Allocations: +{activePlayer.status.unemploymentBenefits} €/mois ({Math.ceil(activePlayer.status.unemployedDuration)} mois restants)</p>
            )}
            <button className="btn-success" onClick={() => setShowJobs(!showJobs)}>Chercher un emploi</button>
            
            {showJobs && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
                {Object.values(JOBS_DB).map(j => (
                  <button key={j.id} onClick={() => handleApplyJob(j.id)}>
                    {j.title} ({j.baseSalary}€/m) - Min {j.requiredAge} ans
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {activePlayer.status.inPrison && (
        <div className="panel" style={{ borderColor: 'var(--color-danger)', borderWidth: 2, borderStyle: 'solid' }}>
          <h3 className="text-danger">EN PRISON</h3>
          <p>Il vous reste {activePlayer.status.prisonTurnsLeft} mois à purger.</p>
        </div>
      )}

      {activePlayer.status.hasAddiction && (
        <div className="panel" style={{ borderColor: 'var(--color-danger)', borderWidth: 1, borderStyle: 'solid' }}>
          <h3 className="text-danger">ADDICTION</h3>
          <p className="text-muted">Vous coûte 500€ et 5 Bonheur par mois.</p>
        </div>
      )}

      <button className="btn-primary" onClick={advanceMonth} style={{ padding: '20px', fontSize: '1.2rem', marginTop: 'auto' }}>
        {activePlayer.status.inPrison ? "Purger un mois de peine" : "Passer le mois"}
      </button>

      <div className="history-log" style={{ marginTop: '15px' }}>
        <h3>Journal</h3>
        {activePlayer.history.slice(0, 10).map((log, i) => (
          <div key={i} className="history-item">
            <span className="text-muted">[A{log.turn} M{log.month}] </span>
            {log.text}
          </div>
        ))}
      </div>
    </div>
  );
}
