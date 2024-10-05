import { CellState } from "../types/cell-state"
import { GameState } from "../types/game-state"
import { Mine } from "../types/mine"

const allDirections = [
    { row: -1, column: -1 },
    { row: -1, column: 0 },
    { row: -1, column: 1 },
    { row: 0, column: -1 },
    { row: 0, column: 1 },
    { row: 1, column: -1 },
    { row: 1, column: 0 },
    { row: 1, column: 1 }
] as const

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

export const isCellClickable = (gameState: GameState, row: number, column: number): boolean => {
    if (row < 0 || column < 0 || row >= gameState.rowCount || column >= gameState.columnCount) {
        return false
    }

    if (gameState.finishState !== "playing") {
        return false
    }

    return gameState.cells.at(row)?.at(column)?.type === "hidden"
}

export const flagCell = (gameState: GameState, row: number, column: number): GameState => {
    if (!isCellClickable(gameState, row, column)) {
        return gameState
    }

    const currentCell = gameState.cells.at(row)?.at(column)
    if (currentCell?.type !== "hidden") {
        return gameState
    }

    const cells = updateGridCellImmutably(gameState.cells, row, column, { type: "hidden", flagged: !currentCell?.flagged })
    return { ...gameState, cells }
}

export const revealCell = (gameState: GameState, mines: Mine[], row: number, column: number): GameState => {
    if (!isCellClickable(gameState, row, column)) {
        return gameState
    }

    if (mines.some(mine => mine.x === row && mine.y === column)) {
        return {
            ...gameState,
            cells: mines.reduce((cells, mine) => updateGridCellImmutably(cells, mine.x, mine.y, { type: "revealed-mine" }), gameState.cells),
            finishState: "lost",
            mines,
            lostCell: { row, column }
        }
    }

    const unCheckedCells = [{ row, column }]
    let cellsSoFar = gameState.cells
    while (true) {
        const nextCellToCheck = unCheckedCells.pop()
        if (nextCellToCheck === undefined) {
            return checkIfGameIsWon({ ...gameState, cells: cellsSoFar }, mines)
        }

        const adjacentMines = countAdjacentMines(mines, nextCellToCheck.row, nextCellToCheck.column)
        cellsSoFar = updateGridCellImmutably(cellsSoFar, nextCellToCheck.row, nextCellToCheck.column, { type: "revealed-safe", adjacentMines })

        if (adjacentMines !== 0) {
            continue
        }

        const currentState = {
            ...gameState,
            cells: JSON.parse(JSON.stringify(cellsSoFar))
        }

        allDirections.forEach(direction => {
            const newRow = nextCellToCheck.row + direction.row
            const newColumn = nextCellToCheck.column + direction.column
            if (isCellClickable(currentState, newRow, newColumn)) {
                unCheckedCells.push({ row: newRow, column: newColumn })
            }
        })
    }
}

const checkIfGameIsWon = (gameState: GameState, mines: Mine[]): GameState => {
    const remainingTiles = gameState.cells.flat().filter(cell => cell.type === "hidden").length

    if (remainingTiles === mines.length) {
        return {
            ...gameState,
            finishState: "won"
        }
    }

    return gameState
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
