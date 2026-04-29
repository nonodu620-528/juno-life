export const INITIAL_GAME_STATE = {
  players: [
    {
      id: 1,
      name: "Joueur 1",
      age: 18,
      money: 0,
      happiness: 50,
      job: null, // { id: 'carpenter', salary: 1800, monthsWorked: 0, consecutiveYears: 0 }
      status: {
        hasAddiction: false,
        std: false,
        inPrison: false,
        prisonTurnsLeft: 0,
        unemployedDuration: 0, // in months
        unemploymentBenefits: 0, // monthly amount
        marriedTo: null,
        children: 0,
      },
      assets: [],
      history: [], // logs of past events
      stats: {
        totalEarned: 0,
        taxesPaid: 0,
        taxesEvaded: 0
      }
    },
    {
      id: 2,
      name: "Joueur 2",
      age: 18,
      money: 0,
      happiness: 50,
      job: null,
      status: {
        hasAddiction: false,
        std: false,
        inPrison: false,
        prisonTurnsLeft: 0,
        unemployedDuration: 0,
        unemploymentBenefits: 0,
        marriedTo: null,
        children: 0,
      },
      assets: [],
      history: [],
      stats: {
        totalEarned: 0,
        taxesPaid: 0,
        taxesEvaded: 0
      }
    }
  ],
  turn: 1, // 1 turn = 1 year
  currentMonth: 1, // 1 to 12
  activePlayerIndex: 0, // 0 for Joueur 1, 1 for Joueur 2
  globalEvents: [],
  gameOver: false,
  winner: null
};

export function createNewGame() {
  return JSON.parse(JSON.stringify(INITIAL_GAME_STATE));
}
