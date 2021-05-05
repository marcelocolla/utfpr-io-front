import React from 'react'

import './App.css'
import {Route, Switch,BrowserRouter } from 'react-router-dom';

import Login from '../pages/login/Login'
import HomeProfessor from '../pages/home/HomeProfessor'
import HomeVigilante from '../pages/home/HomeVigilante'
import HomeDeseg from '../pages/home/HomeDeseg'
import NotFound from '../components/NotFound'
import useToken from './useToken';
import userTipoPessoa from './userTipoPessoa';
import userCodigoPessoa from './userCodigoPessoa';
import {getMemoriaLocal} from '../utilities/validacoes'


const App = () => {
    
    const { token, setToken } = useToken();
    const { tipo_usuario, setTipoPessoa } = userTipoPessoa();
    const { codigo_pessoa, setCodigoPessoa } = userCodigoPessoa();

    if(!getMemoriaLocal('token')){   
        return <Login setToken={setToken} setTipoPessoa = {setTipoPessoa} setCodigoPessoa = {setCodigoPessoa}/>
    }

    var tipo = getMemoriaLocal('tipo_usuario');
    switch(parseInt(tipo)){
        case 0:
            return (
                <BrowserRouter>
                <Switch>
                  <Route >
                    <HomeProfessor />
                  </Route>
                </Switch>
              </BrowserRouter>
            );
        case 1:
            return (
                <BrowserRouter>
                <Switch>
                  <Route >
                    <HomeDeseg />
                  </Route>
                </Switch>
              </BrowserRouter>
            );
        case 3:
            return (
                <BrowserRouter>
                <Switch>
                  <Route >
                    <HomeVigilante />
                  </Route>
                </Switch>
              </BrowserRouter>
            );
        default:  
            return (
                <BrowserRouter>
                <Switch>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </BrowserRouter>
            );                      

    }

}

export default App;