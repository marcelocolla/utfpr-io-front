
type PessoaProps = {
    nome_pessoa: string;
    email: string;
    tipo_usuario: number;
}

type TurnoProps = {
    id_turno: number;
    nome_turno: string;
}

type UsuarioProps = {
    id_pessoa: number;
    matricula: number;
    Pessoa: PessoaProps;
    Turno?: TurnoProps;
}

abstract class Usuario {
    usuario: UsuarioProps;

    constructor(usuario: UsuarioProps) {
        this.usuario = usuario;
    }

    abstract getShortInfo(): React.ReactNode;
    abstract getFormValues(): Array<Array<string>>;
}

export default Usuario;