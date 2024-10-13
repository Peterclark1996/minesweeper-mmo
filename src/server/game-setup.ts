import moment from "moment"
import { CellState } from "../types/cell-state"
import { GameState } from "../types/game-state"
import { Mine } from "../types/mine"

export const buildGame = (gridSize: number, mineCount: number) => {
    return {
        gameState: buildGameState(gridSize, mineCount),
        mines: buildMines(gridSize, gridSize, mineCount)
    }
}

const buildGameState = (gridSize: number, mineCount: number): GameState => {
    const now = moment().add(1, "day").startOf("day")

    return {
        gameId: Math.random().toString(),
        nextReset: now.valueOf(),
        mineCount,
        rowCount: gridSize,
        columnCount: gridSize,
        cells: buildGrid(gridSize, gridSize),
        finishState: "playing",
        history: []
    }
}

const buildGrid = (rowCount: number, columnCount: number) => {
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

const buildMines = (rowCount: number, columnCount: number, mineCount: number): Mine[] => {
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
