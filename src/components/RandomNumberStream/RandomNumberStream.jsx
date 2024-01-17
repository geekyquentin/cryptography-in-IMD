import { useState, useEffect } from "react"
import { useStateContext } from "../../StateContext"
import { defaultParams } from "../../data"
import "./RandomNumberStream.scss"
import { simulateICD } from "../../actions"

export default function RandomNumberStream() {
  const { state } = useStateContext()
  const { isRunning } = state

  const [intervalTime, setIntervalTime] = useState(2500)
  const [stream, setStream] = useState([])
  const [avRates, setAvRates] = useState([0, 0])

  useEffect(() => {
    let interval
    let interval2

    setStream([])

    if (isRunning) {
      interval = setInterval(() => {
        setStream((prevStream) => [
          ...prevStream,
          { number: getRandomNumber(), position: -100, id: Date.now() },
        ])
      }, intervalTime)

      interval2 = setInterval(() => {
        setStream((prevStream) =>
          prevStream.map((item) => ({
            number: item.number,
            position: item.position + 1,
            id: item.id,
          }))
        )
      }, 10)
    } else {
      clearInterval(interval)
      clearInterval(interval2)
    }

    return () => {
      clearInterval(interval)
      clearInterval(interval2)
    }
  }, [isRunning, intervalTime])

  const getRandomNumber = () => {
    const { min, max } = defaultParams.randomRange
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  useEffect(() => {
    if (stream.length <= 10) {
      return
    }

    setStream((prevStream) => prevStream.slice(1))
    setAvRates([getRandomNumber(), getRandomNumber()])

    simulateICD(
      state,
      stream.map((item) => item.number),
      avRates[0],
      avRates[1]
    )
  }, [stream, state, avRates])

  return (
    <div className="random-number-stream">
      <h2 className="comp-heading">Heart rates</h2>
      <div className="stream-settings">
        <input
          type="number"
          id="interval"
          value={intervalTime}
          onChange={(e) => setIntervalTime(e.target.value)}
        />
      </div>
      <div className="number-stream">
        {stream.map((item) => (
          <h3
            key={item.id}
            className="number"
            style={{
              left: `${item.position}%`,
              animationPlayState: isRunning ? "running" : "paused",
            }}
          >
            {item.number}
          </h3>
        ))}
      </div>
      <div className="av-rates">
        <h3>A rate: {avRates[0]}</h3>
        <h3>V rate: {avRates[1]}</h3>
      </div>
    </div>
  )
}
