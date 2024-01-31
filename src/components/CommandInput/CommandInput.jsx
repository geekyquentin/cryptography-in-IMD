import { useState } from "react"
import { useStateContext } from "../../StateContext"
import { executeCommand } from "../../actions"

import { HiMiniCommandLine } from "react-icons/hi2"
import { AiOutlineCloseCircle } from "react-icons/ai"

import "./CommandInput.scss"

export default function CommandInput() {
  const { state, dispatch } = useStateContext()

  const [isOpened, setIsOpened] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    const command = e.target[0].value
    executeCommand(state, dispatch, command)
    e.target[0].value = ""
  }

  return (
    <div className="cmd">
      {isOpened ? (
        <div className="cmd-input">
          <div
            className="close-cmd-input clickable"
            onClick={() => setIsOpened(false)}
          >
            <AiOutlineCloseCircle size={30} />
          </div>
          <div className="cmd-input__body">
            <h2 className="cmd-input__body__heading">Command interface</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="cmd-input"
                type="text"
                placeholder="Enter a command..."
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="cmd-icon center-flex" onClick={() => setIsOpened(true)}>
          <HiMiniCommandLine size={35} />
        </div>
      )}
    </div>
  )
}
