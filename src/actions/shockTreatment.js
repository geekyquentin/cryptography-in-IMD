import { toast } from "react-toastify"
import { toastOptions, defaultParams } from "../data"

export default function deliverShockTreatment(state, currentHeartRate) {
  const { shockEnergy, shocksPerEpisode } = state
  const { first, second, nth } = shockEnergy

  if (!state.enableTCDetection) {
    toast.error("Tachycardia detection disabled", toastOptions)
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
              toast.error("Heart failure. All shock treatments unsuccessful.")
            }
          } else {
            toast.error("Heart failure. Third shock value is out of range.")
          }
        }
      } else {
        toast.error("Heart failure. Second shock value is out of range.")
      }
    }
  } else {
    toast.error("Heart failure. First shock value is out of range.")
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