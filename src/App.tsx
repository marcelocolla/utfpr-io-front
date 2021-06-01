import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Solicitacoes from "./pages/Solicitações";
import Login from "./pages/Login";

const dados = {
  id: 0,
  nome: "Roberto Adalberto Nunes",
  matricula: 1231234,
  escopoPerfil: "deseg",
};

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/solicitacoes">
          <Solicitacoes />
        </Route>
        <Route path="/">
          <Home dados={dados} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
