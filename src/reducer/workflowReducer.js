import * as actionTypes from '../data/actionTypes'

const workflowReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_IS_RUNNING:
      return { ...state, isRunning: action.payload }
    case actionTypes.UPDATE_IS_FAILED:
      const { dialogHeader, dialogDescription } = action.payload
      return { ...state, isFailed: true, isRunning: false, dialogHeader, dialogDescription }
    case actionTypes.RESTART_WORKFLOW:
      return { ...state, isFailed: false, dialogHeader: "", dialogDescription: "" }
    default:
      return state
  }
}

export default workflowReducer