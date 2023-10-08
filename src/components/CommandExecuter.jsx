import "./CommandExecuter.scss"

export default function CommandExecutor({ command }) {
  const executeCommand = () => {
    const parts = command.split(" ")

    if (parts.length === 0) {
      return
    }

    const action = parts[0].toLowerCase()

    switch (action) {
      case "set":
        // Handle SET commands
        // Example: SET BT U, SET VT1 GT 10, SET VT2 GT 20, etc.
        break
      case "enl":
        // Handle ENL commands
        // Example: ENL DET ON, ENL DET OFF
        break
      default:
        // Handle invalid commands
        break
    }
  }

  return (
    <div className="statBox">
      <h2>Patient and ICD data</h2>
    </div>
  )
}
