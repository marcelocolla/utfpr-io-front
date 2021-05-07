import React from 'react'
import {limparStorage} from '../../utilities/storageUser'
const limpando = e =>{
  limparStorage() ;
}
export default function limpar() {
    return(
      <a onClick={limpando}>Limpar</a>
    );
  }