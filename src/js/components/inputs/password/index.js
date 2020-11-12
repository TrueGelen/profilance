/* lib */
import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
/* styles */
import md from './styles.module.scss'
/* other */
// import { baseUrl } from '../../../Redux/constants'
import invisiblePasImg from './img/password_invisible.png'
import visiblePasImg from './img/password_visible.png'

/* code */
function PasswordInp({
	value,
	// type,
	name,
	placeholder,
	onChange,
	className,
	isValid,
	disabled,
	errMessage,
	showPassword,
	...props
}) {
	const [showPas, setShowPas] = useState(showPassword)

	// let path = showPas ?
	// 	`${baseUrl}assets/imgs/password_visible.png` :
	//   `${baseUrl}assets/imgs/password_invisible.png`

	let path = showPas ?
		visiblePasImg :
		invisiblePasImg


	const showPasswordHandle = () => setShowPas(!showPas)

	return (
		<div className={`${md.wrap} ${className}`}>
			{console.log(`=====PasswordInp ${name}=======`)}
			<div className={`${md.inpWrap}`}>
				<input
					className={`${isValid ? md.inp : md.err}`}
					type={showPas ? "text" : "password"}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={e => { onChange(e) }}
					disabled={disabled}
				/>
				<img
					src={path}
					className={`${md.logo}`}
					onClick={showPasswordHandle} />
			</div>
			<p
				className={`${md.errMessage} ${isValid && md.invisible}`}
			>{errMessage}</p>
		</div>
	)
}

PasswordInp.defaultProps = {
	value: '',
	// type: 'text',
	name: '',
	placeholder: '',
	onChange: () => { },
	className: null,
	isValid: true,
	disabled: false,
	errMessage: 'Неизвестная ошибка!'
}

PasswordInp.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	type: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	className: PropTypes.string,
	isValid: PropTypes.bool,
	disabled: PropTypes.bool,
	errMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default memo(PasswordInp)