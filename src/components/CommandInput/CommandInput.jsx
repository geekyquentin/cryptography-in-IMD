import { useState } from "react"
import { CommandExecuter } from ".."

import "./CommandInput.scss"

export default function CommandInput({ onExecuteCommand }) {
  const [command, setCommand] = useState("")
  const [verdict, setVerdict] = useState("enter a command first")

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
        switch (parts[1]) {
          case "BT":
            break
          case "VT1GT":
            break
          case "VT2GT":
            break
          case "VFGT":
            break
          case "VT1":
            break
          case "VT2":
            break
          case "VF":
            break
          case "UBT":
            break
          case "NBT":
            break
          case "PBT":
            break
          case "RH":
            break
          case "MST":
            break
          case "PCM":
            break
          case "PA":
            break
          case "LVA":
            break
          case "RVA":
            break
          case "PW":
            break
          case "LVW":
            break
          case "RVW":
            break
          case "PT":
            break
          default:
        }
        break

      case "VF1":
        switch (parts[1]) {
          case "REL":
            break
          default:
        }
        break

      case "VF2":
        switch (parts[1]) {
          case "REL":
            break
          default:
        }
        break

      case "VF3n":
        switch (parts[1]) {
          case "REL":
            break
          default:
        }
        break

      case "ENL":
        switch (parts[1]) {
          case "DET":
            break
          default:
        }
        break

      case "DISABLE":
        switch (parts[1]) {
          case "BEEP":
            break
          default:
        }
        break

      case "START":
        switch (parts[1]) {
          case "RSHK":
            break
          case "DEFT":
            break
          default:
        }
        break

      case "ABORT":
        switch (parts[1]) {
          case "RSHK":
            break
          default:
        }
        break

      case "SELECT":
        switch (parts[1]) {
          case "SHOCK":
            break
          default:
        }
        break

      default:
        break
    }
  }

  return (
    <>
      <div className="cmdInput">
        <h1>Command Interface</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="cmdInput__input"
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter a command..."
          />
        </form>
        <p className="cmdInput__verdict">
          <b>Verdict:</b> {verdict}
        </p>
      </div>

      <CommandExecuter
        minHeartRate={minHeartRate}
        ventricularRates={ventricularRates}
        TCDetection={TCDetection}
        shockEnergy={shockEnergy}
        enableTCDetection={enableTCDetection}
        upperHeartRate={upperHeartRate}
        nightHeartRate={nightHeartRate}
        minHeartRateAfterShock={minHeartRateAfterShock}
        beeperControl={beeperControl}
        pulseAmp={pulseAmp}
        pulseWidth={pulseWidth}
        shocksPerEpisode={shocksPerEpisode}
      />
    </>
  )
}
