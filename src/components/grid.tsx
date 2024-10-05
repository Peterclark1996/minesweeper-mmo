import { useServer } from "../server-state-provider"
import { HiddenCellTile } from "./hidden-cell-tile"
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
                    {row.map((cellState, columnIndex) =>
                        cellState.type === "hidden" ? (
                            <HiddenCellTile key={columnIndex} state={cellState} onClick={() => server.clickCell(rowIndex, columnIndex)} />
                        ) : (
                            <RevealedCellTile key={columnIndex} state={cellState} />
                        )
                    )}
                </div>
            ))}
        </div>
    )
}
