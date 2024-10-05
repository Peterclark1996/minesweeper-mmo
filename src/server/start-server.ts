import * as http from "http"
import moment from "moment"
import { Server as SocketIOServer } from "socket.io"
import { createServer as createViteServer } from "vite"
import { ClientToServerEvents } from "../types/client-to-server-events"
import { ServerToClientEvents } from "../types/server-to-client-events"
import { flagCell, revealCell } from "./game-logic"
import { buildMines, buildGameState } from "./game-setup"

const gridSize = 20
const mineCount = 50
let mines = buildMines(gridSize, gridSize, mineCount)
let gameState = buildGameState(gridSize)

export const startServer = async () => {
    const vite = await createViteServer({
        server: { middlewareMode: true }
    })

    const server = http.createServer()
    server.on("request", vite.middlewares)

    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server)

    io.on("connection", socket => {
        console.log("A user connected")

        socket.emit("gameStateUpdated", gameState)

        socket.on("revealCell", ({ gameId, row, column }) => {
            checkIfGameNeedsToBeReset()

            if (gameId === gameState.gameId) {
                gameState = revealCell(gameState, mines, row, column)
            }

            io.emit("gameStateUpdated", gameState)
        })

        socket.on("flagCell", ({ gameId, row, column }) => {
            checkIfGameNeedsToBeReset()

            if (gameId === gameState.gameId) {
                gameState = flagCell(gameState, row, column)
            }

            io.emit("gameStateUpdated", gameState)
        })

        socket.on("requestUpdate", () => {
            checkIfGameNeedsToBeReset()

            socket.emit("gameStateUpdated", gameState)
        })

        socket.on("disconnect", () => {
            console.log("A user disconnected")
        })
    })

    server.listen(3000, () => {
        console.log("Server is running at http://localhost:3000")
    })
}

const checkIfGameNeedsToBeReset = () => {
    const now = moment()
    if (now.isAfter(gameState.nextReset)) {
        rebuildGame()
    }
}

const rebuildGame = () => {
    mines = buildMines(gridSize, gridSize, mineCount)
    gameState = buildGameState(gridSize)
}
