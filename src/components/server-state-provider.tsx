import { createContext, useContext, ReactNode, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { ClientToServerEvents } from "../types/client-to-server-events"
import { GameState } from "../types/game-state"
import { Player } from "../types/player"
import { ServerToClientEvents } from "../types/server-to-client-events"
import { Connecting } from "./connecting"

type LoadedState = {
    gameState: GameState
    player: Player
    revealCell: (row: number, column: number) => void
    flagCell: (row: number, column: number) => void
    requestUpdate: () => void
}

const serverStateContext = createContext<LoadedState | undefined>(undefined)

type Props = {
    children: ReactNode
}

export const ServerStateProvider = ({ children }: Props) => {
    const [gameState, setGameState] = useState<GameState>()
    const [player, setPlayer] = useState<Player>()
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>()

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()
        setSocket(socket)

        socket.on("connect", () => {
            socket.on("gameStateUpdated", (gameState, player) => {
                setGameState(gameState)
                setPlayer(player)
            })
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    if (gameState === undefined || player === undefined || socket === undefined) {
        return <Connecting />
    }

    return (
        <serverStateContext.Provider
            value={{
                gameState,
                player,
                revealCell: (row, column) => socket?.emit("revealCell", { gameId: gameState.gameId, row, column }),
                flagCell: (row, column) => socket?.emit("flagCell", { gameId: gameState.gameId, row, column }),
                requestUpdate: () => socket?.emit("requestUpdate")
            }}
        >
            {children}
        </serverStateContext.Provider>
    )
}

export const useServer = () => {
    const context = useContext(serverStateContext)

    if (!context) {
        throw new Error("useServer must be used within a <ServerStateProvider />")
    }

    return context
}
