import React from 'react'

import './App.css'
import Login from '../pages/login/Login'
import HomeProfessor from '../pages/home/HomeProfessor'
import useToken from './useToken'

const App = () => {
    const { token, setToken } = useToken()

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <HomeProfessor/>
    )
}

export default App;
