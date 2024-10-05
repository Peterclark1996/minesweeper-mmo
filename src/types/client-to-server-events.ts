export type ClientToServerEvents = {
    revealCell: (params: { gameId: string; row: number; column: number }) => void
    flagCell: (params: { gameId: string; row: number; column: number }) => void
    requestUpdate: () => void
}
