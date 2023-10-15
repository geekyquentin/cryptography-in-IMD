import { CommandInput, DisplayPatientData, DefineParameters, RandomNumberStream } from "./components"
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
        <h1 className="App__title">Data manipulation simulation</h1>
        <StateProvider>
          <DisplayPatientData />
          <CommandInput />
          <RandomNumberStream />
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
