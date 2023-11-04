import * as discriminators from "./discriminators"
import * as actionTypes from "../data/actionTypes"
import { toast } from "react-toastify"
import { toastOptions, defaultParams } from "../data"

export const deliverShockTreatment = (state) => {
  const { first, second, nth } = state.shockEnergy

  if (!state.enableTCDetection) {
    toast.error("Tachycardia detection disabled", toastOptions)
    return
  }

  // deliver shock
  toast.success("Shock delivered", toastOptions)
}

export const rhythmID = (state, heartRates, vRate, aRate) => {
  const { vt1, vf } = state.ventricularRates

  if (discriminators.D1(vf, heartRates)) {
    if (discriminators.D2(vf, heartRates)) {
      deliverShockTreatment(state)
    } else {
      if (discriminators.D3(vt1, heartRates)) {
        if (discriminators.D4(vt1, heartRates)) {
          if (discriminators.D5(vRate, aRate)) {
            deliverShockTreatment(state)
          } else {
            if (discriminators.D6(state, heartRates)) {
              toast.success("No shock advised", toastOptions)
            } else {
              if (discriminators.D7(state, heartRates)) {
                toast.success("No shock advised", toastOptions)
              } else {
                deliverShockTreatment(state)
              }
            }
          }
        } else {
          toast.success("No shock advised", toastOptions)
        }
      } else {
        toast.success("No shock advised", toastOptions)
      }
    }
  } else {
    if (discriminators.D3(vt1, heartRates)) {
      if (discriminators.D4(vt1, heartRates)) {
        if (discriminators.D5(vRate, aRate)) {
          deliverShockTreatment(state)
        } else {
          if (discriminators.D6(state, heartRates)) {
            toast.success("No shock advised", toastOptions)
          } else {
            if (discriminators.D7(state, heartRates)) {
              toast.success("No shock advised", toastOptions)
            } else {
              deliverShockTreatment(state)
            }
          }
        }
      } else {
        toast.success("No shock advised", toastOptions)
      }
    } else {
      toast.success("No shock advised", toastOptions)
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
  const { UPDATE_MIN_HEART_RATE, UPDATE_VENTRICULAR_RATES, UPDATE_TC_DETECTION, UPDATE_UPPER_HEART_RATE, UPDATE_NIGHT_HEART_RATE, UPDATE_MIN_HEART_RATE_AFTER_SHOCK, UPDATE_PULSE_AMP, UPDATE_PULSE_WIDTH, UPDATE_SHOCK_ENERGY, UPDATE_ENABLE_TC_DETECTION, UPDATE_BEEPER_CONTROL, UPDATE_SHOCKS_PER_EPISODE } = actionTypes

  switch (action) {
    case "SET":
      switch (parameter) {
        case "BT":
          if (value < minHeartRate.min || value > minHeartRate.max) {
            toast.error("Min heart rate is out of range", toastOptions)
            return
          }
          dispatch({ type: UPDATE_MIN_HEART_RATE, payload: value })
          toast.success("Min heart rate set to " + value, toastOptions)
          break

        case "VT1GT":
          if (value < vtDetection.min || value > vtDetection.max) {
            toast.error("VT1 detection is not in range", toastOptions)
            return
          }
          dispatch({ type: UPDATE_VENTRICULAR_RATES, payload: { vt1: value } })
          toast.success("VT1 rate set to " + value, toastOptions)
          break

        case "VT2GT":
          if (state.ventricularRates.vt1 === 0) {
            toast.error("VT1 must be set first", toastOptions)
            return
          }
          if (value < state.ventricularRates.vt1 || value < vt2Detection.min || value > vt2Detection.max) {
            toast.error("VT2 detection is not in range", toastOptions)
            return
          }
          dispatch({ type: UPDATE_VENTRICULAR_RATES, payload: { vt2: value } })
          toast.success("VT2 rate set to " + value, toastOptions)
          break

        case "VFGT":
          if (value < vfDetection.min || value > vfDetection.max) {
            toast.error("VF detection is out of range", toastOptions)
            return
          }
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
          if (value < upperHeartRate.min || value > upperHeartRate.max) {
            toast.error("Upper heart rate is out of range", toastOptions)
            return
          }
          dispatch({ type: UPDATE_UPPER_HEART_RATE, payload: value })
          toast.success("Upper heart rate set to " + value, toastOptions)
          break

        case "NBT":
          if (value < nightHeartRate.min || value > nightHeartRate.max) {
            toast.error("Night heart rate is out of range", toastOptions)
            return
          }
          dispatch({ type: UPDATE_NIGHT_HEART_RATE, payload: value })
          toast.success("Night heart rate set to " + value, toastOptions)
          break

        case "PBT":
          if (value < minHeartRate.min || value > minHeartRate.max) {
            toast.error("Min heart rate is out of range", toastOptions)
            return
          }
          dispatch({ type: UPDATE_MIN_HEART_RATE_AFTER_SHOCK, payload: value })
          toast.success("Minimum post shock rate set to " + value, toastOptions)
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
      if (value < shockDose.min || value > shockDose.max) {
        toast.error("Shock energy is out of range", toastOptions)
        return
      }
      switch (parameter) {
        case "VF1":
          dispatch({ type: UPDATE_SHOCK_ENERGY, payload: { first: value } })
          toast.success("First shock energy set to " + value + "J", toastOptions)
          break

        case "VF2":
          if (state.shockEnergy.first === 0) {
            toast.error("First shock dose must be set first", toastOptions)
            return
          }
          if (value < state.shockEnergy.first) {
            toast.error("Second shock dose must be greater than first shock dose", toastOptions)
            return
          }
          dispatch({ type: UPDATE_SHOCK_ENERGY, payload: { second: value } })
          toast.success("Second shock energy set to " + value + "J", toastOptions)
          break

        case "VFN":
          if (state.shockEnergy.first === 0) {
            toast.error("First shock dose must be set first", toastOptions)
            return
          }
          if (value < state.shockEnergy.second) {
            toast.error("Nth shock dose must be greater than second shock dose", toastOptions)
            return
          }
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