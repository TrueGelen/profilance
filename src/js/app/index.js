/* libs */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect } from 'react-router-dom'

/* components */
import NoticeError from '../components/errors/notice'
import LoadingSpinner from '../components/loadingSpinner'

/* styles */
import md from './app.module.scss'
import ms from '../../scss/main.module.scss'

/* other */
import { routes, routesMap } from '../routes'
import {
  errorHide,
} from '../Redux/actionCreators'
// import { baseUrl } from '../Redux/constants'

function App(props) {
  // console.log("App")
  const [popAuth, setPopAuth] = useState(false)

  const dispatch = useDispatch()
  const errStore = useSelector(state => state.errStore)
  const userStore = useSelector(state => state.user)

  const openPopAuth = () => {
    setPopAuth(true)
  }

  const hidePopAuth = () => {
    setPopAuth(false)
  }

  const routesComponents = routes.map((route) => {
    return <Route path={route.url}
      component={route.container}
      exact={route.exact}
      key={route.url}
    />
  })

  return (
    <Router>
      <>
        {userStore.isLoading ? <LoadingSpinner />
          :
          <>
            <header className={md.header}>
              <div className={`${ms.container} ${md.headerWrap}`}>
                <menu className={md.menu}>
                  <ul className={md.menu__ul}>
                    <NavLink
                      className={md.menu__a}
                      exact
                      to={routesMap.home}
                      activeClassName={md.activeLink}>
                      <li className={md.menu__li}>
                        Главная
                        </li>
                    </NavLink>
                    <NavLink
                      className={md.menu__a}
                      exact
                      to={routesMap.news}
                      activeClassName={md.activeLink}>
                      <li className={md.menu__li}>
                        Новости
                        </li>
                    </NavLink>
                  </ul>
                </menu>

                {/* наверное в идеале, это должна быть одна из кнопок на проект
                    т.е. импортируемый компонент */}
                <button
                  className={md.button}
                >{userStore.isAuthorized ? "Выйти" : "Войти"}</button>
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
        <div className={``}>

        </div>

        <NoticeError
          text={errStore.errMessage}
          onClose={() => { dispatch(errorHide()) }}
          isError={errStore.isError}
        />
      </>
    </Router >
  )
}

export default App