import { RevealedCell } from "../types/cell-state"

type Props = {
    state: RevealedCell
}

export const RevealedCellTile = ({ state }: Props) => {
    const getContent = () => {
        if (state.type === "revealed-mine") {
            return "*"
        }

        if (state.adjacentMines !== 0) {
            return state.adjacentMines
        }
    }

    const getTextColour = () => {
        if (state.type === "revealed-mine") {
            return ""
        }

        switch (state.adjacentMines) {
            case 1:
                return "text-one"
            case 2:
                return "text-two"
            case 3:
                return "text-three"
            case 4:
                return "text-four"
            case 5:
                return "text-five"
            case 6:
                return "text-six"
            case 7:
                return "text-seven"
            case 8:
                return "text-eight"
        }

        return ""
    }

    return <div className={`flex items-center justify-center bg-tile-mid size-8 border border-tile-dark ${getTextColour()}`}>{getContent()}</div>
}
