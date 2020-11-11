/* lib */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
/* components */
/* styles */
import md from './styles.module.scss'

export default function PopUp({
  className,
  show,
  onClose,
  ...props }) {

  const overlay = useRef(null);

  const close = (e) => {
    if (e.target === overlay.current) {
      onClose()
    }
  }

  return (
    <div
      ref={overlay}
      className={`${md.wrap} ${show && md.wrap_show} ${className && className}`}
      onClick={close}>
      {props.children}
    </div>
  )
}

PopUp.defaultProps = {
  className: undefined,
  show: false,
  onClose: () => { }
}

PopUp.propTypes = {
  className: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func
}