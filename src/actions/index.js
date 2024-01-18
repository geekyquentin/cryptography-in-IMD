import * as actionTypes from "../data/actionTypes"
import deliverShockTreatment from "./shockTreatment"
import rhythmID from "./rhythmID"
import { toast } from "react-toastify"
import { toastOptions, defaultParams } from "../data"

export { default as simulateBattery } from "./batteryDepletion"

export const simulateICD = (state, dispatch, heartRates, vRate, aRate) => {
  const { first, second, nth } = state.shockEnergy
  const { vt1, vt2, vf } = state.ventricularRates
  const { isFailed } = state

  // simulate rhythmID
  if (vt1 && vt2 && vf && first && second && nth) {
    rhythmID(state, heartRates, vRate, aRate, deliverShockTreatment)
  }

  // simulate other ICD parameters
  const { minHeartRate, vtDetection, vt2Detection, vfDetection, shockDose, nightHeartRate, upperHeartRate } = defaultParams

  const currentHeartRate = heartRates[heartRates.length - 1]

  // min heart rate
  if (currentHeartRate < state.minHeartRate.min) {
    dispatch({ type: actionTypes.UPDATE_IS_FAILED, payload: true })
  }

  // ubt and nbt rate detection
  const currentTime = new Date().getHours()
  if (currentTime >= 8 && currentTime <= 20) {
    // day time upper heart beat detection
    if (currentHeartRate > state.upperHeartRate) {

    }
  } else if (currentTime >= 0 && currentTime <= 4) {
    // night time upper heart beat detection
    if (currentHeartRate > state.nightHeartRate.max) {
      toast.error("Patient has died due to heart failure", toastOptions)
    }
    if (currentHeartRate < state.nightHeartRate.min) {
      toast.error("Patient has died due to tachyarrhythmia", toastOptions)
    }
  }
}

export const executeCommand = (state, dispatch, command) => {
  const [action, parameter, value] = command.split(" ")
  if (!action || !parameter || !value) {
    toast.error("Invalid command", toastOptions)
    return
  }

  const { minHeartRate, vtDetection, vt2Detection, vfDetection, shockDose, nightHeartRate, upperHeartRate } = defaultParams
  const { UPDATE_MIN_HEART_RATE, UPDATE_VENTRICULAR_RATES, UPDATE_TC_DETECTION, UPDATE_UPPER_HEART_RATE, UPDATE_NIGHT_HEART_RATE, UPDATE_MIN_HEART_RATE_AFTER_SHOCK, UPDATE_MODE_SWITCH, UPDATE_PULSE_AMP, UPDATE_PULSE_WIDTH, UPDATE_SHOCK_ENERGY, UPDATE_ENABLE_TC_DETECTION, UPDATE_BEEPER_CONTROL, UPDATE_SHOCKS_PER_EPISODE } = actionTypes

  switch (action) {
    case "SET":
      switch (parameter) {
        case "BT":
          if (minHeartRate.max < value) {
            toast.error("Min heart rate must be less than " + minHeartRate.max, toastOptions)
            return
          }
          dispatch({ type: UPDATE_MIN_HEART_RATE, payload: value })
          toast.success("Min heart rate set to " + value, toastOptions)
          break

        case "VT1GT":
          dispatch({ type: UPDATE_VENTRICULAR_RATES, payload: { vt1: value } })
          toast.success("VT1 rate set to " + value, toastOptions)
          break

        case "VT2GT":
          dispatch({ type: UPDATE_VENTRICULAR_RATES, payload: { vt2: value } })
          toast.success("VT2 rate set to " + value, toastOptions)
          break

        case "VFGT":
          dispatch({ type: UPDATE_VENTRICULAR_RATES, payload: { vf: value } })
          toast.success("VF rate set to " + value, toastOptions)
          break

        case "VT1":
          dispatch({ type: UPDATE_TC_DETECTION, payload: { vt1: value } })
          toast.success("VT1 counter set to " + value, toastOptions)
          break

        case "VT2":
          dispatch({ type: UPDATE_TC_DETECTION, payload: { vt2: value } })
          toast.success("VT2 counter set to " + value, toastOptions)
          break

        case "VT1RE":
          dispatch({ type: UPDATE_TC_DETECTION, payload: { vt1Re: value } })
          toast.success("VT1 re-detection set to " + value, toastOptions)
          break

        case "VF":
          dispatch({ type: UPDATE_TC_DETECTION, payload: { vf: value } })
          toast.success("VF counter set to " + value, toastOptions)
          break

        case "UBT":
          dispatch({ type: UPDATE_UPPER_HEART_RATE, payload: value })
          toast.success("Upper heart rate set to " + value, toastOptions)
          break

        case "NBT":
          dispatch({ type: UPDATE_NIGHT_HEART_RATE, payload: value })
          toast.success("Night heart rate set to " + value, toastOptions)
          break

        case "PBT":
          dispatch({ type: UPDATE_MIN_HEART_RATE_AFTER_SHOCK, payload: value })
          toast.success("Minimum post shock rate set to " + value, toastOptions)
          break

        case "MST":
          dispatch({ type: UPDATE_MODE_SWITCH, payload: value })
          toast.success("Mode switched to " + value, toastOptions)
          break

        case "PA":
          dispatch({ type: UPDATE_PULSE_AMP, payload: { atrium: value } })
          toast.success("Atrium pulse amplitude set to " + value, toastOptions)
          break

        case "LVA":
          dispatch({ type: UPDATE_PULSE_AMP, payload: { leftVentricle: value } })
          toast.success("Left ventricle pulse amplitude set to " + value, toastOptions)
          break

        case "RVA":
          dispatch({ type: UPDATE_PULSE_AMP, payload: { rightVentricle: value } })
          toast.success("Right ventricle pulse amplitude set to " + value, toastOptions)
          break

        case "PW":
          dispatch({ type: UPDATE_PULSE_WIDTH, payload: { atrium: value } })
          toast.success("Pulse width set to " + value, toastOptions)
          break

        case "LVW":
          dispatch({ type: UPDATE_PULSE_WIDTH, payload: { leftVentricle: value } })
          toast.success("Left ventricle pulse width set to " + value, toastOptions)
          break

        case "RVW":
          dispatch({ type: UPDATE_PULSE_WIDTH, payload: { rightVentricle: value } })
          toast.success("Right ventricle pulse width set to " + value, toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "REL":
      switch (parameter) {
        case "VF1":
          dispatch({ type: UPDATE_SHOCK_ENERGY, payload: { first: value } })
          toast.success("First shock energy set to " + value + "J", toastOptions)
          break

        case "VF2":
          dispatch({ type: UPDATE_SHOCK_ENERGY, payload: { second: value } })
          toast.success("Second shock energy set to " + value + "J", toastOptions)
          break

        case "VFN":
          dispatch({ type: UPDATE_SHOCK_ENERGY, payload: { nth: value } })
          toast.success("Nth shock energy set to " + value + "J", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "ENL":
      switch (parameter) {
        case "DET":
          dispatch({ type: UPDATE_ENABLE_TC_DETECTION, payload: value === "ON" ? true : false })
          toast.success("Tachycardia detection set to " + value, toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "DISABLE":
      switch (parameter) {
        case "BEEP":
          dispatch({ type: UPDATE_BEEPER_CONTROL, payload: false })
          toast.success("Beeper control disabled", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "START":
      switch (parameter) {
        case "RSHK":
          // start rescue shock
          break

        case "DEFT":
          // start defibrillation
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "ABORT":
      switch (parameter) {
        case "RSHK":
          // abort rescue shock
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "SELECT":
      switch (parameter) {
        case "SHOCK":
          break

        case "MAXS":
          dispatch({ type: UPDATE_SHOCKS_PER_EPISODE, payload: value })
          toast.success("Shocks per episode set to " + value + "J", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    default:
      toast.error("Invalid action", toastOptions)
  }
}