import { CellState } from "../types/cell-state"
import { GameState } from "../types/game-state"
import { Mine } from "../types/mine"

export const buildGrid = (rowCount: number, columnCount: number) => {
    const cells: CellState[][] = []
    for (let row = 0; row < rowCount; row++) {
        const row: CellState[] = []
        for (let cell = 0; cell < columnCount; cell++) {
            row.push({ type: "hidden", flagged: false })
        }
        cells.push(row)
    }
    return cells
}

export const buildMines = (rowCount: number, columnCount: number, mineCount: number): Mine[] => {
    if (mineCount > rowCount * columnCount) {
        throw new Error("Number of mines exceeds the number of cells")
    }

    const mines: Mine[] = []
    while (mines.length < mineCount) {
        const x = Math.floor(Math.random() * rowCount)
        const y = Math.floor(Math.random() * columnCount)
        if (!mines.some(mine => mine.x === x && mine.y === y)) {
            mines.push({ x, y })
        }
    }
    return mines
}

export const isCellClickable = (grid: CellState[][], row: number, column: number): boolean => {
    return grid[row][column].type === "hidden"
}

export const revealCell = (gameState: GameState, mines: Mine[], row: number, column: number): GameState => {
    if (!isCellClickable(gameState.cells, row, column)) {
        return gameState
    }

    if (mines.some(mine => mine.x === row && mine.y === column)) {
        return {
            ...gameState,
            cells: mines.reduce((cells, mine) => updateGridCellImmutably(cells, mine.x, mine.y, { type: "revealed-mine" }), gameState.cells),
            isGameLost: true
        }
    }

    return {
        ...gameState,
        cells: updateGridCellImmutably(gameState.cells, row, column, { type: "revealed-safe", adjacentMines: countAdjacentMines(mines, row, column) })
    }
}

const countAdjacentMines = (mines: Mine[], row: number, column: number): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 => {
    const adjacentMineCount = mines.filter(mine => {
        return Math.abs(mine.x - row) <= 1 && Math.abs(mine.y - column) <= 1
    }).length

    return adjacentMineCount as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

const updateGridCellImmutably = (grid: CellState[][], row: number, column: number, newCell: CellState): CellState[][] =>
    grid.map((gridRow, rowIndex) => {
        if (rowIndex === row) {
            return gridRow.map((cell, columnIndex) => (columnIndex === column ? newCell : cell))
        }
        return gridRow
    })
