import { GameInfo } from "./components/game-info"
import { Grid } from "./components/grid"

export const Game = () => {
    return (
        <main className="flex flex-col items-center gap-2">
            <h1 className="text-2xl">Minesweeper MMO</h1>
            <h2>Only one click per player</h2>
            <GameInfo />
            <Grid />
        </main>
    )
}
