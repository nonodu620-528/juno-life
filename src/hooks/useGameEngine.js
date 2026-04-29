import { useState, useEffect } from 'react';
import { INITIAL_GAME_STATE, createNewGame } from '../engine/GameState';
import { SaveManager } from '../engine/SaveManager';
import { getRandomEvent, getRandomGlobalEvent } from '../data/EventsDB';

export function useGameEngine() {
  const [gameState, setGameState] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null); 
  const [globalEvent, setGlobalEvent] = useState(null); 
  const [taxPhase, setTaxPhase] = useState(false);
  const [prisonPhase, setPrisonPhase] = useState({ active: false, reason: "", baseFine: 0 });

  useEffect(() => {
    const saved = SaveManager.loadGame();
    if (saved) {
      setGameState(saved);
    } else {
      setGameState(createNewGame());
    }
  }, []);

  useEffect(() => {
    if (gameState) {
      SaveManager.saveGame(gameState);
    }
  }, [gameState]);

  const updatePlayer = (playerIndex, updater) => {
    setGameState(prev => {
      const newState = { ...prev };
      newState.players = [...newState.players];
      newState.players[playerIndex] = { ...newState.players[playerIndex] };
      updater(newState.players[playerIndex]);
      return newState;
    });
  };

  const getActivePlayer = () => {
    if (!gameState) return null;
    return gameState.players[gameState.activePlayerIndex];
  };

  const addHistory = (playerIndex, text) => {
    updatePlayer(playerIndex, (p) => {
      p.history.unshift({ text, turn: gameState.turn, month: gameState.currentMonth });
      if (p.history.length > 50) p.history.pop();
    });
  };

  const advanceMonth = () => {
    if (!gameState) return;

    const player = getActivePlayer();
    
    // Prison Logic
    if (player.status.inPrison && player.status.prisonTurnsLeft > 0) {
      updatePlayer(gameState.activePlayerIndex, p => {
        p.status.prisonTurnsLeft -= 1; // 1 month
        if (p.status.prisonTurnsLeft <= 0) {
          p.status.inPrison = false;
          p.status.prisonTurnsLeft = 0;
          addHistory(gameState.activePlayerIndex, "Vous êtes sorti de prison.");
        } else {
          addHistory(gameState.activePlayerIndex, `En prison... Encore ${p.status.prisonTurnsLeft} mois.`);
        }
      });
      // Skip the rest for this player
      finalizeAdvanceMonth();
      return;
    }

    // Process Job / Income
    if (player.job) {
      const monthlySalary = player.job.salary || 1500;
      updatePlayer(gameState.activePlayerIndex, p => {
        p.money += monthlySalary;
        p.stats.totalEarned += monthlySalary;
        p.job.monthsWorked += 1;
        if (p.job.monthsWorked % 12 === 0) p.job.consecutiveYears++;
      });
      addHistory(gameState.activePlayerIndex, `Salaire perçu : +${monthlySalary}€`);
    } else if (player.status.unemployedDuration > 0 && player.status.unemploymentBenefits > 0) {
      const monthlyBenefits = player.status.unemploymentBenefits;
      updatePlayer(gameState.activePlayerIndex, p => {
        p.money += monthlyBenefits;
        p.status.unemployedDuration -= 1;
      });
      addHistory(gameState.activePlayerIndex, `Chômage perçu : +${monthlyBenefits}€`);
    }
    
    // Process Addictions
    if (player.status.hasAddiction) {
      updatePlayer(gameState.activePlayerIndex, p => {
        p.money -= 500;
        p.happiness -= 5;
      });
    }

    // Check random local events (lower probability per month)
    const event = getRandomEvent(getActivePlayer());
    if (event) {
      setActiveEvent(event);
      return; 
    }
    
    finalizeAdvanceMonth();
  };

  const finalizeAdvanceMonth = () => {
    setGameState(prev => {
      const newState = { ...prev };

      // Pass & Play Logic
      if (newState.activePlayerIndex === 0) {
        newState.activePlayerIndex = 1;
      } else {
        newState.activePlayerIndex = 0;
        newState.currentMonth += 1;

        if (newState.currentMonth > 12) {
          // End of Year
          newState.currentMonth = 1;
          newState.turn += 1;
          
          // Increase age and apply job happiness
          newState.players.forEach((p, idx) => {
            p.age += 1;
            if (p.job && p.job.happinessHit) {
              p.happiness = Math.max(0, Math.min(100, p.happiness + p.job.happinessHit));
              addHistory(idx, `Bilan de l'année (Travail) : Bonheur ${p.job.happinessHit > 0 ? '+' : ''}${p.job.happinessHit}`);
            }
          });
          
          // Trigger Taxes!
          setTaxPhase(true); 
          
          // Global events at end of year
          const gEvent = getRandomGlobalEvent();
          if (gEvent) {
             setGlobalEvent(gEvent);
          }
        }
      }
      return newState;
    });
  };

  const resolveEvent = (choiceIndex) => {
    if (!activeEvent) return;
    const choice = activeEvent.choices[choiceIndex];
    let resultMsg = "";
    let triggerPrisonData = null;
    
    updatePlayer(gameState.activePlayerIndex, (p) => {
      const actionResult = choice.action(p);
      if (typeof actionResult === 'object' && actionResult.prison) {
        resultMsg = actionResult.msg;
        triggerPrisonData = { reason: actionResult.reason, baseFine: actionResult.baseFine };
      } else {
        resultMsg = actionResult;
      }
    });
    
    addHistory(gameState.activePlayerIndex, `Événement: ${activeEvent.title} - ${resultMsg}`);
    setActiveEvent(null);
    
    if (triggerPrisonData) {
      triggerPrison(triggerPrisonData.reason, triggerPrisonData.baseFine);
    } else {
      finalizeAdvanceMonth();
    }
  };

  const resolveGlobalEvent = () => {
    if (!globalEvent) return;
    let resultMsg = "";
    setGameState(prev => {
      const newState = { ...prev };
      resultMsg = globalEvent.effect(newState);
      newState.players[0].history.unshift({ text: `MONDIAL: ${globalEvent.title} - ${resultMsg}`, turn: newState.turn, month: newState.currentMonth });
      newState.players[1].history.unshift({ text: `MONDIAL: ${globalEvent.title} - ${resultMsg}`, turn: newState.turn, month: newState.currentMonth });
      return newState;
    });
    setGlobalEvent(null);
  };

  const triggerPrison = (reason, baseFine) => {
    setPrisonPhase({ active: true, reason, baseFine });
  };

  const resolvePrison = (choice) => {
    // choice is either 'expensive' (0 months, baseFine * 2) or 'normal' (6 months, baseFine)
    const { baseFine } = prisonPhase;
    updatePlayer(gameState.activePlayerIndex, p => {
      p.job = null; // Always lose job if you go to court for a serious crime
      if (choice === 'expensive') {
        const fine = baseFine * 2;
        p.money -= fine;
        p.history.unshift({ text: `Tribunal : Vous avez payé de très bons avocats (-${fine}€). Vous évitez la prison.`, turn: gameState.turn, month: gameState.currentMonth });
      } else {
        p.money -= baseFine;
        p.status.inPrison = true;
        p.status.prisonTurnsLeft = 6;
        p.history.unshift({ text: `Tribunal : Condamné ! Amende de -${baseFine}€ et 6 mois de prison ferme.`, turn: gameState.turn, month: gameState.currentMonth });
      }
    });
    setPrisonPhase({ active: false, reason: "", baseFine: 0 });
    finalizeAdvanceMonth();
  };

  const processTaxes = (playerIndex, choice) => {
    const p = getActivePlayer();
    const currentYearIncome = p.money; // Simplified
    
    if (choice === 'declare') {
      updatePlayer(playerIndex, player => {
        const tax = Math.floor(currentYearIncome * 0.20);
        player.money -= tax;
        player.stats.taxesPaid += tax;
        player.history.unshift({ text: `Impôts payés : -${tax}€`, turn: gameState.turn, month: gameState.currentMonth });
      });
    } else if (choice === 'fraud') {
      const isCaught = Math.random() < 0.10;
      if (isCaught) {
        const fine = Math.floor(currentYearIncome * 0.40); 
        triggerPrison("Fraude Fiscale", fine);
      } else {
        updatePlayer(playerIndex, player => {
          player.stats.taxesEvaded += Math.floor(currentYearIncome * 0.20);
          player.history.unshift({ text: `Fraude fiscale réussie. Aucun impôt payé.`, turn: gameState.turn, month: gameState.currentMonth });
        });
      }
    }
  };

  const quitJob = () => {
    const p = getActivePlayer();
    if (!p.job) return;
    updatePlayer(gameState.activePlayerIndex, player => {
      if (player.job.monthsWorked >= 6) {
        player.status.unemploymentBenefits = Math.floor(player.job.salary * 0.7);
        player.status.unemployedDuration = 12; 
        addHistory(gameState.activePlayerIndex, `Démission. Vous touchez le chômage (${player.status.unemploymentBenefits}€/mois) pendant 1 an.`);
      } else {
        addHistory(gameState.activePlayerIndex, `Démission. Pas assez d'ancienneté pour le chômage.`);
      }
      player.job = null;
    });
  };

  const resetGame = () => {
    const newGame = createNewGame();
    setGameState(newGame);
    SaveManager.saveGame(newGame);
  };

  return {
    gameState,
    activePlayer: getActivePlayer(),
    activeEvent,
    globalEvent,
    taxPhase,
    prisonPhase,
    setTaxPhase,
    advanceMonth,
    resolveEvent,
    resolveGlobalEvent,
    resolvePrison,
    processTaxes,
    quitJob,
    updatePlayer,
    resetGame
  };
}
