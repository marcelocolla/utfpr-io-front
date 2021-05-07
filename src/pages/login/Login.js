import React from 'react'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import {useHistory} from 'react-router-dom'
import './Login.css'
import Header from './Header'
import InputField from '../../components/InputField'
import PropTypes from 'prop-types';
import {getMemoriaLocal} from '../../utilities/validacoes'


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
  let history = useHistory();
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

      var tipo = getMemoriaLocal('tipo_usuario');
      switch(parseInt(tipo)){
        case 0:
          history.push('/prof');
          break;
        case 1:
          history.push('/deseg');
          break;
        case 3:
          history.push('/vigilante');
          break;
        default:  
                          
    }
    window.location.reload();
      
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