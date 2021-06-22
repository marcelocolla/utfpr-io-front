import { useContext } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Solicitacoes from "./pages/Solicitações";
import CadastroSolicitacao from "./pages/CadastroSolicitacao";

import { AuthContext } from "./contexts/AuthContext";
import CadastroUsuario from "./pages/CadastroUsuario";

type CustomRouteProps = {
  path?: string;
  component: any;
  exact?: boolean;
  isPrivate?: boolean;
};

function CustomRoute({ isPrivate, ...params }: CustomRouteProps) {
  const { loading, isAuthenticated, user } = useContext(AuthContext);

  console.log(user);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...params} />;
}

function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute isPrivate exact path="/" component={Home} />
      <CustomRoute
        isPrivate
        exact
        path="/solicitacoes"
        component={Solicitacoes}
      />
      <CustomRoute
        isPrivate
        exact
        path="/cadastro_solicitacao"
        component={CadastroSolicitacao}
      />
      <CustomRoute
        isPrivate
        path="/usuarios/:tipo"
        component={CadastroUsuario}
      />
    </Switch>
  );
}

export default Routes;
