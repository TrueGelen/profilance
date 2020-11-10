/* lib */
import React from 'react'
// import PropTypes from 'prop-types'

/* styles */
import md from './styles.module.scss'

/* code */
export default function E404(props) {

  return (
    <div className={md.container}>
      <p>404 not found</p>
      {props.children}
    </div>
  )
}