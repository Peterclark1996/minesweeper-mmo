type HiddenCell = { type: "hidden"; flagged: boolean }
type RevealedSafeCell = { type: "revealed-safe"; adjacentMines: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 }
type RevealedMineCell = { type: "revealed-mine" }
export type CellState = HiddenCell | RevealedSafeCell | RevealedMineCell
