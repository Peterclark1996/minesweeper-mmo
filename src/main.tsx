import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Game } from "./game.tsx"
import "./index.css"
import { ServerStateProvider } from "./server-state-provider.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ServerStateProvider>
            <Game />
        </ServerStateProvider>
    </StrictMode>
)
