import * as actionTypes from "../data/actionTypes"
import rhythmID from "./rhythmID"

import { toast } from "react-toastify"
import { toastOptions, defaultParams } from "../data"

export default function simulateICD(state, dispatch, heartRates, vRate, aRate, ...args) {
  const { first, second, nth } = state.shockEnergy
  const { vt1, vt2, vf } = state.ventricularRates

  // simulate rhythmID
  if (vt1 && vt2 && vf && first && second && nth) {
    rhythmID(state, heartRates, vRate, aRate)
  }

  // simulate other ICD parameters
  const { minHeartRate, vtDetection, vt2Detection, vfDetection, shockDose, nightHeartRate, upperHeartRate } = defaultParams

  const currentHeartRate = heartRates[heartRates.length - 1]

  // min heart rate
  if (currentHeartRate < state.minHeartRate.min) {
    dispatch({
      type: actionTypes.UPDATE_IS_FAILED, payload: {
        dialogHeader: "Heart Failure",
        dialogDescription: "Heart rate is too low lmao ded"
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
          dialogDescription: "Heart rate is too low lmao ded"
        }
      })
    }
  } else if (currentTime >= 0 && currentTime <= 4) {
    // night time upper heart beat detection
    if (currentHeartRate > state.nightHeartRate.max) {
      toast.error("Patient has died due to heart failure 2", toastOptions)
    }
    if (currentHeartRate < state.nightHeartRate.min) {
      toast.error("Patient has died due to tachyarrhythmia", toastOptions)
    }
  }
}