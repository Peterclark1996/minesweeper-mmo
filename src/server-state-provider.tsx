import { createContext, useContext, ReactNode, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { ClientToServerEvents } from "./types/client-to-server-events"
import { GameState } from "./types/game-state"
import { ServerToClientEvents } from "./types/server-to-client-events"

type loadedState = {
    status: "loaded"
    gameState: GameState
    revealCell: (row: number, column: number) => void
    flagCell: (row: number, column: number) => void
}

const loadingState = {
    status: "loading" as const
}

const serverStateContext = createContext<loadedState | typeof loadingState>(loadingState)

type Props = {
    children: ReactNode
}

export const ServerStateProvider = ({ children }: Props) => {
    const [gameState, setGameState] = useState<GameState>()
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>()

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()
        setSocket(socket)

        socket.on("connect", () => {
            socket.on("gameStateUpdated", setGameState)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const getValue = (): loadedState | typeof loadingState => {
        if (gameState === undefined || socket === undefined) {
            return loadingState
        }
        return {
            status: "loaded" as const,
            gameState,
            revealCell: (row, column) => socket?.emit("revealCell", { gameId: gameState.gameId, row, column }),
            flagCell: (row, column) => socket?.emit("flagCell", { gameId: gameState.gameId, row, column })
        }
    }

    return <serverStateContext.Provider value={getValue()}>{children}</serverStateContext.Provider>
}

export const useServer = () => useContext(serverStateContext)
