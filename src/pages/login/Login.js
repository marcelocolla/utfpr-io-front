import React from 'react'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './Login.css'
import Header from './Header'
import InputField from '../../components/InputField'
import PropTypes from 'prop-types';
import App from '../../containers/App'
import HomeVigilante from '../home/vigilante/HomeVigilante';
import HomeProfessor from '../home/professor/HomeProfessor';
import HomeDeseg from '../home/deseg/HomeDeseg';



async function loginUser(credentials) {
  // Realizando autenticação:
  return fetch('https://utf-io-staging.herokuapp.com/auth/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
    
  })
    .then( data => data.json())
    
 }

 export default function Login({ setToken,setTipoPessoa,setCodigoPessoa }) {
   const handleSubmit = async e => {

     const json = await loginUser({
       email:e.email,
       senha:e.password
      }
     );
     if(json.token!==undefined){
        setToken(json.token);
      }
     if(!json.pessoa.tipo_usuario!==undefined){
        setTipoPessoa(json.pessoa.tipo_usuario);
      }
    if(!json.pessoa.id_pessoa!==undefined){
        setCodigoPessoa(json.pessoa.id_pessoa);
      }
      switch(json.pessoa.tipo_usuario){
        case 0: 
        window.location.reload();
        break;
        case 1:
          window.location.reload();
          break;
        case 3:
          window.location.reload();
          break;
      }
      
   }

   
 

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).required()
  }) 
  return (
    <div className="base-container">
      <Header />

      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
        >
          <Form className="Login">
              <InputField value='email' type='email' label='Usuário' />
              <InputField value='password' type='password' label='Senha' />
              <div className="Login-Forgot">Esqueceu a senha?</div>
              <div className="reminder">
                Se você for servidor, informe nos campos acima o nome de usuário
                e senha que utiliza para acessar os sistemas da UTFPR.
              </div>

              <div className="footer">
                <button
                    className="Login-Button"
                    type="submit">Entrar
                </button>
              </div>
          </Form>
      </Formik>
    </div>
  );
 }

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};
Login.propTypes = {
  setTipoPessoa: PropTypes.func.isRequired
};

Login.propTypes = {
  setCodigoPessoa: PropTypes.func.isRequired
};