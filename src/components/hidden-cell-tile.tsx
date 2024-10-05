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
            <div className="flex flex-col size-6 bg-tile-mid ">
                <div className="h-3 w-6 relative overflow-hidden">
                    <p className="size-6 text-three absolute top-0">{state.flagged ? "`" : ""}</p>
                </div>
                <div className="h-3 w-6 relative overflow-hidden">
                    <p className="size-6 absolute bottom-0">{state.flagged ? "`" : ""}</p>
                </div>
            </div>
        </button>
    )
}
