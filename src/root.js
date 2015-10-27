import React, {PropTypes} from 'react'
import { Redirect, Route } from 'react-router'
import { ReduxRouter } from 'redux-router'
import configureStore from 'common/utils/configure-store'
import { Map } from 'Immutable'
import * as components from './components'

const {
  Application
} = components

/* Initial State */
const initialState = {
  application: {
    session: ''
  },
  repo: {
    selectedUser: 'rails',
    selectedRepo: 'rails',
    repo: Map({})
  }
}

export const store = configureStore(initialState)

function getRootChildren(props) {
  const rootChildren = [<div key="mainRoutes">{renderRoutes()}</div>];
   if (DEBUG) {
    const DevTools = require('common/components/DevTools')
    rootChildren.push(<DevTools key="devtools" />)
  }
  return rootChildren;
}

function renderRoutes() {
   return (
    <ReduxRouter>
      <Route path="/" component={Application}>
      </Route>
    </ReduxRouter>
  )
}

export default class Root extends React.Component {

  render () {
    return (
      <div>{getRootChildren(this.props)}</div>
    )
  }
}