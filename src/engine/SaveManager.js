const SAVE_KEY = 'juno_life_save';

export const SaveManager = {
  saveGame: (gameState) => {
    try {
      const serializedState = JSON.stringify(gameState);
      localStorage.setItem(SAVE_KEY, serializedState);
      return true;
    } catch (e) {
      console.error("Failed to save game state:", e);
      return false;
    }
  },

  loadGame: () => {
    try {
      const serializedState = localStorage.getItem(SAVE_KEY);
      if (serializedState === null) {
        return null;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.error("Failed to load game state:", e);
      return null;
    }
  },

  deleteSave: () => {
    try {
      localStorage.removeItem(SAVE_KEY);
      return true;
    } catch (e) {
      console.error("Failed to delete save:", e);
      return false;
    }
  },

  hasSave: () => {
    return localStorage.getItem(SAVE_KEY) !== null;
  }
};
