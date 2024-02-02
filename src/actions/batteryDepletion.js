import { UPDATE_IS_FAILED } from "../data/actionTypes"

import { toast } from "react-toastify"
import { toastOptions } from "../data"

const simulateBattery = (beeperControl, batteryLevel, dispatch) => {
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

const depleteBatteryDueToShock = (batteryLevel, dispatch, shockEnergyValue) => {
  const depletion = 0.1 * shockEnergyValue
  const newBatteryLevel = Math.max(batteryLevel - depletion, 0)
  dispatch({ type: "UPDATE_BATTERY_LEVEL", payload: newBatteryLevel })
}

export { simulateBattery, depleteBatteryDueToShock }