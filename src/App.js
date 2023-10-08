import { useState } from "react"
import { CommandInput, CommandExecuter } from "./components"

import "./App.css"

function App() {
  const [command, setCommand] = useState("")

  const executeCommand = () => {
    console.log("Executing command:", command)
  }

  return (
    <div className="App">
      <h1>Command Interface</h1>
      <CommandInput onExecuteCommand={setCommand} />
      <CommandExecuter command={command} onExecute={executeCommand} />
    </div>
  )
}

export default App
