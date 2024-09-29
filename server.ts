import * as http from "http"
import { Server as SocketIOServer } from "socket.io"
import { createServer as createViteServer } from "vite"

const startServer = async () => {
    const vite = await createViteServer({
        server: { middlewareMode: true }
    })

    const server = http.createServer()
    server.on("request", vite.middlewares)

    const io = new SocketIOServer(server)

    io.on("connection", socket => {
        console.log("A user connected")

        socket.on("message", data => {
            console.log("Received message:", data)
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
