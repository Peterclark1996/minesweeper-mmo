import { useServer } from "../server-state-provider"
import { Cell } from "./cell"

export const Grid = () => {
    const serverState = useServer()

    if (serverState.status === "loading") {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col border border-gray-400">
            {serverState.grid.cells.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cellState, columnIndex) => (
                        <Cell key={columnIndex} state={cellState} onClick={() => serverState.clickCell(rowIndex, columnIndex)} />
                    ))}
                </div>
            ))}
        </div>
    )
}
