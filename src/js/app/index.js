/* libs */
import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
/* components */
import NoticeError from '../components/errors/notice'
import LoadingSpinner from '../components/loadingSpinner'
import Button from '../components/buttons/goldBtn'
import PopUp from '../components/popUp'
import LogIn from '../components/login'
/* styles */
import md from './app.module.scss'
import ms from '../../scss/main.module.scss'
/* other */
import { routes, routesMap } from '../routes'
import {
  errorHide,
  logoutRequest,
  logoutSuccess,
  logoutError
} from '../Redux/actionCreators'

function App(props) {
  // console.log("App")
  const [popAuth, setPopAuth] = useState(false)

  const dispatch = useDispatch()
  const errStore = useSelector(state => state.errStore)
  const userStore = useSelector(state => state.user)

  const showPopAuth = () => {
    setPopAuth(true)
  }

  const hidePopAuth = () => {
    setPopAuth(false)
  }

  const logout = () => {
    try {
      dispatch(logoutRequest())
      dispatch(logoutSuccess())
      hidePopAuth()
    } catch (err) {
      dispatch(logoutError())
    }
  }

  const routesComponents = routes.map((route) => {
    return <Route path={route.url}
      component={route.container}
      exact={route.exact}
      key={route.url}
    />
  })

  const authBtn = useMemo(() => {
    return userStore.isAuthorized ?
      <Button
        name="loginBtn"
        onClick={logout}
        value="Выйти"
        disabled={userStore.isLoading} />
      :
      <Button
        name="loginBtn"
        value="Войти"
        disabled={userStore.isLoading}
        onClick={showPopAuth} />
  }, [userStore.isAuthorized])

  // console.log("userStore.isAuthorized", userStore.isAuthorized)

  return (
    <Router>
      <>
        {userStore.isLoading ? <LoadingSpinner />
          :
          <>
            <header className={md.header}>
              <div className={`${ms.container}`}>
                <div className={md.headerWrap}>
                  <menu className={md.menu}>
                    <ul className={md.menu__ul}>
                      <NavLink
                        className={md.menu__a}
                        exact
                        to={routesMap.home}
                        activeClassName={md.menu__a_active}>
                        <li className={md.menu__li}>
                          Главная
                        </li>
                      </NavLink>
                      <NavLink
                        className={md.menu__a}
                        exact
                        to={routesMap.news}
                        activeClassName={md.menu__a_active}>
                        <li className={md.menu__li}>
                          Новости
                        </li>
                      </NavLink>
                    </ul>
                  </menu>
                  {authBtn}
                </div>
              </div>
            </header>
            {/* content */}
            <main className={md.content}>
              <div className={ms.container}>
                <Switch>
                  {routesComponents}
                </Switch>
              </div>
            </main>
          </>
        }

        {/* AUTH POPUP */}
        <PopUp
          onClose={hidePopAuth}
          show={popAuth && !userStore.isAuthorized}>
          <LogIn isLoading={userStore.isLoading} />
        </PopUp>

        <NoticeError
          text={errStore.errMessage}
          onClose={() => { dispatch(errorHide()) }}
          isError={errStore.isError} />
      </>
    </Router >
  )
}

export default App