import { useState, useEffect } from "react"
import "./RandomNumberStream.scss"

export default function RandomNumberStream() {
  const [stream, setStream] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 100)
      setStream((prevStream) => {
        const newStream = [
          ...prevStream,
          { number: randomNumber, position: -100 },
        ]
        return newStream
      })
    }, 1000)

    const updatePosition = () => {
      setStream((prevStream) =>
        prevStream.map((item) => ({
          number: item.number,
          position: item.position + 1,
        }))
      )
    }

    const interval2 = setInterval(updatePosition, 10)

    return () => {
      clearInterval(interval)
      clearInterval(interval2)
    }
  }, [])

  return (
    <div className="random-number-stream">
      <h2 className="comp-heading">Random number stream</h2>
      <div className="number-stream">
        {stream.map((item, index) => (
          <div
            key={index}
            className="number"
            style={{ left: `${item.position}%` }}
          >
            {item.number}
          </div>
        ))}
      </div>
    </div>
  )
}
