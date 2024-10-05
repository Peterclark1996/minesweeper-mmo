import moment from "moment"
import { useEffect, useState } from "react"

type Props = {
    targetEpoch: number
}

export const Countdown = ({ targetEpoch }: Props) => {
    const [timeLeft, setTimeLeft] = useState<string>("")

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = moment()
            const targetTime = moment(targetEpoch)
            const duration = moment.duration(targetTime.diff(now))

            if (duration.asMilliseconds() <= 0) {
                setTimeLeft("00:00:00")
                clearInterval(intervalId)
            } else {
                const hours = Math.floor(duration.asHours())
                const minutes = Math.floor(duration.minutes())
                const seconds = Math.floor(duration.seconds())

                setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [targetEpoch])

    return <p>{timeLeft}</p>
}
