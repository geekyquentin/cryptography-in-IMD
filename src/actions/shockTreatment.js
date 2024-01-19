import { UPDATE_IS_FAILED } from "../data/actionTypes"

import { toast } from "react-toastify"
import { toastOptions, defaultParams } from "../data"

export default function deliverShockTreatment(state, dispatch, currentHeartRate) {
  const { shockEnergy, shocksPerEpisode } = state
  const { first, second, nth } = shockEnergy

  if (!state.enableTCDetection) {
    dispatch({
      type: UPDATE_IS_FAILED, payload: {
        dialogHeader: "Shock Treatment Failed",
        dialogDescription: "Tachycardia detection is disabled, shock treatment cannot be delivered without tachycardia detection."
      }
    })
    return
  }

  if (!state.rescueShock) {
    dispatch({
      type: UPDATE_IS_FAILED, payload: {
        dialogHeader: "Shock Treatment Failed",
        dialogDescription: "Rescue shock is disabled, shock treatment cannot be delivered without rescue shock."
      }
    })
    return
  }

  const getRandomProbability = () => Math.random()

  const attemptShockTreatment = (shockValue, iteration) => {
    for (let i = 1; i <= shocksPerEpisode; i++) {
      const probability = calculateProbability(
        currentHeartRate,
        200, // TODO: need to change later, the constant value of detection rate
        shockValue,
        shocksPerEpisode,
        iteration
      )

      console.log(getRandomProbability(), probability)
      if (getRandomProbability() <= probability) {
        toast.success(`Shock treatment successful on attempt ${i} with shock value ${shockValue}`)
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

const calculateProbability = (currentHeartRate, tachycardiaDetectionRate, shockValue, iteration) => {
  const baseProbability = 0.8
  const heartRateDifference = Math.abs(currentHeartRate - tachycardiaDetectionRate)
  const shockPenalty = 0.02 * shockValue
  const iterationPenalty = 0.01 * iteration

  const probability = Math.max(
    baseProbability - shockPenalty - iterationPenalty - 0.001 * heartRateDifference,
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