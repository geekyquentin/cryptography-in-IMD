import { START_MANUAL_SHOCK, UPDATE_IS_FAILED, UPDATE_THERAPY_ON } from "../data/actionTypes"

import { toast } from "react-toastify"
import { toastOptions, defaultParams } from "../data"
import { depleteBatteryDueToShock } from "./batteryDepletion"

export default function deliverShockTreatment(state, dispatch, currentHeartRate) {
  dispatch({ type: UPDATE_THERAPY_ON, payload: true })

  const { shockEnergy, shocksPerEpisode } = state
  const { first, second, nth } = shockEnergy

  if (state.manualShockStart) {
    return
  }

  if (!state.enableTCDetection) {
    if (state.beeperControl) {
      toast.warning("Tachycardia detected, enabling manual shock", toastOptions)
      dispatch({ type: START_MANUAL_SHOCK, payload: currentHeartRate })
      return
    }

    dispatch({
      type: UPDATE_IS_FAILED, payload: {
        dialogHeader: "Shock Treatment was not delivered",
        dialogDescription: "Tachycardia detected, but the beeper is disabled which prevents the manual shock treatment from being delivered"
      }
    })
  }

  const getRandomProbability = () => Math.random()

  const attemptShockTreatment = (shockValue, episode) => {
    for (let i = 1; i <= shocksPerEpisode; i++) {
      depleteBatteryDueToShock(state.batteryLevel, dispatch, shockValue)
      const probability = calculateAutomaticShockProbability(
        currentHeartRate,
        200, // TODO: need to change later, the constant value of detection rate
        shockValue,
        episode
      )

      if (getRandomProbability() <= probability) {
        toast.success(`Shock treatment successful on attempt ${i} with shock value ${shockValue}`, toastOptions)
        return true
      }
    }
    return false
  }

  const { min, max } = defaultParams.shockDose
  if (first >= min && first <= max) {
    const firstSuccess = attemptShockTreatment(first, 1)
    if (!firstSuccess) {
      if (second > first && second <= max) {
        const secondSuccess = attemptShockTreatment(second, 2)
        if (!secondSuccess) {
          if (nth > second && nth <= max) {
            const nthSuccess = attemptShockTreatment(nth, 3)
            if (!nthSuccess) {
              reportShockTreatmentFailure(dispatch, 3)
            }
          } else {
            reportShockTreatmentFailure(dispatch, 2)
          }
        }
      } else {
        reportShockTreatmentFailure(dispatch, 1)
      }
    }
  } else {
    reportShockTreatmentFailure(dispatch, 0)
  }
}

const calculateAutomaticShockProbability = (currentHeartRate, tachycardiaDetectionRate, shockValue, episode) => {
  const baseProbability = 0.8
  const heartRateDifference = Math.abs(currentHeartRate - tachycardiaDetectionRate)
  const shockPenalty = 0.02 * shockValue
  const episodePenalty = 0.01 * episode

  const probability = Math.max(
    baseProbability - shockPenalty - episodePenalty - 0.001 * heartRateDifference,
    0
  )

  return Math.min(probability, 1)
}

const reportShockTreatmentFailure = (dispatch, iteration) => {
  let dialogDescription = ""
  switch (iteration) {
    case 1:
      dialogDescription = "Second shock is out of range"
      break
    case 2:
      dialogDescription = "Third shock is out of range"
      break
    case 3:
      dialogDescription = "All shock treatments failed"
      break
    default:
      dialogDescription = "First shock is out of range"
  }

  dispatch({
    type: UPDATE_IS_FAILED, payload: {
      dialogHeader: "Shock Treatment Failed",
      dialogDescription
    }
  })
}