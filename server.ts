import * as http from "http"
import { Server as SocketIOServer } from "socket.io"
import { createServer as createViteServer } from "vite"
import { CellState } from "./src/types/cell-state"
import { ClientToServerEvents } from "./src/types/client-to-server-events"
import { ServerToClientEvents } from "./src/types/server-to-client-events"

const startServer = async () => {
    const vite = await createViteServer({
        server: { middlewareMode: true }
    })

    const server = http.createServer()
    server.on("request", vite.middlewares)

    const io = new SocketIOServer<ClientToServerEvents, ServerToClientEvents>(server)

    const gridSize = 20
    const grid = {
        rowCount: gridSize,
        columnCount: gridSize,
        cells: buildGrid(gridSize, gridSize)
    }

    io.on("connection", socket => {
        console.log("A user connected")

        socket.emit("gridUpdated", grid)

        socket.on("clickCell", ({ row, column }) => {
            console.log(`User clicked cell at row ${row} and column ${column}`)

            io.emit("gridUpdated", grid)
        })

        socket.on("disconnect", () => {
            console.log("A user disconnected")
        })
    })

    server.listen(3000, () => {
        console.log("Server is running at http://localhost:3000")
    })
}

startServer()

const buildGrid = (rowCount: number, columnCount: number) => {
    const cells: CellState[][] = []
    for (let row = 0; row < rowCount; row++) {
        const row: CellState[] = []
        for (let cell = 0; cell < columnCount; cell++) {
            row.push({ type: "hidden", flagged: false })
        }
        cells.push(row)
    }
    return cells
}
