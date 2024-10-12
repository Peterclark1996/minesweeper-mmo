import { useServer } from "../../server-state-provider"
import { Countdown } from "./countdown"

export const GameInfo = () => {
    const server = useServer()

    const flags = server.gameState.cells.flat().filter(cell => cell.type === "hidden" && cell.flagged).length

    const getGameStateInfo = () => {
        if (server.gameState.finishState === "lost") {
            return <span className="text-three">Game Lost!</span>
        }
        if (server.gameState.finishState === "won") {
            return <span className="text-two">Game Won!</span>
        }
        return (
            <>
                <p>Flagged Mines</p>
                <p className="w-16">
                    {flags}/{server.gameState.mineCount}
                </p>
            </>
        )
    }

    return (
        <div className="flex text-xs gap-12">
            <span className="flex gap-4 ">{getGameStateInfo()}</span>
            <span className="flex gap-4">
                <p>Time left</p>
                <Countdown />
            </span>
        </div>
    )
}
