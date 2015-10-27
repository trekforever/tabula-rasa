import * as constants from '../constants'
import createReducer from '../utils/create-reducer'
import { Map, fromJS } from 'Immutable'

const initialState = {
  selectedUser: 'rails',
  selectedRepo: 'rails',
  repo: Map({}),
  isLoading: true
}

const actionHandlers = {
  [constants.FETCH_REPO]: (state, action) => ({
    isLoading: action.isLoading
  }),
  [constants.FETCH_REPO_SUCCESS]: (state, action) => ({
    repo: fromJS(action.repo),
    selectedUser: action.selectedUser,
    selectedRepo: action.selectedRepo,
    isLoading: false
  })
}

export default createReducer(initialState, actionHandlers)