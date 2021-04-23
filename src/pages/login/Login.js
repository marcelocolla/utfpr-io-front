import React from 'react'

import { Formik, Form } from 'formik'
import * as yup from 'yup'

import './Login.css'
import Header from './Header'
import InputField from '../../components/InputField'

const Login = () => {
  const handleSubmit = values => console.log(values)

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })

  return (
    <div className="base-container">
      <Header />

      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}>
          <Form className="Login">
              <InputField
                value='email'
                type='email'
                label='Usuário'/>

              <InputField
                value='password'
                type='password'
                label='Senha'/>

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
  )
}

export default Login
