import { useServer } from "../server-state-provider"

export const Players = () => {
    const server = useServer()
    return (
        <span className="flex gap-2 items-center p-4 justify-center">
            <p className="pb-1">{server.player.emoji}</p>
            <p className="text-[0.5rem]">{server.player.id}</p>
        </span>
    )
}
