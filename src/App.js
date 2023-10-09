import { useState } from "react"
import { CommandInput } from "./components"

import "./App.css"

function App() {
  const [command, setCommand] = useState("")

  const executeCommand = () => {
    console.log("Executing command:", command)
  }

  return (
    <div className="App">
      <CommandInput onExecuteCommand={setCommand} />
    </div>
  )
}

export default App
