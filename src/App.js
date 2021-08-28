import React, { useState, useEffect } from "react"
import Palette from "./components/Palette"
import "./style/main.scss"
import Button from "./components/Button"
import Loader from "react-loader-spinner"

function App() {
  const [palette, setPalette] = useState([])
  const [click, setClick] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  let url = "http://colormind.io/api/"
  let data = {
    model: "default",
  }

  const getData = (callback) => {
    const http = new XMLHttpRequest()
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200) {
        let data = JSON.parse(http.responseText).result
        callback(undefined, data)
      } else if (http.readyState === 4) {
        callback("could not fetch the data", undefined)
      }
    }
    http.open("POST", url)
    http.send(JSON.stringify(data))
  }

  useEffect(() => {
    getData((err, data) => {
      setPalette(data)
      setIsLoading(false)
      if (err) {
        console.log(err)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [click])

  if (isLoading) {
    return (
      <div className="center">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    )
  }

  const handleClick = () => {
    setClick(!click)
  }

  return (
    <main className="main">
      <div className="container">
        <h1>Color palette generator</h1>
        <Palette palette={palette} handleClick={handleClick} />
        <Button
          handleClick={handleClick}
          styleButton={"btn btn--blue"}
          text={"Generate palette"}
        />
        <p>Or just press the "Spacebar" to generate new palettes</p>
        <div className="attention attention--bottom">
          Click to copy individual color &middot; Press "C" to copy palette
        </div>
      </div>
    </main>
  )
}

export default App
