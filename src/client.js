import React from 'react'
import {IndexRoute, Router, Route, Redirect} from "react-router"
import { createHistory } from 'history'

let history = createHistory();

var Routes = <Router history={history}>
    <Route component={require("app")}>
      <Route path="/" components={{body: require('app/body'), sidebar: require('app/sidebar')}} />
      <Route path="body" component={require('app/test')} />
    </Route>
</Router>

React.render(Routes, document.body);
