import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import CadastroUsuario from "./pages/CadastroUsuario";

import Solicitacoes from "./pages/Solicitações";
import Liberacoes from "./pages/Liberações";
import Liberacao from "./pages/Liberação";
import Visitas from "./pages/Visitas";

import { AuthContext } from "./contexts/AuthContext";

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
        path="/liberacoes"
        component={Liberacoes}
      />
      <CustomRoute
        isPrivate
        path="/liberacao/:id"
        component={Liberacao}
      />
      <CustomRoute
        isPrivate
        path="/usuarios/:tipo"
        component={CadastroUsuario}
      />
      <CustomRoute
        isPrivate
        exact
        path="/visitas"
        component={Visitas}
      />
    </Switch>
  );
}

export default Routes;
