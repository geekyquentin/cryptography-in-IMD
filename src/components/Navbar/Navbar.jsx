import { useStateContext } from "../../StateContext"
import { UPDATE_IS_RUNNING } from "../../data/actionTypes"

import "./Navbar.scss"

const Navbar = () => {
  const { state, dispatch } = useStateContext()
  const { isRunning } = state

  const toggleSimulation = () => {
    dispatch({ type: UPDATE_IS_RUNNING, payload: !isRunning })
  }

  return (
    <nav className="navbar">
      <div className="navbar-title">Data Manipulation Attack</div>
      <button className="simulation-button" onClick={toggleSimulation}>
        {isRunning ? "Stop Simulation" : "Start Simulation"}
      </button>
    </nav>
  )
}

export default Navbar
