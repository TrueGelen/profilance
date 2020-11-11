/* lib */
import React from 'react'
import { useSelector } from 'react-redux'
/* components */
/* other */
import {
} from '../../Redux/actionCreators'
/* styles */
import md from './styles.module.scss'

function HomePage(props) {

  const userStore = useSelector(state => state.user)

  return (
    <div className={md.hello}>{userStore.isAuthorized ?
      `Привет, ${userStore.user.firstName}!`
      :
      `Привет, Гость!`}</div>
  )
}

export default HomePage