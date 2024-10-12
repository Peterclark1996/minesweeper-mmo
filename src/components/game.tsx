import { GameInfo } from "./game-info"
import { Grid } from "./grid"
import { Players } from "./players-panel/players"
import { Title } from "./title"

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
