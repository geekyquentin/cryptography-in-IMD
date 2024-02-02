import * as actionTypes from "../data/actionTypes"
import { defaultParams } from "../data"

const combinedReducer = (state, action) => {
  const { maxBatteryLevel, defaultMode } = defaultParams

  switch (action.type) {
    case actionTypes.UPDATE_IS_RUNNING:
      return { ...state, isRunning: action.payload }
    case actionTypes.UPDATE_IS_FAILED: {
      const { dialogHeader, dialogDescription } = action.payload
      return { ...state, isFailed: true, isRunning: false, dialogHeader, dialogDescription }
    }
    case actionTypes.START_MANUAL_SHOCK:
      return { ...state, manualShockStart: true, currentHeartRate: action.payload }
    case actionTypes.STOP_MANUAL_SHOCK:
      return { ...state, manualShockStart: false }
    case actionTypes.RESTART_WORKFLOW:
      return { ...state, isFailed: false, manualShockStart: false, dialogHeader: "", dialogDescription: "", therapyMode: 0, batteryLevel: maxBatteryLevel }

    // case actionTypes.UPDATE_CURRENT_HEART_RATE:
    //   return { ...state, currentHeartRate: action.payload }

    // ICD parameters
    case actionTypes.UPDATE_BATTERY_LEVEL:
      return { ...state, batteryLevel: action.payload }
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
    case actionTypes.UPDATE_MODE_SWITCH:
      switch (action.payload) {
        case 0:
          return { ...state, therapyMode: 0, }
        case 1:
          return { ...state, therapyMode: 1, enableTCDetection: false, }
        case 2:
          return { ...state, therapyMode: 2, enableTCDetection: true }
        case 3:
          return { ...state, therapyMode: 3, enableTCDetection: false, beepControl: false, }
        default:
          return { ...state, therapyMode: action.payload }
      }
    case actionTypes.UPDATE_MODE_SWITCH_TIMER_ID:
      return { ...state, modeSwitchTimerID: action.payload }
    case actionTypes.UPDATE_MRI_SWITCH_TIMEOUT:
      return { ...state, mriSwitchTimeout: action.payload }
    case actionTypes.UPDATE_BEEPER_CONTROL:
      return { ...state, beeperControl: action.payload }
    case actionTypes.UPDATE_RESCUE_SHOCK:
      return { ...state, rescueShock: action.payload }
    case actionTypes.UPDATE_RESCUE_SHOCK_ENERGY:
      return { ...state, rescueShockEnergy: action.payload }
    case actionTypes.UPDATE_MANUAL_SHOCK_ENERGY:
      return { ...state, manualShockEnergy: action.payload }
    case actionTypes.UPDATE_PULSE_AMP:
      return { ...state, pulseAmp: { ...state.pulseAmp, ...action.payload } }
    case actionTypes.UPDATE_PULSE_WIDTH:
      return { ...state, pulseWidth: { ...state.pulseWidth, ...action.payload } }
    case actionTypes.UPDATE_PACING_THRESHOLD_SETUP:
      return { ...state, pacingThresholdSetup: action.payload }
    case actionTypes.UPDATE_SHOCKS_PER_EPISODE:
      return { ...state, shocksPerEpisode: action.payload }
    default:
      return state
  }
}

export default combinedReducer