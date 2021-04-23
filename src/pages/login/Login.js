import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'

import './Login.css'

const Login = () => {
  const handleSubmit = values => console.log(values)

  return (
    <div className="base-container">
      <div className="header">
          <div className="header-logo"/>
          <div className="header-minilogo"/>
          <div className="header-title">Login</div>
          <div className="header-bottom"/>
      </div>

      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}>
          <Form className="Login">
              <div className="Login-Group">
                <label className="Login-Label">Usuário</label>
                <Field
                    name="username"
                    className="Login-Field"
                />
                <ErrorMessage
                    component="span"
                    name="username"
                    className="Login-Error"
                />
              </div>

              <div className="Login-Group">
                <label className="Login-Label">Senha</label>
                <Field
                    name="password"
                    className="Login-Field"
                />
                <ErrorMessage
                    component="span"
                    name="password"
                    className="Login-Error"
                />
              </div>

              <div className="Login-Forgot">Esqueceu a senha?</div>
          </Form>
      </Formik>

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
    </div>
  )
}

export default Login
