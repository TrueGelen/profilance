/* lib */
import React, { memo } from 'react'
import PropTypes from 'prop-types'

/* styles */
import md from './styles.module.scss'

/* code */
function Textarea({
  name,
  placeholder,
  onChange,
  className,
  isValid,
  disabled,
  errMessage,
  rows,
  cols,
  ...props
}) {

  return (
    <div className={`${md.wrap} ${className}`}>
      {/* console.log(`=====Textarea ${name}=======`) */}
      <textarea
        className={`${isValid ? md.inp : md.err}`}
        name={name}
        placeholder={placeholder}
        onChange={(e) => { onChange(e) }}
        disabled={disabled}
        rows={rows ? rows : ""}
        cols={cols ? cols : ""}
      />
      <p
        className={`${md.errMessage} ${isValid && md.invisible}`}
      >{errMessage}</p>
    </div>
  )
}

export default memo(Textarea)

Textarea.defaultProps = {
  name: '',
  placeholder: '',
  onChange: () => { },
  className: null,
  isValid: true,
  disabled: false,
  errMessage: 'Неизвестная ошибка!',
  rows: null,
  cols: null
}

Textarea.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  isValid: PropTypes.bool,
  disabled: PropTypes.bool,
  errMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rows: PropTypes.number,
  cols: PropTypes.number
}