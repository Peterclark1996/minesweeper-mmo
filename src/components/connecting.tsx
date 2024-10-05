import { useState, useEffect } from "react"

export const Connecting = () => {
    const [dotCount, setDotCount] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount(prevCount => (prevCount % 3) + 1)
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            Connecting
            <span style={{ opacity: dotCount >= 1 ? 1 : 0 }}>.</span>
            <span style={{ opacity: dotCount >= 2 ? 1 : 0 }}>.</span>
            <span style={{ opacity: dotCount >= 3 ? 1 : 0 }}>.</span>
        </div>
    )
}
