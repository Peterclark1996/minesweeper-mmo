import { createContext, useContext, ReactNode, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { ClientToServerEvents } from "./types/client-to-server-events"
import { GridState } from "./types/grid-state"
import { ServerToClientEvents } from "./types/server-to-client-events"

type loadedState = {
    status: "loaded"
    grid: GridState
    clickCell: (row: number, column: number) => void
}

const loadingState = {
    status: "loading" as const
}

const serverStateContext = createContext<loadedState | typeof loadingState>(loadingState)

type Props = {
    children: ReactNode
}

export const ServerStateProvider = ({ children }: Props) => {
    const [grid, setGrid] = useState<GridState>()
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents>>()

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io()
        setSocket(socket)

        socket.on("connect", () => {
            socket.on("gridUpdated", setGrid)
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const onClickCell = (row: number, column: number) => {
        socket?.emit("clickCell", { row, column })
    }

    const getValue = () => {
        if (grid === undefined || socket === undefined) {
            return loadingState
        }
        return {
            status: "loaded" as const,
            grid: grid,
            clickCell: onClickCell
        }
    }

    return <serverStateContext.Provider value={getValue()}>{children}</serverStateContext.Provider>
}

export const useServer = () => useContext(serverStateContext)
