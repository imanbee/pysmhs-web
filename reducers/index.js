import { combineReducers } from 'redux'
import {
  REQUEST_HANDLERS, RECEIVE_HANDLERS
} from '../actions'

function handlers(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_HANDLERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_HANDLERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.handlers,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function handlersByReddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.reddit]: posts(state[action.reddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
    handlers
})

export default rootReducer
