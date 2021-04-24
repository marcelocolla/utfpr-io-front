import React from 'react'
import { Router, Switch, Route } from 'react-router'

import {history} from '../history'

import NotFound from './NotFound'
import Login from '../pages/login/Login'
import HomeProfessor from '../pages/home/HomeProfessor'

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/professor" component={HomeProfessor}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
)

export default Routes