import { createContext, useContext, useReducer } from "react"
import * as actionTypes from "./data/actionTypes"

const StateContext = createContext()

const initialState = {
  heartBeats: [],
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

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_HEART_BEATS:
      return { ...state, heartBeats: action.payload }
    case actionTypes.UPDATE_MIN_HEART_RATE:
      return { ...state, minHeartRate: action.payload }
    case actionTypes.UPDATE_VENTRICULAR_RATES:
      return { ...state, ventricularRates: { ...state.ventricularRates, ...action.payload } }
    case actionTypes.UPDATE_TC_DETECTION:
      return { ...state, tcDetection: { ...state.tcDetection, ...action.payload } }
    case actionTypes.UPDATE_SHOCK_ENERGY:
      return { ...state, shockEnergy: action.payload }
    case actionTypes.UPDATE_ENABLE_TC_DETECTION:
      return { ...state, enableTCDetection: action.payload }
    case actionTypes.UPDATE_UPPER_HEART_RATE:
      return { ...state, upperHeartRate: action.payload }
    case actionTypes.UPDATE_NIGHT_HEART_RATE:
      return { ...state, nightHeartRate: action.payload }
    case actionTypes.UPDATE_MIN_HEART_RATE_AFTER_SHOCK:
      return { ...state, minHeartRateAfterShock: action.payload }
    case actionTypes.UPDATE_BEEPER_CONTROL:
      return { ...state, beeperControl: action.payload }
    case actionTypes.UPDATE_PULSE_AMP:
      return { ...state, pulseAmp: { ...state.pulseAmp, ...action.payload } }
    case actionTypes.UPDATE_PULSE_WIDTH:
      return { ...state, pulseWidth: { ...state.pulseWidth, ...action.payload } }
    case actionTypes.UPDATE_SHOCKS_PER_EPISODE:
      return { ...state, shocksPerEpisode: action.payload }
    default:
      return state
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
