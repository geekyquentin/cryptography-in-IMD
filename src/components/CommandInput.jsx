import { useState } from "react"

export default function CommandInput({ onExecuteCommand }) {
  const [command, setCommand] = useState("")

  const [minHeartRate, setMinHeartRate] = useState(-1)
  const [ventricularRates, setVentricularRates] = useState({
    vt1: -1,
    vt2: -1,
    vf: -1,
  })
  const [TCDetection, setTCDetection] = useState({
    vt1: -1,
    vt2: -1,
    vt1Re: -1,
    vf: -1,
  })

  const [shockEnergy, setShockEnergy] = useState({
    first: -1,
    second: -1,
    nth: -1,
  })

  const [enableTCDetection, setEnableTCDetection] = useState(true)

  const [upperHeartRate, setUpperHeartRate] = useState(-1)
  const [nightHeartRate, setNightHeartRate] = useState(-1)
  const [minHeartRateAfterShock, setMinHeartRateAfterShock] = useState(-1)

  // rate hysteresis
  // mode switch

  const [beeperControl, setBeeperControl] = useState(true)

  const [pulseAmp, setPulseAmp] = useState({
    atrium: -1,
    leftVentricle: -1,
    rightVentricle: -1,
  })

  const [pulseWidth, setPulseWidth] = useState({
    atrium: -1,
    leftVentricle: -1,
    rightVentricle: -1,
  })

  // pacing threshold setup

  const [shocksPerEpisode, setShocksPerEpisode] = useState(-1)

  const handleSubmit = (e) => {
    e.preventDefault()
    executeCommand(command)
    setCommand("")
  }

  const executeCommand = (command) => {
    const parts = command.split(" ")

    if (parts.length === 0) {
      return
    }

    switch (parts[0]) {
      case "SET":
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter a command..."
        />
      </form>
    </div>
  )
}
