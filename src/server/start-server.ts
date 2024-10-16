import * as http from "http"
import moment from "moment"
import handler from "serve-handler"
import { Server as SocketIOServer } from "socket.io"
import { ActionResult } from "../types/action-result"
import { ClientToServerEvents } from "../types/client-to-server-events"
import { Player } from "../types/player"
import { ServerToClientEvents } from "../types/server-to-client-events"
import { flagCell, revealCell } from "./game-logic"
import { buildGame } from "./game-setup"
import { generateId } from "./id-generator"

const environment = process.env.NODE_ENV ?? "development"

const gridSize = 20
const mineCount = 60
const initialGame = buildGame(gridSize, mineCount)
let mines = initialGame.mines
let gameState = initialGame.gameState

export const startServer = async () => {
    const server = http.createServer()
    if (environment === "development") {
        const { createServer: createViteServer } = await import("vite")
        const vite = await createViteServer({
            server: { middlewareMode: true }
        })
        server.on("request", vite.middlewares)
    } else {
        server.on("request", (req, res) => {
            return handler(req, res, { public: "dist" })
        })
    }

    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server)

    io.on("connection", socket => {
        const address = socket.handshake.address
        const forwardedFor = [socket.handshake?.headers["x-forwarded-for"]].flat()[0]?.split(",")[0]

        const player = generateId(address ?? forwardedFor)
        console.log("A user connected: ", player)

        socket.on("disconnect", () => {
            console.log("A user disconnected: ", player)
        })

        if (player === undefined) {
            return
        }

        socket.emit("gameStateUpdated", gameState, player)

        const attemptPlayerAction = (gameId: string, actionF: () => ActionResult) => {
            if (hasGameExpired()) {
                rebuildGame()
            } else {
                const isCorrectGame = gameId === gameState.gameId
                const hasPlayerAlreadyClicked = gameState.history.find(history => history.player.id === player.id) !== undefined

                if (isCorrectGame && !hasPlayerAlreadyClicked) {
                    const actionResult = actionF()
                    gameState = actionResult.updatedGameState
                }
            }

            io.emit("gameStateUpdated", gameState, player)
        }

        socket.on("revealCell", ({ gameId, row, column }) =>
            attemptPlayerAction(
                gameId,
                withHistory(player, () => revealCell(gameState, mines, row, column))
            )
        )

        socket.on("flagCell", ({ gameId, row, column }) =>
            attemptPlayerAction(
                gameId,
                withHistory(player, () => flagCell(gameState, row, column))
            )
        )

        socket.on("requestUpdate", () => {
            if (hasGameExpired()) {
                rebuildGame()
            }

            socket.emit("gameStateUpdated", gameState, player)
        })
    })

    server.listen(8080, "0.0.0.0", () => {
        console.log(`Server is running in '${environment}' mode at http://localhost:8080`)
    })
}

const withHistory =
    (player: Player, actionF: () => ActionResult): (() => ActionResult) =>
    () => {
        const actionResult = actionF()

        if (!actionResult.actionWasSuccessful || actionResult.revealedCell === undefined) {
            return actionResult
        }

        const updatedGameState = {
            ...actionResult.updatedGameState,
            history: [
                ...gameState.history,
                {
                    player,
                    rowClicked: actionResult.rowClicked,
                    columnClicked: actionResult.columnClicked,
                    cellStateAfterClick: actionResult.revealedCell,
                    time: moment().valueOf()
                }
            ]
        }

        return {
            ...actionResult,
            updatedGameState
        }
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
