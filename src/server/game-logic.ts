import { ActionResult } from "../types/action-result"
import { CellState } from "../types/cell-state"
import { GameState } from "../types/game-state"
import { Mine } from "../types/mine"

export const flagCell = (gameState: GameState, row: number, column: number): ActionResult => {
    if (!isCellClickable(gameState, row, column)) {
        return {
            updatedGameState: gameState,
            rowClicked: row,
            columnClicked: column,
            actionWasSuccessful: false,
            revealedCell: gameState.cells.at(row)?.at(column)
        }
    }

    const currentCell = gameState.cells.at(row)?.at(column)
    if (currentCell?.type !== "hidden") {
        return {
            updatedGameState: gameState,
            rowClicked: row,
            columnClicked: column,
            actionWasSuccessful: false,
            revealedCell: currentCell
        }
    }

    const cells = updateGridCellImmutably(gameState.cells, row, column, { type: "hidden", flagged: !currentCell?.flagged })
    const updatedGameState = { ...gameState, cells }
    return {
        updatedGameState,
        rowClicked: row,
        columnClicked: column,
        actionWasSuccessful: true,
        revealedCell: cells.at(row)?.at(column)
    }
}

export const revealCell = (gameState: GameState, mines: Mine[], row: number, column: number): ActionResult => {
    if (!isCellClickable(gameState, row, column)) {
        return {
            updatedGameState: gameState,
            rowClicked: row,
            columnClicked: column,
            actionWasSuccessful: false,
            revealedCell: gameState.cells.at(row)?.at(column)
        }
    }

    if (mines.some(mine => mine.x === row && mine.y === column)) {
        const cellsWithRevealedMines = mines.reduce((cells, mine) => {
            const cellAtMineLocation = cells.at(mine.x)?.at(mine.y)
            const isMineAtClickedLocation = mine.x === row && mine.y === column
            if (cellAtMineLocation?.type === "hidden" && cellAtMineLocation.flagged && !isMineAtClickedLocation) {
                return cells
            }

            return updateGridCellImmutably(cells, mine.x, mine.y, { type: "revealed-mine" })
        }, gameState.cells)

        const updatedGameState = {
            ...gameState,
            cells: cellsWithRevealedMines,
            finishState: "lost" as const,
            mines,
            lostCell: { row, column }
        }

        return {
            updatedGameState,
            rowClicked: row,
            columnClicked: column,
            actionWasSuccessful: true,
            revealedCell: cellsWithRevealedMines.at(row)?.at(column)
        }
    }

    const unCheckedCells = [{ row, column }]
    let cellsSoFar = gameState.cells
    while (true) {
        const nextCellToCheck = unCheckedCells.pop()
        if (nextCellToCheck === undefined) {
            const updatedGameState = checkIfGameIsWon({ ...gameState, cells: cellsSoFar }, mines)
            return {
                updatedGameState,
                rowClicked: row,
                columnClicked: column,
                actionWasSuccessful: true,
                revealedCell: cellsSoFar.at(row)?.at(column)
            }
        }

        const adjacentMines = countAdjacentMines(mines, nextCellToCheck.row, nextCellToCheck.column)
        cellsSoFar = updateGridCellImmutably(cellsSoFar, nextCellToCheck.row, nextCellToCheck.column, { type: "revealed-safe", adjacentMines })

        if (adjacentMines !== 0) {
            continue
        }

        const currentState = {
            ...gameState,
            cells: cellsSoFar
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

const isCellClickable = (gameState: GameState, row: number, column: number): boolean => {
    if (row < 0 || column < 0 || row >= gameState.rowCount || column >= gameState.columnCount) {
        return false
    }

    if (gameState.finishState !== "playing") {
        return false
    }

    return gameState.cells.at(row)?.at(column)?.type === "hidden"
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
