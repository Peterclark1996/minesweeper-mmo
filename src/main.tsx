import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Game } from "./components/game.tsx"
import { ServerStateProvider } from "./components/server-state-provider.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ServerStateProvider>
            <Game />
        </ServerStateProvider>
    </StrictMode>
)
