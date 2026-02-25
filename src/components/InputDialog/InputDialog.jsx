import React, { useState } from 'react';
import './InputDialog.css';

const InputDialog = ({ isOpen, title, label, placeholder, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(inputValue);
    setInputValue('');
  };

  const handleCancel = () => {
    onCancel();
    setInputValue('');
  };

  return (
    <div className="input-dialog-overlay" onClick={handleCancel}>
      <div className="input-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="input-dialog__header">
          <h2 className="input-dialog__title">{title}</h2>
        </div>
        <div className="input-dialog__content">
          <label className="input-dialog__label">{label}</label>
          <input
            type="text"
            className="input-dialog__input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
        </div>
        <div className="input-dialog__footer">
          <button
            className="input-dialog__button input-dialog__button--secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="input-dialog__button input-dialog__button--primary"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputDialog;
