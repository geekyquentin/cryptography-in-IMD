import { useState, useEffect } from "react"
import "./RandomNumberStream.scss"
import { rhythmID } from "../../actions"

export default function RandomNumberStream() {
  const [isRunning, setIsRunning] = useState(true)
  const [intervalTime, setIntervalTime] = useState(2500)
  const [stream, setStream] = useState([])

  useEffect(() => {
    let interval
    let interval2

    setStream([])

    if (isRunning) {
      interval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 100)
        setStream((prevStream) => [
          ...prevStream,
          { number: randomNumber, position: -100, id: Date.now() },
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

  const startStopStream = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning)
  }

  useEffect(() => {
    if (stream.length <= 10) {
      return
    }

    setStream((prevStream) => prevStream.slice(1))
    rhythmID(stream.map((item) => item.number))
  }, [stream])

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
        <button onClick={startStopStream} className="toggle-stream-btn">
          {isRunning ? "Stop Stream" : "Start Stream"}
        </button>
      </div>
      <div className="number-stream">
        {stream.map((item) => (
          <div
            key={item.id}
            className="number"
            style={{
              left: `${item.position}%`,
              animationPlayState: isRunning ? "running" : "paused",
            }}
          >
            {item.number}
          </div>
        ))}
      </div>
    </div>
  )
}
