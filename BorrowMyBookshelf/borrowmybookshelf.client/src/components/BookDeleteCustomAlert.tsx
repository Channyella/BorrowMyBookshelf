import React from 'react';
import './ConfirmModal.css';

interface BookDeleteAlertProps {
    message: string;
    onClose: () => void;
}

const BookDeleteCustomAlert: React.FC<BookDeleteAlertProps> = ({ message, onClose }) => {
    return (
        <div className="confirm-modal">
            <div className="modal-content">
                <p>{message}</p>
                <div className="buttons">
                    <button onClick={onClose}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default BookDeleteCustomAlert;