import * as http from "http"
import moment from "moment"
import { Server as SocketIOServer } from "socket.io"
import { createServer as createViteServer } from "vite"
import { ActionResult } from "../types/action-result"
import { ClientToServerEvents } from "../types/client-to-server-events"
import { Player } from "../types/player"
import { ServerToClientEvents } from "../types/server-to-client-events"
import { flagCell, revealCell } from "./game-logic"
import { buildGame } from "./game-setup"
import { generateId } from "./id-generator"

const gridSize = 20
const mineCount = 60
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

    server.listen(3000, () => {
        console.log("Server is running at http://localhost:3000")
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
