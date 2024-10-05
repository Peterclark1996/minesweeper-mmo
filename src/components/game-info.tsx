import { Countdown } from "./countdown"

export const GameInfo = () => {
    return (
        <div>
            <span className="flex gap-4 text-xs">
                <p>Time left</p>
                <Countdown />
            </span>
        </div>
    )
}
