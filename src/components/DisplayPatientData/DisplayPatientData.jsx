import { useStateContext } from "../../StateContext"

import "./DisplayPatientData.scss"

export default function DisplayPatientData() {
  const {
    state: {
      minHeartRate,
      upperHeartRate,
      nightHeartRate,
      minHeartRateAfterShock,
      beeperControl,
      pulseAmp,
      pulseWidth,
      shocksPerEpisode,
      ventricularRates,
      tcDetection,
      shockEnergy,
      enableTCDetection,
    },
  } = useStateContext()

  return (
    <div className="statBox">
      <h2>Patient and ICD data</h2>
      <div className="statBox__content">
        <div className="statBox__content__col">
          <div className="statBox__content__item">
            <h3>
              Basic heart rate: <span>{minHeartRate}</span>
            </h3>
          </div>
          <div className="statBox__content__item">
            <h3>Tachycardia zone detection</h3>
            <p>
              VT1 rate/interval: {ventricularRates.vt1} <br />
              VT2 rate/interval: {ventricularRates.vt2} <br />
              VF rate/interval: {ventricularRates.vf}
            </p>
          </div>
          <div className="statBox__content__item">
            <h3>Tachycardia detection interval</h3>
            <p>
              VT1 detection counter: {tcDetection.vt1} <br />
              VT2 detection counter: {tcDetection.vt2} <br />
              VT1 re-detection counter: {tcDetection.vt1Re} <br />
              VF detection counter: {tcDetection.vf}
            </p>
          </div>
          <div className="statBox__content__item">
            <h3>Shock dose release</h3>
            <p>
              VF first shock: {shockEnergy.first} <br />
              VF second shock: {shockEnergy.second} <br />
              3-nth shock: {shockEnergy.nth}
            </p>
          </div>
          <div className="statBox__content__item">
            <h3>
              Tachycardia detection:{" "}
              {enableTCDetection ? "ENABLED" : "DISABLED"}
            </h3>
          </div>
        </div>

        <div className="statBox__content__row">
          <div className="statBox__content__item">
            <h3>Upper heart rate: {upperHeartRate}</h3>
          </div>
          <div className="statBox__content__item">
            <h3>Night heart rate: {nightHeartRate}</h3>
          </div>
          <div className="statBox__content__item">
            <h3>Post shock basic rate: {minHeartRateAfterShock}</h3>
          </div>
          <div className="statBox__content__item">
            <h3>Beeper control: {beeperControl ? "ENABLED" : "DISABLED"}</h3>
          </div>
          <div className="statBox__content__item">
            <h3>Pulse amplitude setting</h3>
            <p>
              Atrium: {pulseAmp.atrium} <br />
              Left ventricle: {pulseAmp.leftVentricle} <br />
              Right ventricle: {pulseAmp.rightVentricle}
            </p>
          </div>
          <div className="statBox__content__item">
            <h3>Pulse width setting</h3>
            <p>
              Atrium: {pulseWidth.atrium} <br />
              Left ventricle: {pulseWidth.leftVentricle} <br />
              Right ventricle: {pulseWidth.rightVentricle}
            </p>
          </div>
          <div className="statBox__content__item">
            <h3>Shocks per episode: {shocksPerEpisode}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
