import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-dialog__header">
          <h2 className="confirm-dialog__title">{title}</h2>
        </div>
        <div className="confirm-dialog__content">
          <p className="confirm-dialog__message">{message}</p>
        </div>
        <div className="confirm-dialog__footer">
          <button
            className="confirm-dialog__button confirm-dialog__button--secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="confirm-dialog__button confirm-dialog__button--primary"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
