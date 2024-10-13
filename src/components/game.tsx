import { useState } from "react"
import { GameState } from "../types/game-state"
import { Grid } from "./grid-panel/grid"
import { GameInfo } from "./header/game-info"
import { Title } from "./header/title"
import { InstructionsPanel } from "./instructions-panel"
import { Players } from "./players-panel/players"

export const Game = () => {
    const [currentlyHoveredHistory, setCurrentlyHoveredHistory] = useState<GameState["history"][number]>()

    return (
        <main className="flex flex-col items-center gap-2 h-screen">
            <Title />
            <GameInfo />
            <div className="flex w-full">
                <InstructionsPanel />
                <Grid currentlyHoveredHistory={currentlyHoveredHistory} />
                <Players onHistoryHovered={setCurrentlyHoveredHistory} />
            </div>
        </main>
    )
}
