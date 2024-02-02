import { toast } from "react-toastify"

import * as actionTypes from "../data/actionTypes"
import { toastOptions, defaultParams } from "../data"

export default function executeCommand(state, dispatch, command) {
  const [action, parameter, value] = command.split(" ")
  if (!action || !parameter) {
    toast.error("Invalid command", toastOptions)
    return
  }

  const {
    pacingThresholdSetup,
    therapyMode,
    rescueShockStart,
    beeperControl,
    mriSwitchTimeout
  } = state
  const {
    START_RESCUE_SHOCK,
    STOP_RESCUE_SHOCK,

    UPDATE_MIN_HEART_RATE,
    UPDATE_VENTRICULAR_RATES,
    UPDATE_TC_DETECTION,
    UPDATE_UPPER_HEART_RATE,
    UPDATE_NIGHT_HEART_RATE,
    UPDATE_MIN_HEART_RATE_AFTER_SHOCK,
    UPDATE_MODE_SWITCH,
    UPDATE_PULSE_AMP,
    UPDATE_PULSE_WIDTH,
    UPDATE_SHOCK_ENERGY,
    UPDATE_ENABLE_TC_DETECTION,
    UPDATE_BEEPER_CONTROL,
    UPDATE_PACING_THRESHOLD_SETUP,
    UPDATE_SHOCKS_PER_EPISODE
  } = actionTypes

  switch (action) {
    case "SET":
      switch (parameter) {
        case "BT":
          if (defaultParams.minHeartRate.max < value) {
            toast.error("Min heart rate must be less than " + defaultParams.minHeartRate.max, toastOptions)
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

        case "MST": {
          const index = Number(value)
          if (index === therapyMode || therapyMode === 0) {
            return
          }

          const min = 1, max = defaultParams.modes.length - 1
          if (index < min || index > max) {
            toast.error("Mode must be between " + min + " and " + max, toastOptions)
            return
          }

          dispatch({ type: UPDATE_MODE_SWITCH, payload: index })
          toast.success("Mode switched to " + defaultParams.modes[index], toastOptions)

          if (index === max) {
            handleModeSwitchTimeout(state, dispatch)
          }
          break
        }

        case "MSTO": {
          const index = defaultParams.mriTimeout.indexOf(Number(value))
          if (index === -1) {
            toast.error("Invalid MRI switch timeout value", toastOptions)
            return
          }

          if (index === mriSwitchTimeout) {
            return
          }

          dispatch({ type: actionTypes.UPDATE_MRI_SWITCH_TIMEOUT, payload: index })
          toast.success("MRI switch timeout set to " + value + " hours", toastOptions)
          break
        }

        case "PA":
          if (value < pacingThresholdSetup) {
            toast.error("Pacing amplitude must be greater than " + pacingThresholdSetup, toastOptions)
            return
          }

          dispatch({ type: UPDATE_PULSE_AMP, payload: { atrium: value } })
          toast.success("Atrium pulse amplitude set to " + value, toastOptions)
          break

        case "LVA":
          if (value < pacingThresholdSetup) {
            toast.error("Pacing amplitude must be greater than " + pacingThresholdSetup, toastOptions)
            return
          }

          dispatch({ type: UPDATE_PULSE_AMP, payload: { leftVentricle: value } })
          toast.success("Left ventricle pulse amplitude set to " + value, toastOptions)
          break

        case "RVA":
          if (value < pacingThresholdSetup) {
            toast.error("Pacing amplitude must be greater than " + pacingThresholdSetup, toastOptions)
            return
          }

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

        case "PT":
          dispatch({ type: UPDATE_PACING_THRESHOLD_SETUP, payload: value })
          toast.success("Pacing threshold set to " + value, toastOptions)
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
          toast.success("Tachycardia detection is enabled", toastOptions)
          break

        case "BEEP":
          if (beeperControl) {
            return
          }

          if (therapyMode === 3) {
            toast.error(`Beeper control can't be enabled in ${defaultParams.modes[therapyMode]}`, toastOptions)
            return
          }

          dispatch({ type: UPDATE_BEEPER_CONTROL, payload: true })
          toast.success("Beeper control is enabled", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "DISABLE":
      switch (parameter) {
        case "BEEP":
          dispatch({ type: UPDATE_BEEPER_CONTROL, payload: false })
          toast.success("Beeper control is disabled", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "START":
      switch (parameter) {
        case "RSHK":
          if (rescueShockStart) {
            return
          }

          dispatch({ type: START_RESCUE_SHOCK })
          toast.success("Rescue shock started", toastOptions)
          break

        case "DEFT":
          // start defibrillation testing
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "ABORT":
      switch (parameter) {
        case "RSHK":
          if (!rescueShockStart) {
            return
          }

          dispatch({ type: STOP_RESCUE_SHOCK })
          toast.success("Rescue shock aborted", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    case "SELECT":
      switch (parameter) {
        case "SHOCK":
          // defibrillation testing shock
          break

        case "MSHK":
          dispatch({ type: actionTypes.UPDATE_MANUAL_SHOCK_ENERGY, payload: value })
          toast.success("Manual shock energy set to " + value + "J", toastOptions)
          break

        case "MAXS":
          dispatch({ type: UPDATE_SHOCKS_PER_EPISODE, payload: value })
          toast.success("Shocks per episode set to " + value, toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    default:
      toast.error("Invalid action", toastOptions)
  }
}

function handleModeSwitchTimeout(state, dispatch) {
  const maxTime = defaultParams.mriTimeout[state.mriSwitchTimeout] * 1000

  if (state.modeSwitchTimerID) {
    clearTimeout(state.modeSwitchTimerID)
  }

  const timerID = setTimeout(() => {
    const switchModeIndex = defaultParams.mriSwitchMode
    dispatch({ type: actionTypes.UPDATE_MODE_SWITCH, payload: switchModeIndex })
    toast.success("Mode switched to " + defaultParams.modes[switchModeIndex], toastOptions)
  }, maxTime)

  dispatch({ type: actionTypes.UPDATE_MODE_SWITCH_TIMER_ID, payload: timerID })
}