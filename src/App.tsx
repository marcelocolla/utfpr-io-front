import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Solicitacoes from "./pages/Solicitações";

const dados = {
  id: 0,
  nome: "Roberto Adalberto Nunes",
  matricula: 1231234,
  escopoPerfil: "any",
};

function App() {
  return (
    <BrowserRouter>
      <Switch>
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
