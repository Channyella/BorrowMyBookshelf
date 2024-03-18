import React from 'react';
import './ConfirmModal.css';

interface OKModalProps {
    message: string;
    onConfirm: () => void;
    confirmText?: string;
}

const OKModal: React.FC<OKModalProps> = ({ message, onConfirm, confirmText}) => {
    return (
        <div className={`confirm-modal`}>
            <div className="modal-content">
                <p>{message}</p>
                <div className="buttons">
                    <button onClick={onConfirm}>{confirmText ?? "OK"}</button>
                </div>
            </div>
        </div>
    );
};

export default OKModal;