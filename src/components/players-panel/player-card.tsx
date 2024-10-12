import moment from "moment"
import { useServer } from "../../server-state-provider"
import { GameState } from "../../types/game-state"
import { CellTile } from "../cell-tile"

type Props = {
    history: GameState["history"][number]
}

export const PlayerCard = ({ history }: Props) => {
    const server = useServer()

    return (
        <li className="flex flex-col gap-2 pb-2 bg-tile-light">
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
