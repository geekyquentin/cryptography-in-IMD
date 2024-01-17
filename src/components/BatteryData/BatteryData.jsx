import { useState, useEffect } from "react"
import { useStateContext } from "../../StateContext"
import "./BatteryData.scss"
import { simulateBattery } from "../../actions"

const BATTERY_MAX = 100
const DEFAULT_DEPLETION_RATE = 0.1

export default function BatteryData() {
  const [batteryLevel, setBatteryLevel] = useState(BATTERY_MAX)
  const { state } = useStateContext()
  const { pulseAmp, pulseWidth } = state

  const calculateDepletionRate = () => {
    let totalDepletion = 0
    for (const chamber in pulseAmp) {
      const amp = pulseAmp[chamber]
      const width = pulseWidth[chamber]
      totalDepletion += (amp - 2.5) * 0.05 + (width - 0.4) * 0.02
    }
    return DEFAULT_DEPLETION_RATE + totalDepletion
  }

  useEffect(() => {
    let interval = setInterval(() => {
      const depletionRate = calculateDepletionRate()
      setBatteryLevel((prevLevel) =>
        Math.max(0, Math.min(100, prevLevel - depletionRate))
      )

      if (batteryLevel > 0) {
        simulateBattery(state, batteryLevel)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [pulseAmp, pulseWidth])

  return (
    <div className="battery-stat">
      <h2>
        Battery Level:{" "}
        <span
          className={`battery-stat__color-${
            batteryLevel < 20 ? "red" : "green"
          }`}
        >
          {batteryLevel}%
        </span>
      </h2>
    </div>
  )
}
