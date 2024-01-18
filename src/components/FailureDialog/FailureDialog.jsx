import { useStateContext } from "../../StateContext"
import { Modal } from "../"
import { RESTART_WORKFLOW } from "../../data/actionTypes"

import { AnimatePresence } from "framer-motion"

export default function FailureDialog() {
  const { state, dispatch } = useStateContext()
  const { isFailed, dialogHeader, dialogDescription } = state

  return (
    <AnimatePresence>
      {isFailed && (
        <Modal
          header={dialogHeader}
          description={dialogDescription}
          handleClick={() => dispatch({ type: RESTART_WORKFLOW })}
        />
      )}
    </AnimatePresence>
  )
}
