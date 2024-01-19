import * as actionTypes from "../data/actionTypes"
import rhythmID from "./rhythmID"

export default function simulateICD(state, dispatch, heartRates, vRate, aRate) {
  const { first, second, nth } = state.shockEnergy
  const { vt1, vt2, vf } = state.ventricularRates

  // simulate rhythmID
  if (vt1 && vt2 && vf && first && second && nth) {
    rhythmID(state, dispatch, heartRates, vRate, aRate)
  }

  // simulate other ICD parameters
  const currentHeartRate = heartRates[heartRates.length - 1]

  // min heart rate
  if (currentHeartRate < state.minHeartRate.min) {
    dispatch({
      type: actionTypes.UPDATE_IS_FAILED, payload: {
        dialogHeader: "Heart Failure",
        dialogDescription: `Heart rate recorded ${currentHeartRate}bpm is too low. At this rate, the patient becomes unconscious and dies if the shock is not delivered in time.`
      }
    })
  }

  // ubt and nbt rate detection
  const currentTime = new Date().getHours()
  if (currentTime >= 8 && currentTime <= 20) {
    // day time upper heart beat detection
    if (currentHeartRate > state.upperHeartRate) {
      dispatch({
        type: actionTypes.UPDATE_IS_FAILED, payload: {
          dialogHeader: "Heart Failure",
          dialogDescription: `Heart rate recorded ${currentHeartRate}bpm is too high in the day time. At this rate, heart beats too fast and as a result, the organs and tissues may not get enough oxygen.`
        }
      })
    }
  } else if (currentTime >= 0 && currentTime <= 4) {
    // night time upper heart beat detection
    if (currentHeartRate > state.nightHeartRate.max) {
      dispatch({
        type: actionTypes.UPDATE_IS_FAILED, payload: {
          dialogHeader: "Heart Failure",
          dialogDescription: "Heart rate recorded is too high in the night time. This heart rate is not normal and may be a sign of a serious health problem."
        }
      })
    }
    if (currentHeartRate < state.nightHeartRate.min) {
      dispatch({
        type: actionTypes.UPDATE_IS_FAILED, payload: {
          dialogHeader: "Heart Failure",
          dialogDescription: "Heart rate recorded is too low in the night time. It is dangerous to have a heart rate this low."
        }
      })
    }
  }
}