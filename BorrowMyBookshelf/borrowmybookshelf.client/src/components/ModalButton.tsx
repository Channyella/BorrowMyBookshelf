import React, { useState } from 'react';
import OKModal from './OKModal';
import ConfirmModal from './ConfirmModal';


export enum ModalType {
    OKModal = 1,
    ConfirmModal = 2,
}
interface ModalButtonProps {
    message: string;
    buttonText: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    modalType: ModalType;
}

const ModalButton: React.FC<ModalButtonProps> = ({ message, buttonText, confirmText, cancelText, onConfirm, onCancel, modalType }) => {
    const [showModal, setShowModal] = useState(false);

    const _onConfirm = async () => {
        await onConfirm?.();
        setShowModal(false);
    }

    const _onCancel = async () => {
        await onCancel?.();
        setShowModal(false);
    }

    return (
        <div>
            <button className="btn btn-warning" onClick={() => setShowModal(true)}>{buttonText}</button>
            {modalType === ModalType.OKModal && showModal && (
                <OKModal message={message}
                    onConfirm={_onConfirm}
                    confirmText={confirmText}
                />
            )}
            {modalType === ModalType.ConfirmModal && showModal && (
                <ConfirmModal message={message}
                    onConfirm={_onConfirm}
                    onCancel={_onCancel}
                    confirmText={confirmText}
                    cancelText={cancelText }
                />
            )}
        </div>
    );
};

export default ModalButton;