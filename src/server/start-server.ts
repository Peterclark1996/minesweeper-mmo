import * as http from "http"
import { Server as SocketIOServer } from "socket.io"
import { createServer as createViteServer } from "vite"
import { ClientToServerEvents } from "../types/client-to-server-events"
import { GameState } from "../types/game-state"
import { ServerToClientEvents } from "../types/server-to-client-events"
import { buildGrid, buildMines, flagCell, revealCell } from "./game-logic"

export const startServer = async () => {
    const vite = await createViteServer({
        server: { middlewareMode: true }
    })

    const server = http.createServer()
    server.on("request", vite.middlewares)

    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server)

    const gridSize = 20
    const mines = buildMines(gridSize, gridSize, 40)

    let gameState: GameState = {
        rowCount: gridSize,
        columnCount: gridSize,
        cells: buildGrid(gridSize, gridSize),
        finishState: "playing"
    }

    io.on("connection", socket => {
        console.log("A user connected")

        socket.emit("gameStateUpdated", gameState)

        socket.on("revealCell", ({ row, column }) => {
            gameState = revealCell(gameState, mines, row, column)

            io.emit("gameStateUpdated", gameState)
        })

        socket.on("flagCell", ({ row, column }) => {
            gameState = flagCell(gameState, row, column)

            io.emit("gameStateUpdated", gameState)
        })

        socket.on("disconnect", () => {
            console.log("A user disconnected")
        })
    })

    server.listen(3000, () => {
        console.log("Server is running at http://localhost:3000")
    })
}
