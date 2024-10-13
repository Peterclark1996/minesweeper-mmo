import { GameState } from "../../types/game-state"
import { useServer } from "../server-state-provider"
import { CellTile } from "./cell-tile"

type Props = {
    currentlyHoveredHistory: GameState["history"][number] | undefined
}

export const Grid = ({ currentlyHoveredHistory }: Props) => {
    const server = useServer()

    return (
        <div className="flex flex-col border border-tile-dark relative">
            {server.gameState.cells.map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {row.map((cellState, columnIndex) => (
                        <CellTile key={columnIndex} cellState={cellState} rowIndex={rowIndex} columnIndex={columnIndex} />
                    ))}
                </div>
            ))}
            {currentlyHoveredHistory && (
                <div
                    className="absolute size-8 outline outline-1 outline-black shadow-[0px_0px_20px_1px_#000000]"
                    style={{ top: `${currentlyHoveredHistory.rowClicked * 2}rem`, left: `${currentlyHoveredHistory.columnClicked * 2}rem` }}
                />
            )}
        </div>
    )
}
