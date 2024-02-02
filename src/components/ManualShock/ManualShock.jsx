import { useEffect, useState, useCallback, useRef } from "react"
import { useStateContext } from "../../StateContext"
import { STOP_MANUAL_SHOCK, UPDATE_IS_FAILED } from "../../data/actionTypes"
import { defaultParams } from "../../data/"

import { toast } from "react-toastify"
import { toastOptions } from "../../data"

const MANUAL_SHOCK_TIMEOUT = 5000

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

const ManualShock = () => {
  const { state, dispatch } = useStateContext()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [shocksGiven, setShocksGiven] = useState(0)
  const timeoutRef = useRef(null)

  const {
    manualShockStart,
    currentHeartRate,
    manualShockEnergy,
    shocksPerEpisode,
  } = state

  const handleManualShock = useCallback(() => {
    setIsButtonDisabled(true)

    const probability = calculateProbability(
      currentHeartRate,
      manualShockEnergy,
      shocksGiven
    )
    const manualShockSuccess = Math.random() <= probability
    console.log(Math.random(), probability, manualShockSuccess)

    if (manualShockSuccess) {
      dispatch({ type: STOP_MANUAL_SHOCK })
      toast.success("Manual shock successful!", toastOptions)
      setShocksGiven(0)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    } else {
      if (shocksGiven >= shocksPerEpisode) {
        dispatch({
          type: UPDATE_IS_FAILED,
          payload: {
            dialogHeader: "Manual shock failed",
            dialogDescription: "Patient did not respond to manual shock.",
          },
        })
      } else {
        setShocksGiven(shocksGiven + 1)
        dispatch({ type: STOP_MANUAL_SHOCK, payload: currentHeartRate })
        toast.warning("Deliver another shock", toastOptions)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          dispatch({
            type: UPDATE_IS_FAILED,
            payload: {
              dialogHeader: "Manual shock failed",
              dialogDescription: "Shock was not delivered in time.",
            },
          })
        }, MANUAL_SHOCK_TIMEOUT)
      }
    }

    setTimeout(() => {
      setIsButtonDisabled(false)
    }, 1000)
  }, [
    currentHeartRate,
    dispatch,
    manualShockEnergy,
    shocksGiven,
    shocksPerEpisode,
  ])

  useEffect(() => {
    if (manualShockStart) {
      timeoutRef.current = setTimeout(
        () =>
          dispatch({
            type: UPDATE_IS_FAILED,
            payload: {
              dialogHeader: "Manual shock failed",
              dialogDescription: "Shock was not delivered in time.",
            },
          }),
        MANUAL_SHOCK_TIMEOUT
      )

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [manualShockStart, dispatch])

  return (
    <button
      className="btn-secondary-sm"
      onClick={handleManualShock}
      disabled={isButtonDisabled}
    >
      Shock
    </button>
  )
}

export default ManualShock
