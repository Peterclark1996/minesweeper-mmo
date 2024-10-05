import { useServer } from "../server-state-provider"
import { Countdown } from "./countdown"

export const GameInfo = () => {
    const server = useServer()

    const getContent = () => {
        if (server.status === "loading") {
            return <></>
        }

        return (
            <span className="flex gap-4 text-xs">
                <p>Time left</p>
                <Countdown targetEpoch={server.gameState.nextReset} />
            </span>
        )
    }

    return <div className="">{getContent()}</div>
}
