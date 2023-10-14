import { useStateContext } from "../../StateContext"
import { toastOptions } from "../../data"
import { toast } from "react-toastify"
import { executeCommand } from "../../actions"

import "./CommandInput.scss"

export default function CommandInput() {
  const { dispatch } = useStateContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    const command = e.target[0].value
    const parts = command.split(" ")
    if (parts.length !== 3) {
      toast.error("Invalid command", toastOptions)
      return
    }

    executeCommand(dispatch, parts[0], parts[1], parts[2])
    e.target[0].value = ""
  }

  return (
    <div className="cmdInput">
      <h1>Command Interface</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a command..." />
      </form>
    </div>
  )
}
