
import React from 'react'

import './HomeSolicitacao.css'


const HomeSolicitacao = () => {

    return (
        <div className="base-container">
            <a href="#">
                <div className="solicitacao-container">
                    <img src="logo192.png" className="solicitacao-avatar" alt="logo"/>
                    <div className="solicitacao-detalhes">
                        <div className="solicitacao-professor">Pedro Carlos de Oliveira</div>
                        <div className="solicitacao-datas">
                            <div className="solicitacao-inicio">20/04</div>
                            <span className="circle"/>
                            <div className="solicitacao-hora">17:35</div>
                        </div>
                    </div>
                </div>
            </a>

            <a href="#">
                <div className="solicitacao-container">
                    <img src="logo192.png" className="solicitacao-avatar" alt="logo"/>
                    <div className="solicitacao-detalhes">
                        <div className="solicitacao-professor">Pedro Carlos de Oliveira</div>
                        <div className="solicitacao-datas">
                            <div className="solicitacao-inicio">20/04</div>
                            <span className="circle"/>
                            <div className="solicitacao-hora">17:35</div>
                        </div>
                    </div>
                </div>
            </a>

            <a href="#">
                <div className="solicitacao-container">
                    <img src="logo192.png" className="solicitacao-avatar" alt="logo"/>
                    <div className="solicitacao-detalhes">
                        <div className="solicitacao-professor">Pedro Carlos de Oliveira</div>
                        <div className="solicitacao-datas">
                            <div className="solicitacao-inicio">20/04</div>
                            <span className="circle"/>
                            <div className="solicitacao-hora">17:35</div>
                        </div>
                    </div>
                </div>
            </a>

            <div className="Icons">
                <button
                    className="Icon-Button"
                    type="submit">Criar solicitação
                </button>
                
            </div>
        </div>
    )
}

export default HomeSolicitacao