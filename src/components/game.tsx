import { Grid } from "./grid"
import { GameInfo } from "./header/game-info"
import { Title } from "./header/title"
import { Players } from "./players-panel/players"

export const Game = () => {
    return (
        <main className="flex flex-col items-center gap-2 h-screen">
            <Title />
            <GameInfo />
            <div className="flex w-full">
                <div className="flex-1" />
                <Grid />
                <Players />
            </div>
        </main>
    )
}
