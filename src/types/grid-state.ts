import { CellState } from "./cell-state"

export type GridState = {
    rowCount: number
    columnCount: number
    cells: CellState[][]
}
