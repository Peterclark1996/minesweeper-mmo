import moment from "moment"
import { useEffect, useRef } from "react"
import { GameState } from "../../types/game-state"
import { CellTile } from "../grid-panel/cell-tile"
import { useServer } from "../server-state-provider"

type Props = {
    history: GameState["history"][number]
    isLastUpdate: boolean
    onHistoryHovered: (history: GameState["history"][number] | undefined) => void
}

export const PlayerCard = ({ history, isLastUpdate, onHistoryHovered }: Props) => {
    const server = useServer()

    const ref = useRef<HTMLLIElement>(null)

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    const getBackgroundColor = () => {
        if (isLastUpdate && server.gameState.finishState === "won") {
            return "bg-tile-green"
        }

        if (isLastUpdate && server.gameState.finishState === "lost") {
            return "bg-tile-red"
        }

        if (history.cellStateAfterClick.type === "revealed-safe" && history.cellStateAfterClick.adjacentMines === 0) {
            return "bg-tile-blue"
        }

        return "bg-tile-light"
    }

    return (
        <li
            ref={ref}
            className={`flex flex-col gap-2 pb-2 ${getBackgroundColor()}`}
            onMouseEnter={() => onHistoryHovered(history)}
            onMouseLeave={() => onHistoryHovered(undefined)}
        >
            <span className="flex justify-between">
                <p className=" text-[0.5rem] text-one p-1">{moment(history.time).format("HH:mm")}</p>
                <span className="flex gap-2 justify-center items-center">
                    <p className="pb-1">{history.player.emoji}</p>
                    <p className="text-[0.5rem]">{history.player.id}</p>
                </span>
                {server.player.id === history.player.id && <p className="text-[0.5rem] text-two p-1">You</p>}
            </span>
            <span className="flex gap-2 justify-center items-center">
                <p className="text-[0.5rem]">Row</p>
                <p className="text-[0.5rem]">{history.rowClicked}</p>
                <p className="text-[0.5rem]">Column</p>
                <p className="text-[0.5rem]">{history.columnClicked}</p>
                <CellTile cellState={history.cellStateAfterClick} rowIndex={history.rowClicked} columnIndex={history.columnClicked} />
            </span>
        </li>
    )
}
