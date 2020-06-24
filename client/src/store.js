import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'

const persistedState = loadState()
const store = createStore(reducers, persistedState, composeWithDevTools());
store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

export default store