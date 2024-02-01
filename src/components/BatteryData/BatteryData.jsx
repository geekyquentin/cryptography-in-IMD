import { useEffect, useCallback } from "react"
import { useStateContext } from "../../StateContext"
import BatteryGauge from "react-battery-gauge"
import { simulateBattery } from "../../actions"
import { batteryCustomization, defaultParams } from "../../data"
import { UPDATE_BATTERY_LEVEL } from "../../data/actionTypes"

export default function BatteryData() {
  const { state, dispatch } = useStateContext()
  const {
    isRunning,
    batteryLevel,
    pulseAmp,
    pulseWidth,
    beeperControl,
    pacingThresholdSetup,
  } = state
  const { maxBatteryLevel, defaultDepletionRate } = defaultParams

  const calculateDepletionRate = useCallback(() => {
    let totalDepletion = 0
    for (const chamber in pulseAmp) {
      const amp = pulseAmp[chamber]
      const width = pulseWidth[chamber]
      totalDepletion +=
        (amp - pacingThresholdSetup) * 0.05 + (width - 0.4) * 0.02
    }
    return defaultDepletionRate + totalDepletion
  }, [pulseAmp, pulseWidth, pacingThresholdSetup, defaultDepletionRate])

  useEffect(() => {
    let interval

    if (isRunning) {
      interval = setInterval(() => {
        const newBatteryLevel = batteryLevel - calculateDepletionRate()
        const clampBatteryLevel = Math.max(
          0,
          Math.min(newBatteryLevel, maxBatteryLevel)
        )

        dispatch({
          type: UPDATE_BATTERY_LEVEL,
          payload: clampBatteryLevel,
        })

        simulateBattery(beeperControl, batteryLevel, dispatch)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [
    isRunning,
    pulseAmp,
    pulseWidth,
    beeperControl,
    dispatch,
    calculateDepletionRate,
    batteryLevel,
    maxBatteryLevel,
  ])

  return (
    <BatteryGauge
      value={batteryLevel}
      size={60}
      customization={batteryCustomization}
      onClick={(event) => {
        if (event.detail === 2) {
          dispatch({
            type: UPDATE_BATTERY_LEVEL,
            payload: maxBatteryLevel,
          })
        }
      }}
    />
  )
}
