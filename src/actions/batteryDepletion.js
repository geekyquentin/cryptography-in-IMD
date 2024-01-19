import { UPDATE_IS_FAILED } from "../data/actionTypes"

import { toast } from "react-toastify"
import { toastOptions } from "../data"

export default function simulateBattery(beeperControl, dispatch, batteryLevel) {
  if (batteryLevel <= 20 && beeperControl) {
    toast.error("Battery is low", toastOptions)
  }

  if (batteryLevel === 0) {
    dispatch({
      type: UPDATE_IS_FAILED, payload: {
        dialogHeader: "Battery Failure",
        dialogDescription: "Battery is empty, device cannot function without battery."
      }
    })
  }
}