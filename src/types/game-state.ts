import { CellState } from "./cell-state"

export type GameState = {
    rowCount: number
    columnCount: number
    cells: CellState[][]
    isGameLost: boolean
}
