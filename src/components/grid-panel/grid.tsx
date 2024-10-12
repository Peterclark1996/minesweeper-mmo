import { useServer } from "../server-state-provider"
import { CellTile } from "./cell-tile"

export const Grid = () => {
    const server = useServer()

    return (
        <div className="flex flex-col border border-tile-dark">
            {server.gameState.cells.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cellState, columnIndex) => (
                        <CellTile key={columnIndex} cellState={cellState} rowIndex={rowIndex} columnIndex={columnIndex} />
                    ))}
                </div>
            ))}
        </div>
    )
}
