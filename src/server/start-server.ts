import * as http from "http"
import moment from "moment"
import { Server as SocketIOServer } from "socket.io"
import { createServer as createViteServer } from "vite"
import { ClientToServerEvents } from "../types/client-to-server-events"
import { ServerToClientEvents } from "../types/server-to-client-events"
import { flagCell, revealCell } from "./game-logic"
import { buildGame } from "./game-setup"
import { generateId } from "./id-generator"

const gridSize = 20
const mineCount = 50
const initialGame = buildGame(gridSize, mineCount)
let mines = initialGame.mines
let gameState = initialGame.gameState

export const startServer = async () => {
    const vite = await createViteServer({
        server: { middlewareMode: true }
    })

    const server = http.createServer()
    server.on("request", vite.middlewares)

    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server)

    io.on("connection", socket => {
        const player = generateId(socket.handshake.address)
        console.log("A user connected: ", player)

        socket.on("disconnect", () => {
            console.log("A user disconnected: ", player)
        })

        if (player === undefined) {
            return
        }

        socket.emit("gameStateUpdated", gameState, player)

        socket.on("revealCell", ({ gameId, row, column }) => {
            if (hasGameExpired()) {
                rebuildGame()
            } else {
                if (gameId === gameState.gameId) {
                    gameState = revealCell(gameState, mines, row, column)
                }
            }

            io.emit("gameStateUpdated", gameState, player)
        })

        socket.on("flagCell", ({ gameId, row, column }) => {
            if (hasGameExpired()) {
                rebuildGame()
            } else {
                if (gameId === gameState.gameId) {
                    gameState = flagCell(gameState, row, column)
                }
            }

            io.emit("gameStateUpdated", gameState, player)
        })

        socket.on("requestUpdate", () => {
            if (hasGameExpired()) {
                rebuildGame()
            }

            socket.emit("gameStateUpdated", gameState, player)
        })
    })

    server.listen(3000, () => {
        console.log("Server is running at http://localhost:3000")
    })
}

const hasGameExpired = () => {
    const now = moment()
    return now.isAfter(gameState.nextReset)
}

const rebuildGame = () => {
    const newGame = buildGame(gridSize, mineCount)
    mines = newGame.mines
    gameState = newGame.gameState
}
