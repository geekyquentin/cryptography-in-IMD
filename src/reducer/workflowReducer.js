import * as actionTypes from '../data/actionTypes'

const workflowReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_IS_RUNNING:
      return { ...state, isRunning: action.payload }
    case actionTypes.UPDATE_IS_FAILED:
      return { ...state, isFailed: action.payload }
    case actionTypes.UPDATE_FAILURE_DESCRIPTION:
      return { ...state, failureDescription: action.payload }
    case actionTypes.CLOSE_MODAL:
      return { ...state, isFailed: false, failureDescription: "", isRunning: false }
    default:
      return state
  }
}

export default workflowReducer