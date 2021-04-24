import React from 'react'

import './App.css'
import { Switch, Route } from 'react-router-dom'
import { ProtectedRoute } from '../utilities/protectedroute'

import Login from '../pages/login/Login'
import HomeProfessor from '../pages/home/HomeProfessor'
import NotFound from '../components/NotFound'

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <ProtectedRoute exact path="/prof" component={HomeProfessor}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    )
}

export default App;