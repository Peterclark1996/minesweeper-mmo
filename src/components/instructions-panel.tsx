export const InstructionsPanel = () => {
    return (
        <div className="flex flex-1 px-4">
            <div className="flex flex-col p-4 bg-tile-light gap-8">
                <p>Each player can only make one move a day</p>
                <p className="text-sm">The game resets every 24 hours, whether the game is won or not</p>
                <p className="text-sm">Left click to reveal the tile (safe or mine)</p>
                <p className="text-sm">Right click to add or removes a flag (to mark suspected mines)</p>
            </div>
        </div>
    )
}
