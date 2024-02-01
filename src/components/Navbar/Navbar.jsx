import { useStateContext } from "../../StateContext"
import { UPDATE_IS_RUNNING, UPDATE_MODE_SWITCH } from "../../data/actionTypes"

import "./Navbar.scss"

const Navbar = () => {
  const { state, dispatch } = useStateContext()
  const { isRunning } = state

  const toggleSimulation = () => {
    dispatch({ type: UPDATE_IS_RUNNING, payload: !isRunning })
    dispatch({ type: UPDATE_MODE_SWITCH, payload: !isRunning ? 1 : 0 })
  }

  return (
    <nav className="navbar">
      <div className="navbar-title">Data Manipulation Attack</div>
      <button
        className="simulation-button btn-primary-sm"
        onClick={toggleSimulation}
      >
        {isRunning ? "Stop Simulation" : "Start Simulation"}
      </button>
    </nav>
  )
}

export default Navbar
