import { CommandInput, BatteryData, DisplayPatientData, Navbar, RandomNumberStream } from "./components"
import { StateProvider } from './StateContext'
import { toastOptions } from "./data"

import { ToastContainer, Slide } from "react-toastify"

import "react-toastify/dist/ReactToastify.css"
import "./styles/Toast.scss"
import "./styles/Global.scss"
import "./App.css"

function App() {
  return (
    <>
      <div className="App">
        <StateProvider>
          <Navbar />
          <BatteryData />
          <DisplayPatientData />
          <RandomNumberStream />
          <CommandInput />
          {/* <DefineParameters /> */}
        </StateProvider>
      </div>

      <ToastContainer
        position={toastOptions.position}
        autoClose={toastOptions.autoClose}
        hideProgressBar={toastOptions.hideProgressBar}
        closeOnClick={toastOptions.closeOnClick}
        pauseOnHover={toastOptions.pauseOnHover}
        theme={toastOptions.theme}
        transition={Slide}
        newestOnTop={toastOptions.newestOnTop}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
      />
    </>
  )
}

export default App
