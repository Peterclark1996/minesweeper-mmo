import { useServer } from "../server-state-provider"
import { Countdown } from "./countdown"

export const GameInfo = () => {
    const server = useServer()

    const flags = server.gameState.cells.flat().filter(cell => cell.type === "hidden" && cell.flagged).length

    return (
        <div className="flex text-xs gap-12 p-2">
            <span className="flex gap-4 ">
                <p>Flagged Mines</p>
                <p className="w-16">
                    {flags}/{server.gameState.mineCount}
                </p>
            </span>
            <span className="flex gap-4">
                <p>Time left</p>
                <Countdown />
            </span>
        </div>
    )
}
