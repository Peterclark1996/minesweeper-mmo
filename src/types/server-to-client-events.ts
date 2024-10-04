import { GameState } from "./game-state"

export type ServerToClientEvents = {
    gameStateUpdated: (updatedState: GameState) => void
}
