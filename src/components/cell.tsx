import { CellState } from "../types/cell-state"

type Props = {
    state: CellState
    onClick: () => void
}

export const Cell = ({ state, onClick }: Props) => {
    return (
        <button className="bg-gray-300 size-8 border border-gray-400" onClick={onClick}>
            {state.type === "hidden" ? "" : state.type === "revealed-safe" ? state.adjacentMines : "💣"}
        </button>
    )
}
