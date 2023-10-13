import { useState } from "react"
import { DisplayPatientData, DefineParameters } from ".."
import defaultParams from "../../data/defaultParams"

import "./CommandInput.scss"

export default function CommandInput() {
  const [verdict, setVerdict] = useState("enter a command first")

  const [minHeartRate, setMinHeartRate] = useState(0)
  const [ventricularRates, setVentricularRates] = useState({
    vt1: 0,
    vt2: 0,
    vf: 0,
  })
  const [TCDetection, setTCDetection] = useState({
    vt1: 0,
    vt2: 0,
    vt1Re: 0,
    vf: 0,
  })

  const [shockEnergy, setShockEnergy] = useState({
    first: 0,
    second: 0,
    nth: 0,
  })

  const [enableTCDetection, setEnableTCDetection] = useState(true)

  const [upperHeartRate, setUpperHeartRate] = useState(0)
  const [nightHeartRate, setNightHeartRate] = useState(0)
  const [minHeartRateAfterShock, setMinHeartRateAfterShock] = useState(0)

  // rate hysteresis
  // mode switch

  const [beeperControl, setBeeperControl] = useState(true)

  const [pulseAmp, setPulseAmp] = useState({
    atrium: 0,
    leftVentricle: 0,
    rightVentricle: 0,
  })

  const [pulseWidth, setPulseWidth] = useState({
    atrium: 0,
    leftVentricle: 0,
    rightVentricle: 0,
  })

  // pacing threshold setup

  const [shocksPerEpisode, setShocksPerEpisode] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const command = e.target[0].value
    const parts = command.split(" ")
    if (parts.length !== 3) {
      setVerdictToInvalid()
      return
    }

    executeCommand(parts[0], parts[1], parts[2])
    e.target[0].value = ""
  }

  const handleVTSubmit = (e) => {
    e.preventDefault()
    const intervals = e.target[0].value.split(/[\s,]+/)
    const filteredIntervals = intervals.filter((interval) => interval !== "")
    if (filteredIntervals.length < TCDetection.vf) {
      setVerdict("invalid number of intervals")
      return
    }

    const lastIntervals = filteredIntervals.slice(
      filteredIntervals.length - TCDetection.vf
    )
    rhythmID(lastIntervals)

    e.target[0].value = ""
  }

  const setVerdictToInvalid = () => {
    setVerdict("invalid command")
  }

  const rhythmID = (intervals) => {
    // D1
    let filteredIntervals = intervals.filter(
      (interval) => parseInt(interval) > TCDetection.vf
    )
    if (filteredIntervals.length < intervals.length * 0.8) {
      setVerdict("no therapy required")
      return
    }

    // D2
    filteredIntervals = intervals.filter(
      (interval) => parseInt(interval) < TCDetection.vf
    )
    if (
      filteredIntervals.length < intervals.length * 0.6 &&
      parseInt(intervals[intervals.length - 1]) < TCDetection.vf
    ) {
      setVerdict("no therapy required")
      return
    }

    // D3
    filteredIntervals = intervals.filter(
      (interval) => parseInt(interval) > TCDetection.vt1
    )
    if (filteredIntervals.length < intervals.length * 0.8) {
      setVerdict("no therapy required")
      return
    }

    // D4
    filteredIntervals = intervals.filter(
      (interval) => parseInt(interval) < TCDetection.vt1
    )
    if (
      filteredIntervals.length < intervals.length * 0.6 &&
      parseInt(intervals[intervals.length - 1]) < TCDetection.vt1
    ) {
      setVerdict("no therapy required")
      return
    }

    // D5
    // TODO: how to calculate V rates and A rates?
  }

  const executeCommand = (action, parameter, value) => {
    switch (action) {
      case "SET":
        switch (parameter) {
          case "BT":
            if (
              parseInt(value) < defaultParams.minHeartRate.min ||
              parseInt(value) > defaultParams.minHeartRate.max
            ) {
              setVerdict("invalid value for min heart rate")
              break
            }
            setMinHeartRate(parseInt(value))
            setVerdict("min heart rate set to " + value)
            break

          case "VT1GT":
            setVentricularRates({
              ...ventricularRates,
              vt1: parseInt(value),
            })
            setVerdict("VT1 threshold set to " + value)
            break

          case "VT2GT":
            setVentricularRates({
              ...ventricularRates,
              vt2: parseInt(value),
            })
            setVerdict("VT2 threshold set to " + value)
            break

          case "VFGT":
            setVentricularRates({
              ...ventricularRates,
              vf: parseInt(value),
            })
            setVerdict("VF threshold set to " + value)
            break

          case "VT1":
            if (defaultParams.minCounter > parseInt(value)) {
              setVerdict("invalid value for VT1 detection")
              break
            }
            setTCDetection({
              ...TCDetection,
              vt1: parseInt(value),
            })
            setVerdict("VT1 detection set to " + value)
            break

          case "VT2":
            if (defaultParams.minCounter > parseInt(value)) {
              setVerdict("invalid value for VT1 detection")
              break
            }
            setTCDetection({
              ...TCDetection,
              vt2: parseInt(value),
            })
            setVerdict("VT2 detection set to " + value)
            break

          case "VF":
            setTCDetection({
              ...TCDetection,
              vf: parseInt(value),
            })
            setVerdict("VF detection set to " + value)
            break

          case "UBT":
            if (
              defaultParams.upperHeartRate.min > parseInt(value) ||
              defaultParams.upperHeartRate.max < parseInt(value)
            ) {
              setVerdict("invalid value for upper heart rate")
              break
            }
            setUpperHeartRate(parseInt(value))
            setVerdict("upper heart rate set to " + value)
            break

          case "NBT":
            if (
              defaultParams.nightHeartRate.min > parseInt(value) ||
              defaultParams.nightHeartRate.max < parseInt(value)
            ) {
              setVerdict("invalid value for night heart rate")
              break
            }
            setNightHeartRate(parseInt(value))
            setVerdict("night heart rate set to " + value)
            break

          case "PBT":
            setMinHeartRateAfterShock(parseInt(value))
            setVerdict("min heart rate after shock set to " + value)
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
              atrium: parseInt(value),
            })
            setVerdict("atrium pulse amplitude set to " + value)
            break
          case "LVA":
            setPulseAmp({
              ...pulseAmp,
              leftVentricle: parseInt(value),
            })
            setVerdict("left ventricle pulse amplitude set to " + value)
            break
          case "RVA":
            setPulseAmp({
              ...pulseAmp,
              rightVentricle: parseInt(value),
            })
            setVerdict("right ventricle pulse amplitude set to " + value)
            break
          case "PW":
            setPulseWidth({
              ...pulseWidth,
              atrium: parseInt(value),
            })
            setVerdict("atrium pulse width set to " + value)
            break
          case "LVW":
            setPulseWidth({
              ...pulseWidth,
              leftVentricle: parseInt(value),
            })
            setVerdict("left ventricle pulse width set to " + value)
            break
          case "RVW":
            setPulseWidth({
              ...pulseWidth,
              rightVentricle: parseInt(value),
            })
            setVerdict("right ventricle pulse width set to " + value)
            break
          case "PT":
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "VF1":
        switch (parameter) {
          case "REL":
            if (
              defaultParams.shockDose.min > parseInt(value) ||
              defaultParams.shockDose.max < parseInt(value)
            ) {
              setVerdict("invalid value for shock energy")
              break
            }
            setShockEnergy({
              ...shockEnergy,
              first: parseInt(value),
            })
            setVerdict("first shock energy set to " + value)
            break

          default:
            setVerdictToInvalid()
        }
        break

      case "VF2":
        switch (parameter) {
          case "REL":
            if (
              defaultParams.shockDose.min > parseInt(value) ||
              defaultParams.shockDose.max < parseInt(value)
            ) {
              setVerdict("invalid value for shock energy")
              break
            }
            setShockEnergy({
              ...shockEnergy,
              second: parseInt(value),
            })
            setVerdict("second shock energy set to " + value)
            break

          default:
            setVerdictToInvalid()
        }
        break

      case "VF3n":
        switch (parameter) {
          case "REL":
            setShockEnergy({
              ...shockEnergy,
              nth: parseInt(value),
            })
            setVerdict("nth shock energy set to " + value)
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "ENL":
        switch (parameter) {
          case "DET":
            setEnableTCDetection(Boolean(value))
            setVerdict(
              "tachycardia detection " + (value ? "enabled" : "disabled")
            )
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "DISABLE":
        switch (parameter) {
          case "BEEP":
            setBeeperControl(false)
            setVerdict("beeper disabled")
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "START":
        switch (parameter) {
          case "RSHK":
            break
          case "DEFT":
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "ABORT":
        switch (parameter) {
          case "RSHK":
            break
          default:
            setVerdictToInvalid()
        }
        break

      case "SELECT":
        switch (parameter) {
          case "SHOCK":
            setShocksPerEpisode(parseInt(value))
            setVerdict("shocks per episode set to " + value)
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
          <input type="text" placeholder="Enter a command..." />
        </form>
        <p className="cmdInput__verdict">
          <b>Verdict:</b> {verdict}
        </p>
      </div>

      <DisplayPatientData
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

      <div className="vt-interval-input">
        <form onSubmit={handleVTSubmit}>
          <h3 className="vt-interval-input__heading">
            Enter {TCDetection.vf} VT intervals
          </h3>
          <input type="text" />
        </form>
      </div>

      {/* <DefineParameters /> */}
    </>
  )
}
