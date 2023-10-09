import { useState } from "react"
import { CommandExecuter } from ".."

import "./CommandInput.scss"

export default function CommandInput() {
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

  // function to set verdict to invalid command if command is invalid
  const setVerdictToInvalid = () => {
    setVerdict("invalid command")
  }

  const executeCommand = (command) => {
    const parts = command.split(" ")

    if (parts.length === 0) {
      return
    } else if (parts.length < 3) {
      setVerdictToInvalid()
      return
    }

    switch (parts[0]) {
      case "SET":
        switch (parts[1]) {
          case "BT":
            setMinHeartRate(parseInt(parts[2]))
            setVerdict("min heart rate set to " + parts[2])
            break
          case "VT1GT":
            setVentricularRates({
              ...ventricularRates,
              vt1: parseInt(parts[2]),
            })
            setVerdict("VT1 threshold set to " + parts[2])
            break
          case "VT2GT":
            setVentricularRates({
              ...ventricularRates,
              vt2: parseInt(parts[2]),
            })
            setVerdict("VT2 threshold set to " + parts[2])
            break
          case "VFGT":
            setVentricularRates({
              ...ventricularRates,
              vf: parseInt(parts[2]),
            })
            setVerdict("VF threshold set to " + parts[2])
            break
          case "VT1":
            setTCDetection({
              ...TCDetection,
              vt1: parseInt(parts[2]),
            })
            setVerdict("VT1 detection set to " + parts[2])
            break
          case "VT2":
            setTCDetection({
              ...TCDetection,
              vt2: parseInt(parts[2]),
            })
            setVerdict("VT2 detection set to " + parts[2])
            break
          case "VF":
            setTCDetection({
              ...TCDetection,
              vf: parseInt(parts[2]),
            })
            setVerdict("VF detection set to " + parts[2])
            break
          case "UBT":
            setUpperHeartRate(parseInt(parts[2]))
            setVerdict("upper heart rate set to " + parts[2])
            break
          case "NBT":
            setNightHeartRate(parseInt(parts[2]))
            setVerdict("night heart rate set to " + parts[2])
            break
          case "PBT":
            setMinHeartRateAfterShock(parseInt(parts[2]))
            setVerdict("min heart rate after shock set to " + parts[2])
            break
          case "RH":
            break
          case "MST":
            break
          case "PCM":
            break
          case "PA":
            setPulseAmp({
              ...pulseAmp,
              atrium: parseInt(parts[2]),
            })
            setVerdict("atrium pulse amplitude set to " + parts[2])
            break
          case "LVA":
            setPulseAmp({
              ...pulseAmp,
              leftVentricle: parseInt(parts[2]),
            })
            setVerdict("left ventricle pulse amplitude set to " + parts[2])
            break
          case "RVA":
            setPulseAmp({
              ...pulseAmp,
              rightVentricle: parseInt(parts[2]),
            })
            setVerdict("right ventricle pulse amplitude set to " + parts[2])
            break
          case "PW":
            setPulseWidth({
              ...pulseWidth,
              atrium: parseInt(parts[2]),
            })
            setVerdict("atrium pulse width set to " + parts[2])
            break
          case "LVW":
            setPulseWidth({
              ...pulseWidth,
              leftVentricle: parseInt(parts[2]),
            })
            setVerdict("left ventricle pulse width set to " + parts[2])
            break
          case "RVW":
            setPulseWidth({
              ...pulseWidth,
              rightVentricle: parseInt(parts[2]),
            })
            setVerdict("right ventricle pulse width set to " + parts[2])
            break
          case "PT":
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "VF1":
        switch (parts[1]) {
          case "REL":
            setShockEnergy({
              ...shockEnergy,
              first: parseInt(parts[2]),
            })
            setVerdict("first shock energy set to " + parts[2])
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "VF2":
        switch (parts[1]) {
          case "REL":
            setShockEnergy({
              ...shockEnergy,
              second: parseInt(parts[2]),
            })
            setVerdict("second shock energy set to " + parts[2])
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "VF3n":
        switch (parts[1]) {
          case "REL":
            setShockEnergy({
              ...shockEnergy,
              nth: parseInt(parts[2]),
            })
            setVerdict("nth shock energy set to " + parts[2])
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "ENL":
        switch (parts[1]) {
          case "DET":
            setEnableTCDetection(Boolean(parts[2]))
            setVerdict(
              "tachycardia detection " + (parts[2] ? "enabled" : "disabled")
            )
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "DISABLE":
        switch (parts[1]) {
          case "BEEP":
            setBeeperControl(false)
            setVerdict("beeper disabled")
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "START":
        switch (parts[1]) {
          case "RSHK":
            break
          case "DEFT":
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "ABORT":
        switch (parts[1]) {
          case "RSHK":
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "SELECT":
        switch (parts[1]) {
          case "SHOCK":
            setShocksPerEpisode(parseInt(parts[2]))
            setVerdict("shocks per episode set to " + parts[2])
            break
          default:
            setVerdictToInvalid()
        }
        break

      default:
        setVerdictToInvalid()
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
