import React from 'react';
import './ConfirmModal.css';

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel, confirmText, cancelText }) => {
    return (
        <div className={`confirm-modal`}>
            <div className="modal-content">
                <p>{message}</p>
                <div className="buttons">
                    <button onClick={onConfirm}>{confirmText ?? "Yes"}</button>
                    <button onClick={onCancel}>{cancelText ?? "No"}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
