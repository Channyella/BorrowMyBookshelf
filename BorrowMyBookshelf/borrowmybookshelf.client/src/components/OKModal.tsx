import React from 'react';
import './ConfirmModal.css';

interface OKModalProps {
    message: string;
    onConfirm: () => void;
}

const OKModal: React.FC<OKModalProps> = ({ message, onConfirm}) => {
    return (
        <div className={`confirm-modal`}>
            <div className="modal-content">
                <p>{message}</p>
                <div className="buttons">
                    <button onClick={onConfirm}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default OKModal;