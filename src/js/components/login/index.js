/* lib */
import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
/* components */
import Input from '../inputs/mainInput'
import PasswordInp from '../inputs/password'
import Button from '../buttons/goldBtn'
/* other */
import {
  loginRequest,
  loginSuccess,
  loginError,
  errorShow
} from '../../Redux/actionCreators'
/* styles */
import md from './styles.module.scss'
import { users, usersMap } from '../../bd'

export default function LogIn({
  className,
  isLoading,
  ...props }) {

  const dispatch = useDispatch()

  const [state, setState] = useState({
    email: {
      value: '',
      errMessage: 'Не корректный email',
      isValid: true,
      validate: (value) => {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          .test(value.trim())
      }
    },
    password: {
      value: '',
      isValid: true,
      validate: (value) => { return true }
    }
  })

  const onChange = useCallback((e) => {
    const value = e.target.value
    const name = e.target.name
    setState(prevState => {
      const isValid = prevState[name].validate(value)
      return {
        ...prevState, [name]:
        {
          ...prevState[name],
          value,
          isValid
        }
      }
    })
  }, [])

  const auth = (email, password) => {
    let success = false
    dispatch(loginRequest())
    if (email.toLowerCase() in usersMap) {
      if (users[usersMap[email]].password === password) {
        success = true
      } else {
        success = false
      }
    } else {
      success = false
    }
    return success
  }

  const onSubmit = async () => {
    try {
      const email = state.email.value
      const password = state.password.value
      if (auth(email, password)) {
        setState(prevState => ({ ...prevState, password: { ...prevState.password, value: '' } }))
        dispatch(loginSuccess({ ...users[usersMap[email]], password: undefined }))
      } else {
        dispatch(loginError())
        dispatch(errorShow("Не верно указаны почта или пароль!"))
      }
    } catch (error) {
      dispatch(loginError())
      dispatch(errorShow("Не верно указаны почта или пароль!"))
    }
  }

  return (
    <form
      className={`${md.form} ${className && className}`}
      onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
      <Input
        disabled={isLoading}
        value={state.email.value}
        type="email"
        name="email"
        placeholder="Электронная почта"
        errMessage={state.email.errMessage}
        isValid={state.email.isValid}
        onChange={onChange} />
      <PasswordInp
        disabled={isLoading}
        value={state.password.value}
        name="password"
        placeholder="Пароль"
        onChange={onChange} />
      <Button
        type="submit"
        disabled={isLoading}
        value={isLoading ? "Вход в систему, ждите..." : "Войти"} />
    </form>
  )
}

LogIn.defaultProps = {
  className: undefined,
  isLoading: false
}

LogIn.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool
}