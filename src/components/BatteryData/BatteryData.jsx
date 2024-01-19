import { useState, useEffect } from "react"
import { useStateContext } from "../../StateContext"
import BatteryGauge from "react-battery-gauge"
import { simulateBattery } from "../../actions"
import { batteryCustomization } from "../../data"

const BATTERY_MAX = 100
const DEFAULT_DEPLETION_RATE = 0.1

export default function BatteryData() {
  const [batteryLevel, setBatteryLevel] = useState(BATTERY_MAX)
  const { state, dispatch } = useStateContext()
  const {
    isRunning,
    pulseAmp,
    pulseWidth,
    beeperControl,
    pacingThresholdSetup,
  } = state

  const calculateDepletionRate = () => {
    let totalDepletion = 0
    for (const chamber in pulseAmp) {
      const amp = pulseAmp[chamber]
      const width = pulseWidth[chamber]
      totalDepletion +=
        (amp - pacingThresholdSetup) * 0.05 + (width - 0.4) * 0.02
    }
    return DEFAULT_DEPLETION_RATE + totalDepletion
  }

  useEffect(() => {
    let interval

    if (isRunning) {
      interval = setInterval(() => {
        setBatteryLevel((prevLevel) => {
          const depletionRate = calculateDepletionRate()
          const newLevel = Math.max(0, Math.min(100, prevLevel - depletionRate))

          simulateBattery(beeperControl, dispatch, newLevel)

          return newLevel
        })
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning, pulseAmp, pulseWidth])

  return (
    <BatteryGauge
      value={batteryLevel}
      size={60}
      customization={batteryCustomization}
      onClick={(event) => {
        if (event.detail === 2) {
          setBatteryLevel(BATTERY_MAX)
        }
      }}
    />
  )
}
