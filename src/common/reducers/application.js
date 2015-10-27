import * as constants from '../constants'
import createReducer from '../utils/create-reducer'

const initialState = {
  session: null
}

const ownerSelector = state => state.owner
const repoSelector = state => state.repo

const actionHandlers = {
  [constants.LOGGED_IN]: (_, action) => action.payload,
  [constants.LOG_OUT]: () => ({ session: null }),
  [constants.FETCH_REPO]: (state, action) => ({repo: action.repo})
}

export default createReducer(initialState, actionHandlers)