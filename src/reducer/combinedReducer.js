import * as actionTypes from "../data/actionTypes"

const combinedReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_IS_RUNNING:
      return { ...state, isRunning: action.payload }
    case actionTypes.UPDATE_IS_FAILED:
      return { ...state, isFailed: action.payload }
    case actionTypes.UPDATE_FAILURE_DESCRIPTION:
      return { ...state, failureDescription: action.payload }
    case actionTypes.CLOSE_MODAL:
      return { ...state, isFailed: false, failureDescription: "", isRunning: false }
    case actionTypes.UPDATE_MIN_HEART_RATE:
      return { ...state, minHeartRate: action.payload }
    case actionTypes.UPDATE_VENTRICULAR_RATES:
      return { ...state, ventricularRates: { ...state.ventricularRates, ...action.payload } }
    case actionTypes.UPDATE_TC_DETECTION:
      return { ...state, tcDetection: { ...state.tcDetection, ...action.payload } }
    case actionTypes.UPDATE_SHOCK_ENERGY:
      return { ...state, shockEnergy: { ...state.shockEnergy, ...action.payload } }
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

export default combinedReducer