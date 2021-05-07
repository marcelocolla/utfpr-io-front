
import React from 'react'

import './App.css'
import {Route, Switch,BrowserRouter,Redirect,useHistory   } from 'react-router-dom';

import Login from '../pages/login/Login'
import HomeProfessor from '../pages/home/professor/HomeProfessor'
import HomeSolicitacao from '../pages/home/professor/HomeSolicitacao'
import CriarSolicita from '../pages/home/professor/Criar-solicitacao'
import HomeVigilante from '../pages/home/vigilante/HomeVigilante'
import Limpar from '../pages/home/limpar'
import HomeDeseg from '../pages/home/deseg/HomeDeseg'
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
                  <Route path="/prof" > <HomeProfessor /></Route>
                  <Route path="/solicitacao" ><HomeSolicitacao/></Route>
                  <Route path="/criasolicitacao" ><CriarSolicita/></Route>   
                  <Route path="/limpar" ><Limpar/></Route>               
                </Switch>
              </BrowserRouter>
            );
        case 1:
            return (
                <BrowserRouter>
                <Switch>
                  <Route path = "/deseg">
                    <HomeDeseg />
                  </Route>
                  <Route path="/limpar" ><Limpar/></Route>    
                </Switch>
              </BrowserRouter>
            );
        case 3:
            return (
                <BrowserRouter>
                <Switch>
                  <Route path = "/vigilante">
                    <HomeVigilante />
                  </Route>
                  <Route path="/limpar" ><Limpar/></Route>    
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
                  <Route path="/limpar" ><Limpar/></Route>    
                </Switch>
              </BrowserRouter>
            );                      

    }

}

export default App;