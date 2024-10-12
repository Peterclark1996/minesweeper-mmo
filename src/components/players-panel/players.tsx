import { useServer } from "../server-state-provider"
import { PlayerCard } from "./player-card"

export const Players = () => {
    const server = useServer()

    const sortedHistory = server.gameState.history.sort((a, b) => a.time - b.time)

    return (
        <div className="flex-1 h-0 min-h-full overflow-y-scroll">
            <ol className="flex flex-col px-4 gap-4">
                {sortedHistory.map((history, index) => (
                    <PlayerCard key={index} history={history} />
                ))}
            </ol>
        </div>
    )
}
