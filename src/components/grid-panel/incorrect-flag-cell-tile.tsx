export const IncorrectFlagCellTile = () => {
    return (
        <div className="flex items-center justify-center size-8 border bg-tile-mid border-tile-dark relative">
            *
            <div className="h-8 w-px bg-three absolute rotate-45" />
            <div className="h-8 w-px bg-three absolute -rotate-45" />
        </div>
    )
}
