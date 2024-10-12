import { useServer } from "../../server-state-provider"
import { GameState } from "../../types/game-state"

type Props = {
    history: GameState["history"][number]
}

export const PlayerCard = ({ history }: Props) => {
    const server = useServer()

    return (
        <li className="flex gap-2 items-center p-4 bg-tile-light justify-center relative">
            {server.player.id === history.player.id && <p className="text-[0.5rem] text-one absolute top-1 left-1">You</p>}
            <p className="pb-1">{history.player.emoji}</p>
            <p className="text-[0.5rem]">{history.player.id}</p>
        </li>
    )
}
