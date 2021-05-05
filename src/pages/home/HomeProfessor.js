import React from 'react'

import './HomeProfessor.css'

const HomeProfessor = () => {

    return (
        <div className="base-container">
            <div className="liberacao-container">
                <img src="logo192.png" className="liberacao-avatar" alt="logo"/>
                <div className="liberacao-detalhes">
                    <div className="liberacao-nome">Pedro Carlos de Oliveira</div>
                    <div className="liberacao-datas">
                        <div className="liberacao-inicio">20/04</div>
                        <span className="circle"/>
                        <div className="liberacao-final">26/04</div>
                    </div>
                </div>
            </div>

            <div className="Icon">
                <button
                    className="IconButton"
                    type="submit">Editar
                </button>
                <button
                    className="IconButton"
                    type="submit">Excluir
                </button>
            </div>
        </div>
    )
}

export default HomeProfessor