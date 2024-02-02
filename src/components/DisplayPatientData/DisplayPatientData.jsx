import { useStateContext } from "../../StateContext"
import { BatteryData } from "../"
import { defaultParams } from "../../data"

import "./DisplayPatientData.scss"

export default function DisplayPatientData() {
  const {
    state: {
      minHeartRate,
      upperHeartRate,
      nightHeartRate,
      minHeartRateAfterShock,
      therapyMode,
      mriSwitchTimeout,
      beeperControl,
      rescueShockStart,
      pulseAmp,
      pulseWidth,
      pacingThresholdSetup,
      shocksPerEpisode,
      ventricularRates,
      tcDetection,
      shockEnergy,
      rescueShockEnergy,
      manualShockEnergy,
      enableTCDetection,
    },
  } = useStateContext()

  return (
    <div className="stats">
      <div className="comp-heading patient-data-header">
        <h2 className="comp-heading">Patient and ICD data</h2>
        <div className="battery-data center-flex">
          <BatteryData />
        </div>
      </div>
      <div className="stat-box">
        <div className="stat-box__col">
          <div className="stat-box__item">
            <h3>
              Basic heart rate: <span>{minHeartRate}</span>
            </h3>
          </div>
          <div className="stat-box__item">
            <h3>Tachycardia zone detection</h3>
            <p>
              VT1 rate/interval: {ventricularRates.vt1} <br />
              VT2 rate/interval: {ventricularRates.vt2} <br />
              VF rate/interval: {ventricularRates.vf}
            </p>
          </div>
          <div className="stat-box__item">
            <h3>Tachycardia detection interval</h3>
            <p>
              VT1 detection counter: {tcDetection.vt1} <br />
              VT2 detection counter: {tcDetection.vt2} <br />
              VT1 re-detection counter: {tcDetection.vt1Re} <br />
              VF detection counter: {tcDetection.vf}
            </p>
          </div>
          <div className="stat-box__item">
            <h3>Shock dose release</h3>
            <p>
              VF first shock: {shockEnergy.first} <br />
              VF second shock: {shockEnergy.second} <br />
              3-nth shock: {shockEnergy.nth}
            </p>
          </div>
          <div className="stat-box__item">
            <h3>
              Mode: <i>{defaultParams.modes[therapyMode]}</i>
            </h3>
          </div>
          <div className="stat-box__item">
            <h3>
              MRI Switch Timeout: {defaultParams.mriTimeout[mriSwitchTimeout]}
            </h3>
          </div>
          <div className="stat-box__item">
            <h3>
              Tachycardia detection:{" "}
              {enableTCDetection ? "ENABLED" : "DISABLED"}
            </h3>
          </div>
          <div className="stat-box__item">
            <h3>Beeper control: {beeperControl ? "ENABLED" : "DISABLED"}</h3>
          </div>
        </div>

        <div className="stat-box__col">
          <div className="stat-box__item">
            <h3>Upper heart rate: {upperHeartRate}</h3>
          </div>
          <div className="stat-box__item">
            <h3>Night heart rate: {nightHeartRate}</h3>
          </div>
          <div className="stat-box__item">
            <h3>Post shock basic rate: {minHeartRateAfterShock}</h3>
          </div>
          <div className="stat-box__item">
            <h3>Rescue shock: {rescueShockStart ? "ENABLED" : "DISABLED"}</h3>
          </div>
          <div className="stat-box__item">
            <h3>Rescue shock energy: {rescueShockEnergy}</h3>
          </div>
          <div className="stat-box__item">
            <h3>Manual shock energy: {manualShockEnergy}</h3>
          </div>
          <div className="stat-box__item">
            <h3>Shocks per episode: {shocksPerEpisode}</h3>
          </div>

          <div className="stat-box__item">
            <h3>Pulse amplitude setting</h3>
            <p>
              Atrium: {pulseAmp.atrium} <br />
              Left ventricle: {pulseAmp.leftVentricle} <br />
              Right ventricle: {pulseAmp.rightVentricle}
            </p>
          </div>
          <div className="stat-box__item">
            <h3>Pulse width setting</h3>
            <p>
              Atrium: {pulseWidth.atrium} <br />
              Left ventricle: {pulseWidth.leftVentricle} <br />
              Right ventricle: {pulseWidth.rightVentricle}
            </p>
          </div>
          <div className="stat-box__item">
            <h3>Pacing threshold setup: {pacingThresholdSetup}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
