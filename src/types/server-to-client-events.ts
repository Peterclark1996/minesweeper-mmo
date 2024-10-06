import { GameState } from "./game-state"
import { Player } from "./player"

export type ServerToClientEvents = {
    gameStateUpdated: (updatedState: GameState, currentPlayer: Player) => void
}
