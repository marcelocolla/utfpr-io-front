import { useContext } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../contexts/AuthContext";

import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";

import { Button } from "../../components/Button/Button";
import { FormBody } from "../../components/Form/FormSection/FormBody";
import { FormLine } from "../../components/Form/FormSection/FormLine";
import { FormFooter } from "../../components/Form/FormSection/FormFooter";

import { AuthProvider } from "../../contexts/AuthContext";

import * as S from "./styles";

type Values = {
  email: string;
  password: string;
};

const Login = () => {
  const { signIn } = useContext(AuthContext);

  async function handleSubmit(values: Values) {
    await signIn(values);
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <AuthProvider>
      <S.LoginWrapper>
        <S.Header>
          <img src="/img/logo.svg" alt="Logo" width="106" height="126.5" />
          <span>Login</span>
        </S.Header>
        <S.Body>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <FormBody>
                  <FormLine mb="2rem">
                    <InputField
                      name="email"
                      label="Email"
                      type="text"
                      disabled={isSubmitting}
                      required
                    />
                  </FormLine>
                  <FormLine mb="2rem">
                    <PasswordField
                      name="password"
                      label="Senha"
                      disabled={isSubmitting}
                      required
                    />
                  </FormLine>
                  <strong>Esqueceu a senha?</strong>
                </FormBody>

                <FormFooter mt="6rem">
                  <Button disabled={isSubmitting} name="loginButton">
                    Entrar
                  </Button>
                </FormFooter>
              </Form>
            )}
          </Formik>
        </S.Body>
      </S.LoginWrapper>
    </AuthProvider>
  );
};

export default Login;
