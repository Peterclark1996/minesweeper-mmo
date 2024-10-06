import { GameInfo } from "./components/game-info"
import { Grid } from "./components/grid"
import { Players } from "./components/players"
import { Title } from "./components/title"

export const Game = () => {
    return (
        <main className="flex flex-col items-center gap-2">
            <Title />
            <GameInfo />
            <div className="flex w-full">
                <div className="flex-1" />
                <Grid />
                <div className="flex-1">
                    <Players />
                </div>
            </div>
        </main>
    )
}
