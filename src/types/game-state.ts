import { CellState } from "./cell-state"
import { Mine } from "./mine"
import { Player } from "./player"

export type GameState = {
    gameId: string
    nextReset: number
    mineCount: number
    rowCount: number
    columnCount: number
    cells: CellState[][]
    history: {
        player: Player
        rowClicked: number
        columnClicked: number
        cellStateAfterClick: CellState
        time: number
    }[]
} & (
    | { finishState: "playing" | "won" }
    | {
          finishState: "lost"
          mines: Mine[]
          lostCell: { row: number; column: number }
      }
)
