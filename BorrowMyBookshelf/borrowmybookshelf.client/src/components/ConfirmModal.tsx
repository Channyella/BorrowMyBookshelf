import React, { useState } from 'react';
import './ConfirmModal.css'; // Import CSS for styling

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleConfirm = () => {
        setIsOpen(false);
        onConfirm();
    };

    const handleCancel = () => {
        setIsOpen(false);
        onCancel();
    };

    return (
        <div className={`confirm-modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <p>{message}</p>
                <div className="buttons">
                    <button onClick={handleConfirm}>Yes</button>
                    <button onClick={handleCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
