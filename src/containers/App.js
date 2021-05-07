
import React from 'react'

import './App.css'
import {Route, Switch,BrowserRouter } from 'react-router-dom';

import Login from '../pages/login/Login'
import HomeProfessor from '../pages/home/HomeProfessor'
<<<<<<< HEAD
import HomeSolicitacao from '../pages/home/HomeSolicitacao'
import CriarSolicita from '../pages/home/Criar-solicitacao'
=======
import HomeVigilante from '../pages/home/HomeVigilante'
import HomeDeseg from '../pages/home/HomeDeseg'
>>>>>>> 6ff850e6648565c34fa759745af35f831e5ad70c
import NotFound from '../components/NotFound'
import useToken from './useToken';
import userTipoPessoa from './userTipoPessoa';
import userCodigoPessoa from './userCodigoPessoa';
import {getMemoriaLocal} from '../utilities/validacoes'


const App = () => {
<<<<<<< HEAD
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <ProtectedRoute exact path="/prof" component={HomeProfessor}/>
            <ProtectedRoute exact path="/solicitacao" component= {HomeSolicitacao}/>
            <ProtectedRoute exact path="/criasolicitacao" component= {CriarSolicita}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    )
=======
    
    const { token, setToken } = useToken();
    const { tipo_usuario, setTipoPessoa } = userTipoPessoa();
    const { codigo_pessoa, setCodigoPessoa } = userCodigoPessoa();
    console.log(getMemoriaLocal('token'));
    console.log(!getMemoriaLocal('token'));
    while(!getMemoriaLocal('token')){   
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

>>>>>>> 6ff850e6648565c34fa759745af35f831e5ad70c
}

export default App;