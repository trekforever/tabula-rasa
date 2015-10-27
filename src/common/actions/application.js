import * as constants from '../constants'
import 'whatwg-fetch'

export function login (form, redirect) {
  return dispatch => {
    // simulate request
    setTimeout(() => {
      const token = Math.random().toString(36).substring(7)
      dispatch({
        type: constants.LOGGED_IN,
        payload: { token }
      })
      // Can be used to navigate to a new route
      if (redirect) redirect()
    }, 300)
  }
}