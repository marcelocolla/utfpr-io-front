import { Form, Formik, validateYupSchema } from "formik";
import { useState } from "react";
import { useHistory } from "react-router";
import { FormBody } from "../../components/Form/FormSection/FormBody";
import { FormLine } from "../../components/Form/FormSection/FormLine";
import InputField from "../../components/Form/InputField";
import PasswordField from "../../components/Form/PasswordField";
import { Button } from "../../components/Button/Button";
import { FormFooter } from "../../components/Form/FormSection/FormFooter";

import { Modal } from "../../components/Modal";

import * as S from "./styles";
import Solicitacoes from "../Solicitações";

type Values = {
  ra_aluno: string;
  email: string;
  nome: string;
  data_inicio: string;
  data_fim: string;
  local: string;

}

type pessoa = {
  codigo_barra:string;
  email:string;
  nome_pessoa:string;
  tipo_usuario:Number;
  id_pessoa: Number;
}

type getAluno = {
  id_aluno: number;
  id_pessoa: number;
  ra_aluno: string;
  Pessoa: pessoa;
  
}

type getProfessor = {
  id_professor: number;
  id_pessoa: number;
  id_departametno: number;
  matricula: string;
  permissao_deseg: number;
  senha: string;
  Pessoa: pessoa;
  
}

type getDeseg = {
  id_deseg: number;
  id_pessoa: number;
  matricula: string;
  senha: string;
  Pessoa: pessoa;
  
}

type getSolicitacao = {
  id_aluno: number;
  ra_aluno: string;
  email: string;
  nome: string;
  codigo_barra:string,
  tipo_usuario: number,
  id_pessoa_cadastro:number;
  id_pessoa_permitiu:number;
  data_permissao:string;
  hora_permissao:string;
  data_inicio: string;
  data_fim: string;
  permissao_acesso:number;
  locais:[
    {
      id_local: number;
      nome: string;
   }
  ]
}

const cadastroSolicitacao = () => {
    let tipo_pessoa = 0;

   const  professor = (id:number)  =>{
      return fetch(`https://utf-io-staging.herokuapp.com/professor/${id}`)
        .then((res)=> res.json()); 
    }

    const  deseg = (id:number)  =>{
      return fetch(`https://utf-io-staging.herokuapp.com/deseg/${id}`)
        .then((res)=> res.json()); 
    }

    async function handleSubmit(values: Values) {
      if(tipo_pessoa === 1){
        deseg(2).then((dados)=>{
          if(dados.deseg.length === 0){
            alert("Deseg não encontrado!");   
          }else{
            dados.deseg.forEach((item:getDeseg)=>{
              var newArray = new Array();             
                newArray.push({
                  "id_pessoa_cadastro":item.id_pessoa,
                  "ra_aluno":values.ra_aluno,
                  "email":values.email,
                  "nome":values.nome,
                  "data_inicio":values.data_inicio,
                  "data_fim":values.data_fim,
                  "local":values.local,
                  "permissao_acesso":1,
                  "id_pessoa_permitiu":item.id_pessoa
                });     
                console.log(newArray);
            });
          }
        
        });      
      }else{
      professor(27).then((dados)=>{
        if(dados.professor.length === 0){
          alert("Professor não encontrado!");   
        }else{
          dados.professor.forEach((item:getProfessor)=>{
            var newArray = new Array();
            if(item.permissao_deseg==1){              
              newArray.push({
                "id_aluno":null,
                "ra_aluno":values.ra_aluno,
                "email":values.email,
                "nome":values.nome,
                "codigo_barra":null,
                "id_pessoa_cadastro":item.id_pessoa,
                "id_pessoa_permitiu":item.id_pessoa,
                "data_permissao":null,
                "hora_permissao":null,
                "tipo_usuario": 2,
                "data_inicio":values.data_inicio,
                "data_fim":values.data_fim,
                "permissao_acesso":1,
                "locais":[
                  {
                    "id_local": null,
                    "nome": values.local
                 }
                ]
              });     
            }else{
              newArray.push({
                "id_aluno":null,
                "ra_aluno":values.ra_aluno,
                "email":values.email,
                "nome":values.nome,
                "codigo_barra":null,
                "tipo_usuario": 2,
                "id_pessoa_cadastro":item.id_pessoa,
                "id_pessoa_permitiu":null,
                "data_permissao":null,
                "hora_permissao":null,
                "data_inicio":values.data_inicio,
                "data_fim":values.data_fim,
                "permissao_acesso":0,
                "locais":[
                  {
                    "id_local": null,
                    "nome": values.local
                 }
                ]
              });    
            }
            newArray.forEach((enviarSolicitacao:getSolicitacao)=>{
              let params: RequestInit = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(enviarSolicitacao)
              }
              console.log(JSON.stringify(enviarSolicitacao));
              fetch('https://utf-io-staging.herokuapp.com/solicitacao/cadastro',params
              ).then(function(response) {
                console.log(response.status); // returns 200
                if(response.status!=200){
                  alert("Dados não gerado, falar com o suporte!");
                }else{
                  window.history.back();
                }
              });
            })



              
          });
        }
      
      });
      
    }

  }


    
    async function handleBlur(ev: any,setFieldValue:any,setSubmitting :any){
      const {value} = ev.target;
      const ra = value?.replace(/[^0-9]/g, '');
      if(ra?.length < 6){
        alert("Informe um RA valido");
        return;
      }
      fetch(`https://utf-io-staging.herokuapp.com/aluno/${value}`)
          .then((res)=>res.json())
          .then((data)=>{
            if(data.aluno.length === 0){
              setSubmitting(false);
              setFieldValue("email","");
              setFieldValue("nome","");
            }else{
            data.aluno.forEach((item:getAluno)=>{
              setSubmitting(true);
              setFieldValue("email",item.Pessoa.email);
              setFieldValue("nome",item.Pessoa.nome_pessoa);
            });
          }
          });

    }
    const initialValues = {
      ra_aluno: "",
      email: "",
      nome: "",
      data_inicio: "",
      data_fim: "",
      local: "",
    };

    return(
        <S.SolicitacoesWrapper>
        <h2>Solicitação</h2>
        <br />
        <Formik  onSubmit={handleSubmit}  initialValues={{ ...initialValues }}>
        {({
          setFieldValue,
          isSubmitting,
          setSubmitting 
        }) => (
          <Form>
            <FormBody>
              <FormLine>
                <InputField name="ra_aluno" label="RA" onBlur={(ev:any) => handleBlur(ev, setFieldValue,setSubmitting)}/>
              </FormLine>
              <FormLine>
                <InputField name="email" type="email" label="Email" disabled={isSubmitting }/>
              </FormLine>
              <FormLine>
                <InputField name="nome" label="Nome" disabled={isSubmitting } />
              </FormLine>
              <FormLine>
                <InputField name="data_inicio" type="date" label="Data Inicial" />
              </FormLine>
              <FormLine>
                <InputField name="data_fim" type="date" label="Data Final" />
              </FormLine>
              <FormLine>
                <InputField name="local" label="Local" />
              </FormLine>
            </FormBody>
            <FormFooter>
              <Button name="loginButton">Salvar</Button>
            </FormFooter>
          </Form>
        )}
        </Formik>
        </S.SolicitacoesWrapper>
    );

};

export default cadastroSolicitacao;