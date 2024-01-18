import React from "react"
import { Overlay } from "../"

import { motion } from "framer-motion"
import "./Modal.scss"

const Modal = ({ header, description, handleClick }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="modal-container"
      >
        <div className="modal-side" />
        <div className="modal">
          <h1 className="modal__header">{header}</h1>
          <p>{description}</p>
          <button className="modal-close btn-primary-sm" onClick={handleClick}>
            Click To Restart
          </button>
        </div>
        <div className="modal-side" />
      </motion.div>
      <Overlay handleClick={handleClick} opacity={0.7} />
    </>
  )
}

export default Modal
