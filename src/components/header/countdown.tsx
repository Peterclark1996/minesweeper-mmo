import moment from "moment"
import { useEffect, useState } from "react"
import { useServer } from "../../server-state-provider"

export const Countdown = () => {
    const server = useServer()

    const [timeLeft, setTimeLeft] = useState<string>("00:00:00")

    useEffect(() => {
        let canCallForReset = true

        const intervalId = setInterval(() => {
            const now = moment()
            const targetTime = moment(server.gameState.nextReset)
            const duration = moment.duration(targetTime.diff(now))

            if (duration.asMilliseconds() <= 0) {
                setTimeLeft("00:00:00")
                clearInterval(intervalId)

                setTimeout(() => {
                    if (canCallForReset) {
                        server.requestUpdate()
                    }
                }, getRandomDelay())
            } else {
                const hours = Math.floor(duration.asHours())
                const minutes = Math.floor(duration.minutes())
                const seconds = Math.floor(duration.seconds())

                setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
            }
        }, 1000)

        return () => {
            canCallForReset = false
            clearInterval(intervalId)
        }
    }, [server])

    return <p className="w-24">{timeLeft}</p>
}

const getRandomDelay = () => {
    const min = 0
    const max = 3000
    return Math.floor(Math.random() * (max - min + 1)) + min
}
