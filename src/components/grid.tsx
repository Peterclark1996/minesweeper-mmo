import { useServer } from "../server-state-provider"
import { HiddenCellTile } from "./hidden-cell-tile"
import { IncorrectFlagCellTile } from "./incorrect-flag-cell-tile"
import { RevealedCellTile } from "./revealed-cell-tile"

export const Grid = () => {
    const server = useServer()

    if (server.status === "loading") {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col border border-tile-dark">
            {server.gameState.cells.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cellState, columnIndex) => {
                        if (cellState.type !== "hidden") {
                            return (
                                <RevealedCellTile
                                    key={columnIndex}
                                    state={cellState}
                                    wasMineThatLostTheGame={
                                        server.gameState.finishState === "lost" &&
                                        server.gameState.lostCell.row === rowIndex &&
                                        server.gameState.lostCell.column === columnIndex
                                    }
                                />
                            )
                        }

                        if (
                            server.gameState.finishState === "lost" &&
                            cellState.flagged &&
                            !server.gameState.mines.some(mine => mine.x === rowIndex && mine.y === columnIndex)
                        ) {
                            return <IncorrectFlagCellTile key={columnIndex} />
                        }

                        return (
                            <HiddenCellTile
                                key={columnIndex}
                                state={cellState}
                                onReveal={() => server.revealCell(rowIndex, columnIndex)}
                                onFlag={() => server.flagCell(rowIndex, columnIndex)}
                            />
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
