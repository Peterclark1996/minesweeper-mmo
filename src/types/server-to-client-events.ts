import { GridState } from "./grid-state"

export type ServerToClientEvents = {
    gridUpdated: (updatedGrid: GridState) => void
}
