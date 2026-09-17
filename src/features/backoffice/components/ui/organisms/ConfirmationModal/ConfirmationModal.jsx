import Modal from '../../../../../../shared/components/ui/molecules/Modal/Modal.jsx';
import Button from '../../../../../../shared/components/ui/atoms/Button/Button.jsx';
import './ConfirmationModal.scss';

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = '¿Confirmar acción?',
    subtitle,
    message,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    tone = 'default',
    children,
}) {
    const confirmClasses = [
        'confirmation-modal__confirm',
        tone === 'danger' && 'confirmation-modal__confirm--danger',
    ].filter(Boolean).join(' ');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            subtitle={subtitle}
            footer={
                <div className="confirmation-modal__actions">
                    <Button variant="primary" className={confirmClasses} onClick={onConfirm}>
                        {confirmLabel}
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        {cancelLabel}
                    </Button>
                </div>
            }
        >
            {message ? <p className="confirmation-modal__message">{message}</p> : children}
        </Modal>
    );
}