import { useServer } from "../server-state-provider"
import { Cell } from "./cell"

export const Grid = () => {
    const server = useServer()

    if (server.status === "loading") {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col border border-gray-400">
            {server.gameState.cells.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cellState, columnIndex) => (
                        <Cell key={columnIndex} state={cellState} onClick={() => server.clickCell(rowIndex, columnIndex)} />
                    ))}
                </div>
            ))}
        </div>
    )
}
