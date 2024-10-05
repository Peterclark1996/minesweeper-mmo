import { HiddenCell } from "../types/cell-state"

type Props = {
    state: HiddenCell
    onClick: () => void
}

export const HiddenCellTile = ({ state, onClick }: Props) => {
    return (
        <button className="flex items-center justify-center size-8 bg-gradient-to-br from-tile-light to-tile-dark from-50% to-50%" onClick={onClick}>
            <div className="size-6 bg-tile-mid">{state.flagged ? "`" : ""}</div>
        </button>
    )
}
