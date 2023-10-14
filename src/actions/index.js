import * as actionTypes from "../data/actionTypes"
import { toast } from "react-toastify"
import { toastOptions } from "../data"

export const executeCommand = (dispatch, command) => {
  const [action, parameter, value] = command.split(" ")
  if (isNaN(value) || !action || !parameter || !value) {
    toast.error("Invalid command", toastOptions)
    return
  }

  switch (action) {
    case "SET":
      switch (parameter) {
        case "BT":
          dispatch({ type: actionTypes.UPDATE_MIN_HEART_RATE, payload: value })
          toast.success("Minimum heart rate updated", toastOptions)
          break

        case "VT1GT":
          dispatch({ type: actionTypes.UPDATE_VENTRICULAR_RATES, payload: { vt1: value } })
          toast.success("Ventricular rates updated", toastOptions)
          break

        case "VT2GT":
          dispatch({ type: actionTypes.UPDATE_VENTRICULAR_RATES, payload: { vt2: value } })
          toast.success("Ventricular rates updated", toastOptions)
          break

        case "VFGT":
          dispatch({ type: actionTypes.UPDATE_VENTRICULAR_RATES, payload: { vf: value } })
          toast.success("Ventricular rates updated", toastOptions)
          break

        default:
          toast.error("Invalid parameter", toastOptions)
      }
      break

    default:
      toast.error("Invalid action", toastOptions)
  }
}