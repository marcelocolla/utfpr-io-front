import React from 'react'

import { Formik, Form } from 'formik'
import * as yup from 'yup'


import './Criar-solicitacao.css'
import InputField from '../../../components/InputField'


const CriarSolicita = props => {

    return (
        <div className="base-container">
            <Formik
                initialValues={{
                    codigo: '',
                    nome: '',
                    veículo: '',
                    observacao: '',
                }}

                render={({values}) => (
                    <Form className="Solicitaçao">
                        <InputField value='codigo' type='codigo' label='Código' />
                        <InputField value='nome' type='nome' label='Nome' />
                        <InputField value='veiculo' type='veiculo' label='Veículo' />
                        <InputField value='observacao' type='observacao' label='Observações' />

                        <div className="footer1">
                            <div className="Icons">
                                <button
                                    className="Button"
                                    type="submit">Criar
                                </button>
                                <button
                                    className="Button"
                                    type="submit">Cancelar
                                </button>
                            </div>
                        </div>
                    </Form>

                )}
                
            />
        </div>
    )
}

export default CriarSolicita