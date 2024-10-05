import moment from "moment"
import { CellState } from "../types/cell-state"
import { GameState } from "../types/game-state"
import { Mine } from "../types/mine"

export const buildGameState = (gridSize: number): GameState => {
    const now = moment().add(1, "minute").startOf("minute")

    return {
        gameId: Math.random().toString(),
        nextReset: now.valueOf(),
        rowCount: gridSize,
        columnCount: gridSize,
        cells: buildGrid(gridSize, gridSize),
        finishState: "playing"
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
