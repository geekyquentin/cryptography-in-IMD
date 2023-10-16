import * as actionTypes from "../data/actionTypes"
import { toast } from "react-toastify"
import { toastOptions, defaultParams } from "../data"

export const rhythmID = (heartRates) => {
  // D1
  toast.success("Rhythm ID: D1", toastOptions)
}

export const executeCommand = (state, dispatch, command) => {
  const [action, parameter, value] = command.split(" ")
  if (isNaN(value) || !action || !parameter || !value) {
    toast.error("Invalid command", toastOptions)
    return
  }

  switch (action) {
    case "SET":
      switch (parameter) {
        case "BT":
          if (value < defaultParams.minHeartRate.min || value > defaultParams.minHeartRate.max) {
            toast.error("Min heart rate is out of range", toastOptions)
            return
          }
          dispatch({ type: actionTypes.UPDATE_MIN_HEART_RATE, payload: value })
          toast.success("Minimum heart rate updated", toastOptions)
          break

        case "VT1GT":
          if (value < defaultParams.vtDetection.min || value > defaultParams.vtDetection.max) {
            toast.error("VT1 detection is not in range", toastOptions)
            return
          }
          dispatch({ type: actionTypes.UPDATE_VENTRICULAR_RATES, payload: { vt1: value } })
          toast.success("Ventricular rates updated", toastOptions)
          break

        case "VT2GT":
          if (state.ventricularRates.vt2 === 0) {
            toast.error("VT1 must be set first", toastOptions)
            return
          }
          if (value < state.ventricularRates.vt2 || value < defaultParams.vt2Detection.min || value > defaultParams.vt2Detection.max) {
            toast.error("VT2 detection is not in range", toastOptions)
            return
          }
          dispatch({ type: actionTypes.UPDATE_VENTRICULAR_RATES, payload: { vt2: value } })
          toast.success("Ventricular rates updated", toastOptions)
          break

        case "VFGT":
          if (value < defaultParams.vfDetection.min || value > defaultParams.vfDetection.max) {
            toast.error("VF detection is out of range", toastOptions)
            return
          }
          dispatch({ type: actionTypes.UPDATE_VENTRICULAR_RATES, payload: { vf: value } })
          toast.success("Ventricular rates updated", toastOptions)
          break

        case "VT1":
          dispatch({ type: actionTypes.UPDATE_TC_DETECTION, payload: { vt1: value } })
          toast.success("TC detection updated", toastOptions)
          break

        case "VT2":
          dispatch({ type: actionTypes.UPDATE_TC_DETECTION, payload: { vt2: value } })
          toast.success("TC detection updated", toastOptions)
          break

        case "VT1RE":
          dispatch({ type: actionTypes.UPDATE_TC_DETECTION, payload: { vt1Re: value } })
          toast.success("TC detection updated", toastOptions)
          break

        case "VF":
          dispatch({ type: actionTypes.UPDATE_TC_DETECTION, payload: { vf: value } })
          toast.success("TC detection updated", toastOptions)
          break

        case "UBT":
          if (value < defaultParams.upperHeartRate.min || value > defaultParams.upperHeartRate.max) {
            toast.error("Upper heart rate is out of range", toastOptions)
            return
          }
          dispatch({ type: actionTypes.UPDATE_UPPER_HEART_RATE, payload: value })
          toast.success("Upper heart rate updated", toastOptions)
          break

        case "NBT":
          if (value < defaultParams.nightHeartRate.min || value > defaultParams.nightHeartRate.max) {
            toast.error("Night heart rate is out of range", toastOptions)
            return
          }
          dispatch({ type: actionTypes.UPDATE_NIGHT_HEART_RATE, payload: value })
          toast.success("Night heart rate updated", toastOptions)
          break

        case "PBT":
          if (value < defaultParams.minHeartRate.min || value > defaultParams.minHeartRate.max) {
            toast.error("Min heart rate is out of range", toastOptions)
            return
          }
          dispatch({ type: actionTypes.UPDATE_MIN_HEART_RATE_AFTER_SHOCK, payload: value })
          toast.success("Minimum heart rate updated", toastOptions)
          break

        case "PA":
          dispatch({ type: actionTypes.UPDATE_PULSE_AMP, payload: { atrium: value } })
          toast.success("Pulse amplitude updated", toastOptions)
          break

        case "LVA":
          dispatch({ type: actionTypes.UPDATE_PULSE_AMP, payload: { leftVentricle: value } })
          toast.success("Pulse amplitude updated", toastOptions)
          break

        case "RVA":
          dispatch({ type: actionTypes.UPDATE_PULSE_AMP, payload: { rightVentricle: value } })
          toast.success("Pulse amplitude updated", toastOptions)
          break

        case "PW":
          dispatch({ type: actionTypes.UPDATE_PULSE_WIDTH, payload: { atrium: value } })
          toast.success("Pulse width updated", toastOptions)
          break

        case "LVW":
          dispatch({ type: actionTypes.UPDATE_PULSE_WIDTH, payload: { leftVentricle: value } })
          toast.success("Pulse width updated", toastOptions)
          break

        case "RVW":
          dispatch({ type: actionTypes.UPDATE_PULSE_WIDTH, payload: { rightVentricle: value } })
          toast.success("Pulse width updated", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "REL":
      switch (parameter) {
        case "VF1":
          dispatch({ type: actionTypes.UPDATE_SHOCK_ENERGY, payload: { first: value } })
          toast.success("Shock energy updated", toastOptions)
          break

        case "VF2":
          dispatch({ type: actionTypes.UPDATE_SHOCK_ENERGY, payload: { second: value } })
          toast.success("Shock energy updated", toastOptions)
          break

        case "VFN":
          dispatch({ type: actionTypes.UPDATE_SHOCK_ENERGY, payload: { nth: value } })
          toast.success("Shock energy updated", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "ENL":
      switch (parameter) {
        case "DET":
          dispatch({ type: actionTypes.UPDATE_ENABLE_TC_DETECTION, payload: value === "ON" ? true : false })
          toast.success("TC detection updated", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "DISABLE":
      switch (parameter) {
        case "BEEP":
          dispatch({ type: actionTypes.UPDATE_BEEPER_CONTROL, payload: false })
          toast.success("Beeper control updated", toastOptions)
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
          dispatch({ type: actionTypes.UPDATE_SHOCKS_PER_EPISODE, payload: value })
          toast.success("Shocks per episode updated", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    default:
      toast.error("Invalid action", toastOptions)
  }
}