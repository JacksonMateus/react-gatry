import React, { Children } from "react";
import ReactDOM from "react-dom";
import './Modal.css'

const portalRoot = document.getElementById('portal-root')

const UIModal = ({ children, isOpen, onClickClose }) => {
    if (!isOpen) {
        return null
    }

    return ReactDOM.createPortal(
        <div className="ui-modal__overlay">
            <div className="ui-modal"> 
                <button type="button" className="ui-modal__close-button" onClick={onClickClose}>Fechar Comentários</button>
                {children}
            </div>

        </div>,
        portalRoot,
    )
}


export default UIModal;