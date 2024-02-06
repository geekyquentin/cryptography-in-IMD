import { useState, useCallback } from "react"
import { useStateContext } from "../../StateContext"
import { STOP_RESCUE_SHOCK, UPDATE_IS_FAILED } from "../../data/actionTypes"
import { defaultParams } from "../../data/"
import { toast } from "react-toastify"
import { toastOptions } from "../../data"
import { depleteBatteryDueToShock } from "../../actions"

const calculateProbability = (
  currentHeartRate,
  manualShockEnergy,
  shocksGiven
) => {
  const baseProbability = 0.8
  const thresholdShockEnergy = calculateThresholdShockEnergy(currentHeartRate)
  const shockEnergyDeviation = manualShockEnergy - thresholdShockEnergy

  const shocksPenalty = 0.002 * shocksGiven
  const deviationPenalty = 0.001 * Math.abs(shockEnergyDeviation)

  let probability = baseProbability + shocksPenalty - deviationPenalty

  return Math.min(Math.max(probability, 0), 1)
}

const calculateThresholdShockEnergy = (currentHeartRate) => {
  const baseThreshold = 30
  const heartRateMultiplier = 0.5

  const { min, max } = defaultParams.shockDose

  let thresholdShockEnergy =
    baseThreshold + heartRateMultiplier * currentHeartRate

  thresholdShockEnergy = Math.max(min, Math.min(max, thresholdShockEnergy))

  return thresholdShockEnergy
}

const RescueShock = () => {
  const { state, dispatch } = useStateContext()
  const [isCharging, setIsCharging] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const {
    rescueShockStart,
    therapyOn,
    currentHeartRate,
    rescueShockEnergy,
    batteryLevel,
  } = state

  const handleShock = useCallback(() => {
    setIsCharging(true)
    setIsButtonDisabled(true)
    depleteBatteryDueToShock(batteryLevel, dispatch, rescueShockEnergy)

    setTimeout(() => {
      const probability = calculateProbability(
        currentHeartRate,
        rescueShockEnergy,
        defaultParams.shockDose.max
      )
      const shockSuccess = Math.random() <= probability
      console.log(Math.random(), probability, shockSuccess)

      if (shockSuccess) {
        // dispatch({ type: STOP_RESCUE_SHOCK })
        toast.success("Rescue shock successful!", toastOptions)
      } else {
        dispatch({
          type: UPDATE_IS_FAILED,
          payload: {
            dialogHeader: "Rescue shock failed",
            dialogDescription: "Patient did not respond to the shock.",
          },
        })
      }

      setIsCharging(false)
      setIsButtonDisabled(false)
    }, defaultParams.rescueShockChargingTime * 1000)
  }, [currentHeartRate, dispatch, rescueShockEnergy, batteryLevel])

  return (
    <div>
      <button
        className="btn-secondary-sm btn-circular"
        onClick={handleShock}
        disabled={
          isButtonDisabled ||
          isCharging ||
          !rescueShockStart ||
          (therapyOn && !rescueShockStart)
        }
      >
        {isCharging ? "Charging..." : "Start Rescue Shock"}
      </button>
    </div>
  )
}

export default RescueShock
