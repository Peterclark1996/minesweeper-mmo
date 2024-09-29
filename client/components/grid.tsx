import { useState } from "react"
import { CellState } from "../../types/cell-state"
import { Cell } from "./cell"

type Props = {
    rowCount: number
    columnCount: number
}

export const Grid = ({ rowCount, columnCount }: Props) => {
    const [cells, setCells] = useState<CellState[][]>(() => {
        const cells: CellState[][] = []
        for (let row = 0; row < rowCount; row++) {
            const row: CellState[] = []
            for (let cell = 0; cell < columnCount; cell++) {
                row.push({ type: "hidden", flagged: false })
            }
            cells.push(row)
        }
        return cells
    })

    const onCellClick = (row: number, column: number) => {
        setCells(oldCells => {
            const newCells = oldCells.map((oldRow, rowIndex) => {
                if (rowIndex !== row) {
                    return oldRow
                }
                return oldRow.map((oldCell, cellIndex) => {
                    if (cellIndex !== column) {
                        return oldCell
                    }
                    return { type: "revealed-safe" as const, adjacentMines: 0 as const }
                })
            })
            return newCells
        })
    }

    return (
        <div className="flex flex-col border border-gray-400">
            {cells.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cellState, columnIndex) => (
                        <Cell key={columnIndex} state={cellState} onClick={() => onCellClick(rowIndex, columnIndex)} />
                    ))}
                </div>
            ))}
        </div>
    )
}
