import { useServer } from "../../server-state-provider"
import { PlayerCard } from "./player-card"

export const Players = () => {
    const server = useServer()

    const sortedHistory = server.gameState.history.sort((a, b) => a.time - b.time)

    return (
        <ol className="flex flex-1 flex-col px-4 gap-4">
            {sortedHistory.map((history, index) => (
                <PlayerCard key={index} history={history} />
            ))}
        </ol>
    )
}
