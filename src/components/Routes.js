import React from 'react'
import { Router, Switch, Route } from 'react-router'

import Login from '../pages/login/Login'
import NotFound from './NotFound'

import {history} from '../history'

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

export default Routes
