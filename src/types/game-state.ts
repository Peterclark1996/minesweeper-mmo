import { CellState } from "./cell-state"
import { Mine } from "./mine"

export type GameState = {
    gameId: string
    nextReset: number
    mineCount: number
    rowCount: number
    columnCount: number
    cells: CellState[][]
} & (
    | { finishState: "playing" | "won" }
    | {
          finishState: "lost"
          mines: Mine[]
          lostCell: { row: number; column: number }
      }
)
