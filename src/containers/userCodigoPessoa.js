import { useState } from 'react';

export default function useCodigoPessoa() {
  const getCodigoPessoa = () => {
      const codigoPessoaString = localStorage.getItem('codigo_pessoa');
      const userCodigoPessoa = JSON.parse(codigoPessoaString);
      return userCodigoPessoa?.codigo_pessoa
    };
const [codigo_pessoa, setCodigoPessoa] = useState(getCodigoPessoa());
const saveCodigoPessoa = userCodigoPessoa => {
  localStorage.setItem('codigo_pessoa', JSON.stringify(userCodigoPessoa));
  setCodigoPessoa(userCodigoPessoa.codigo_pessoa);
};


return {
  setCodigoPessoa: saveCodigoPessoa,
  codigo_pessoa
}

}