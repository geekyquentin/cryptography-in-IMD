import { useStateContext } from "../../StateContext"
import { executeCommand } from "../../actions"

import "./CommandInput.scss"

export default function CommandInput() {
  const { state, dispatch } = useStateContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const command = e.target[0].value
    executeCommand(state, dispatch, command)
    e.target[0].value = ""
  }

  return (
    <div className="cmd-input">
      <h2 className="comp-heading">Command interface</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a command..." />
      </form>
    </div>
  )
}
