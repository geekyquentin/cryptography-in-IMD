import { useStateContext } from "../../StateContext"
import { BatteryData } from "../"
import { defaultParams } from "../../data"
import { Tooltip } from "react-tooltip"

import "./DisplayPatientData.scss"
import "react-tooltip/dist/react-tooltip.css"

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
    <>
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
              <h3 data-tooltip-id="bt">
                Basic heart rate: <span>{minHeartRate}</span>
              </h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="tachycardia-zone-det">
                Tachycardia zone detection
              </h3>
              <p>
                VT1 rate/interval: {ventricularRates.vt1} <br />
                VT2 rate/interval: {ventricularRates.vt2} <br />
                VF rate/interval: {ventricularRates.vf}
              </p>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="tachycardia-det-interval">
                Tachycardia detection interval
              </h3>
              <p>
                VT1 detection counter: {tcDetection.vt1} <br />
                VT2 detection counter: {tcDetection.vt2} <br />
                VT1 re-detection counter: {tcDetection.vt1Re} <br />
                VF detection counter: {tcDetection.vf}
              </p>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="shock-dose-release">Shock dose release</h3>
              <p>
                VF first shock: {shockEnergy.first} <br />
                VF second shock: {shockEnergy.second} <br />
                3-nth shock: {shockEnergy.nth}
              </p>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="mst">
                Mode: <i>{defaultParams.modes[therapyMode]}</i>
              </h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="msto">
                MRI Switch Timeout: {defaultParams.mriTimeout[mriSwitchTimeout]}
              </h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="tachy-det">
                Tachycardia detection:{" "}
                {enableTCDetection ? "ENABLED" : "DISABLED"}
              </h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="beeper-control">
                Beeper control: {beeperControl ? "ENABLED" : "DISABLED"}
              </h3>
            </div>
          </div>

          <div className="stat-box__col">
            <div className="stat-box__item">
              <h3 data-tooltip-id="ubt">Upper heart rate: {upperHeartRate}</h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="nbt">Night heart rate: {nightHeartRate}</h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="pbt">
                Post shock basic rate: {minHeartRateAfterShock}
              </h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="rescue-shock-enable">
                Rescue shock: {rescueShockStart ? "ENABLED" : "DISABLED"}
              </h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="rescue-shock-energy">
                Rescue shock energy: {rescueShockEnergy}
              </h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="manual-shock-energy">
                Manual shock energy: {manualShockEnergy}
              </h3>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="shocks-per-episode">
                Shocks per episode: {shocksPerEpisode}
              </h3>
            </div>

            <div className="stat-box__item">
              <h3 data-tooltip-id="pulse-amp">Pulse amplitude setting</h3>
              <p>
                Atrium: {pulseAmp.atrium} <br />
                Left ventricle: {pulseAmp.leftVentricle} <br />
                Right ventricle: {pulseAmp.rightVentricle}
              </p>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="pulse-width">Pulse width setting</h3>
              <p>
                Atrium: {pulseWidth.atrium} <br />
                Left ventricle: {pulseWidth.leftVentricle} <br />
                Right ventricle: {pulseWidth.rightVentricle}
              </p>
            </div>
            <div className="stat-box__item">
              <h3 data-tooltip-id="pacing-threshold">
                Pacing threshold setup: {pacingThresholdSetup}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <Tooltip id="bt" content="SET BT U" />
      <Tooltip id="tachycardia-zone-det" content="SET VT1GT/VT2GT/VFGT value" />
      <Tooltip id="tachycardia-det-interval" content="SET VT1/VT2/VF value" />
      <Tooltip id="shock-dose-release" content="REL VF1/VF2/VFN dose-v" />
      <Tooltip id="ubt" content="SET UBT value" />
      <Tooltip id="nbt" content="SET NBT v" />
      <Tooltip id="pbt" content="SET PBT vp" />
      <Tooltip id="mst" content="SET MST IDX" />
      <Tooltip id="msto" content="SET MSTO value" />
      <Tooltip id="rescue-shock-enable" content="START/ABORT RSHK" />
      <Tooltip id="manual-shock-energy" content="SELECT MSHK value" />
      <Tooltip id="shocks-per-episode" content="SELECT MAXS value" />
      <Tooltip id="pulse-amp" content="SET PA/LVA/RVA value" />
      <Tooltip id="pulse-width" content="SET PW/LVW/RVW value" />
      <Tooltip id="pacing-threshold" content="SET PT value" />
      <Tooltip id="tachy-det" content="ENL DET ON/OFF" />
      <Tooltip id="beeper-control" content="ENL/DISABLE BEEP" />
    </>
  )
}
