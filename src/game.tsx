import { useEffect } from "react"
import { io } from "socket.io-client"
import { Grid } from "./components/grid"

export const Game = () => {
    useEffect(() => {
        const socket = io()

        socket.on("connect", () => {
            console.log("Connected to Socket.IO server")

            socket.emit("message", "Hello from client!")
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <main className="flex flex-col items-center gap-2">
            <h1 className="text-2xl">Minesweeper MMO</h1>
            <h2>Only one click per player</h2>
            <Grid rowCount={20} columnCount={20} />
        </main>
    )
}
