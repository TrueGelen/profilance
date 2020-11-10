/* libs */
import { createStore, applyMiddleware, compose } from 'redux'
/* other imports */
import { rootReducer } from '../reducers'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(

    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store