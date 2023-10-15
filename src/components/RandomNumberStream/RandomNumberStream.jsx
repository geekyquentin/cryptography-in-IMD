import { useState, useEffect } from "react"
import { useStateContext } from "../../StateContext"
import { UPDATE_HEART_BEATS } from "../../data/actionTypes"
import "./RandomNumberStream.scss"

export default function RandomNumberStream() {
  const { dispatch } = useStateContext()

  const [isRunning, setIsRunning] = useState(true)
  const [stream, setStream] = useState([])

  useEffect(() => {
    let interval
    let interval2

    if (isRunning) {
      interval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 100)
        setStream((prevStream) => [
          ...prevStream,
          { number: randomNumber, position: -100, id: Date.now() },
        ])
      }, 1000)

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
  }, [isRunning])

  const startStopStream = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning)
  }

  const containerWidth = document.querySelector(".number-stream")?.offsetWidth
  const filteredStream = stream.filter((item) => item.position < containerWidth)

  return (
    <div className="random-number-stream">
      <h2 className="comp-heading">Random number stream</h2>
      <button onClick={startStopStream}>
        {isRunning ? "Stop Stream" : "Start Stream"}
      </button>
      <div className="number-stream">
        {filteredStream.map((item) => (
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
