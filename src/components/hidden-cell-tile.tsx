import { HiddenCell } from "../types/cell-state"

type Props = {
    state: HiddenCell
    onReveal: () => void
    onFlag: () => void
}

export const HiddenCellTile = ({ state, onReveal, onFlag }: Props) => {
    const onContextMenu = (event: React.MouseEvent) => {
        event.preventDefault()
        onFlag()
    }

    return (
        <button
            className="flex items-center justify-center size-8 bg-gradient-to-br from-tile-light to-tile-dark from-50% to-50%"
            onClick={onReveal}
            onContextMenu={onContextMenu}
        >
            <div className="size-6 bg-tile-mid">{state.flagged ? "`" : ""}</div>
        </button>
    )
}
