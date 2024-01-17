import { toast } from "react-toastify"
import { toastOptions } from "../data"

export default function simulateBattery(state, batteryLevel) {
  if (batteryLevel <= 20 && state.beeperControl) {
    toast.error("Battery is low", toastOptions)
  } else if (batteryLevel === 0) {
    toast.error("Battery is dead", toastOptions)
    return
  }
}