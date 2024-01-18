import { createContext, useContext, useReducer } from "react"
import parameterReducer from "./reducer/parameterReducer"
import workflowReducer from "./reducer/workflowReducer"
import combinedReducer from "./reducer/combinedReducer"

const StateContext = createContext()

const initialState = {
  isRunning: false,
  isFailed: false,
  dialogHeader: "",
  dialogDescription: "",

  // ICD parameters
  minHeartRate: 0,
  ventricularRates: {
    vt1: 0,
    vt2: 0,
    vf: 0,
  },
  tcDetection: {
    vt1: 0,
    vt2: 0,
    vt1Re: 0,
    vf: 0,
  },
  shockEnergy: {
    first: 0,
    second: 0,
    nth: 0,
  },
  enableTCDetection: true,
  upperHeartRate: 0,
  nightHeartRate: 0,
  minHeartRateAfterShock: 0,
  mode: "",
  beeperControl: true,
  pulseAmp: {
    atrium: 0,
    leftVentricle: 0,
    rightVentricle: 0,
  },
  pulseWidth: {
    atrium: 0,
    leftVentricle: 0,
    rightVentricle: 0,
  },
  shocksPerEpisode: 0,
}

const reducer = (state, action) => {
  return {
    // ...parameterReducer(state, action),
    // ...workflowReducer(state, action),
    ...combinedReducer(state, action),
  }
}

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

export function useStateContext() {
  return useContext(StateContext)
}
