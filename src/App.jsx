import React, { useState } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { Menu } from './components/Menu';
import { Dashboard } from './components/Dashboard';
import { EventModal } from './components/EventModal';
import { TaxModal } from './components/TaxModal';
import { PrisonModal } from './components/PrisonModal';
import { PassAndPlay } from './components/PassAndPlay';
import { SaveManager } from './engine/SaveManager';
import { createNewGame } from './engine/GameState';

function App() {
  const engine = useGameEngine();
  const [started, setStarted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [lastPlayerIndex, setLastPlayerIndex] = useState(0);

  const { gameState, activePlayer, activeEvent, globalEvent, resolveEvent, resolveGlobalEvent, taxPhase, prisonPhase, setTaxPhase, processTaxes, resolvePrison } = engine;

  // Detect when active player changes to show Pass & Play screen
  React.useEffect(() => {
    if (gameState && gameState.activePlayerIndex !== lastPlayerIndex) {
      setShowPass(true);
      setLastPlayerIndex(gameState.activePlayerIndex);
    }
  }, [gameState, lastPlayerIndex]);

  const handleStartGame = () => {
    SaveManager.deleteSave();
    engine.resetGame();
    setStarted(true);
  };

  const handleContinueGame = () => {
    setStarted(true);
    if (gameState) setLastPlayerIndex(gameState.activePlayerIndex);
  };

  // If there's no state yet, just show menu or loading
  if (!gameState && started) return <div style={{ color: 'white' }}>Chargement...</div>;

  if (!started) {
    return (
      <div className="app-container">
        <Menu 
          onStartGame={handleStartGame} 
          onContinueGame={handleContinueGame} 
        />
      </div>
    );
  }

  // Handle Tax resolution
  const handleTaxResolve = (choice) => {
    // Process for current active player
    processTaxes(gameState.activePlayerIndex, choice);
    
    // We need both players to pay taxes if it's tax phase
    // A simple way is to swap active player manually here for taxes, or just let them pay next turn
    // For this prototype, let's say the tax modal pops up. Once resolved, we check if the OTHER player needs to pay.
    // If we just ended Q4, player 1 is active (currentQuarter is 1, turn increased).
    
    // For simplicity, we just process it and close modal. In a full version, we'd loop through all players.
    setTaxPhase(false);
  };

  return (
    <div className="app-container">
      {/* UI Principale */}
      <Dashboard engine={engine} />

      {/* Pop-ups & Modals */}
      {showPass && (
        <PassAndPlay 
          nextPlayerName={activePlayer?.name} 
          onReady={() => setShowPass(false)} 
        />
      )}

      {globalEvent && (
        <EventModal event={globalEvent} onResolve={resolveGlobalEvent} />
      )}

      {activeEvent && !globalEvent && (
        <EventModal event={activeEvent} onResolve={resolveEvent} />
      )}

      {taxPhase && !activeEvent && !globalEvent && !showPass && !prisonPhase.active && (
        <TaxModal player={activePlayer} onResolve={handleTaxResolve} />
      )}

      {prisonPhase.active && (
        <PrisonModal phase={prisonPhase} onResolve={resolvePrison} />
      )}
    </div>
  );
}

export default App;
