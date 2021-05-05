import { useState } from 'react';

export default function useTipoPessoa() {
  const getTipoPessoa = () => {
      const tipoPessoaString = localStorage.getItem('tipo_usuario');
      const userTipoPessoa = JSON.parse(tipoPessoaString);
      return userTipoPessoa?.tipo_usuario
    };
const [tipo_usuario, setTipoPessoa] = useState(getTipoPessoa());
const saveTipoPessoa = userTipoPessoa => {
  localStorage.setItem('tipo_usuario', JSON.stringify(userTipoPessoa));
  setTipoPessoa(userTipoPessoa.tipo_usuario);
};


return {
  setTipoPessoa: saveTipoPessoa,
  tipo_usuario
}

}

