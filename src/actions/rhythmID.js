import deliverShockTreatment from "./shockTreatment"

import { toast } from "react-toastify"
import { toastOptions } from "../data"

export default function rhythmID(state, dispatch, heartRates, vRate, aRate) {
  const { vt1, vf } = state.ventricularRates
  const currentHeartRate = heartRates[heartRates.length - 1]

  if (D1(vf, heartRates)) {
    if (D2(vf, heartRates)) {
      deliverShockTreatment(state, dispatch, currentHeartRate)
    } else {
      if (D3(vt1, heartRates)) {
        if (D4(vt1, heartRates)) {
          if (D5(vRate, aRate)) {
            deliverShockTreatment(state, dispatch, currentHeartRate)
          } else {
            if (D6(state, heartRates)) {
              toast.success("No shock advised", toastOptions)
            } else {
              if (D7(state, heartRates)) {
                toast.success("No shock advised", toastOptions)
              } else {
                deliverShockTreatment(state, dispatch, currentHeartRate)
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
    if (D3(vt1, heartRates)) {
      if (D4(vt1, heartRates)) {
        if (D5(vRate, aRate)) {
          deliverShockTreatment(state, dispatch, currentHeartRate)
        } else {
          if (D6(state, heartRates)) {
            toast.success("No shock advised", toastOptions)
          } else {
            if (D7(state, heartRates)) {
              toast.success("No shock advised", toastOptions)
            } else {
              deliverShockTreatment(state, dispatch, currentHeartRate)
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

const D1 = (vf, heartRates) => {
  return heartRates.filter(hr => hr > vf).length >= 8
}

const D2 = (vf, heartRates) => {
  const belowVf = heartRates.filter(hr => hr < vf).length >= 6
  const lastOneBelowVf = heartRates[heartRates.length - 1] < vf

  return belowVf && lastOneBelowVf
}

const D3 = (vt1, heartRates) => {
  return heartRates.filter(hr => hr > vt1).length >= 8
}

const D4 = (vt1, heartRates) => {
  const belowVt1 = heartRates.filter(hr => hr < vt1).length >= 6
  const lastOneBelowVt1 = heartRates[heartRates.length - 1] < vt1

  return belowVt1 && lastOneBelowVt1
}

const D5 = (vRate, aRate) => {
  return vRate - aRate >= 10
}

const D6 = (state, heartRates) => {

}

const D7 = (state, heartRates) => {

}