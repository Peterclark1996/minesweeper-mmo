export type ClientToServerEvents = {
    revealCell: (params: { row: number; column: number }) => void
    flagCell: (params: { row: number; column: number }) => void
}
