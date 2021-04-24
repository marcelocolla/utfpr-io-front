import React from 'react'

import './HomeProfessor.css'

const HomeProfessor = () => {

    return (
        <div className="base-container">
            <div className="liberacao-container">
                <img src="logo192.png" className="liberacao-avatar" alt="logo"/>
                <div className="liberacao-detalhes">
                    <div className="liberacao-nome">Pedro Carlos da Oliveira Nascimento</div>
                    <div className="liberacao-datas">
                        <div className="liberacao-inicio">20/04</div>
                        <span className="circle"/>
                        <div className="liberacao-final">26/04</div>
                    </div>
                </div>
            </div>

            <button
                className="Icon-Button"
                type="submit">Editar
            </button>
            <button
                className="Icon-Button"
                type="submit">Excluir
            </button>
        </div>
    )
}

export default HomeProfessor