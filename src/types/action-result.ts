import { CellState } from "./cell-state"
import { GameState } from "./game-state"

export type ActionResult = {
    updatedGameState: GameState
    rowClicked: number
    columnClicked: number
    actionWasSuccessful: boolean
    revealedCell: CellState | undefined
}
