import { CellState } from "../../types/cell-state"
import { useServer } from "../server-state-provider"
import { HiddenCellTile } from "./hidden-cell-tile"
import { IncorrectFlagCellTile } from "./incorrect-flag-cell-tile"
import { RevealedCellTile } from "./revealed-cell-tile"

type Props = {
    cellState: CellState
    rowIndex: number
    columnIndex: number
}

export const CellTile = ({ cellState, rowIndex, columnIndex }: Props) => {
    const server = useServer()

    if (cellState.type !== "hidden") {
        return (
            <RevealedCellTile
                state={cellState}
                wasMineThatLostTheGame={
                    server.gameState.finishState === "lost" && server.gameState.lostCell.row === rowIndex && server.gameState.lostCell.column === columnIndex
                }
            />
        )
    }

    if (server.gameState.finishState === "lost" && cellState.flagged && !server.gameState.mines.some(mine => mine.x === rowIndex && mine.y === columnIndex)) {
        return <IncorrectFlagCellTile />
    }

    return <HiddenCellTile state={cellState} onReveal={() => server.revealCell(rowIndex, columnIndex)} onFlag={() => server.flagCell(rowIndex, columnIndex)} />
}
