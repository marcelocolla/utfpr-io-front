import { ReactNode } from "react";

import Usuario from "./Usuario";

class Professor extends Usuario {

  getShortInfo(): ReactNode {
    return (
      <div>
        <span>{this.usuario.Pessoa.email}</span>
        <strong>{this.usuario.matricula}</strong>
      </div>)
  }

  getFormValues(): Array<Array<string>> {
    return [ 
      ["nome_pessoa", "text", "Nome", "Pessoa.nome_pessoa"],
      ["matricula", "text", "Matrícula", "matricula"],
      ["departamento", "text", "Departamento", "id_departamento"],
      ["email", "email", "Email", "Pessoa.email"]
    ]
  }    
}

export default Professor;