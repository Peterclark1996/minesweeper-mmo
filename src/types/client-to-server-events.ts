export type ClientToServerEvents = {
    clickCell: (params: { row: number; column: number }) => void
}
