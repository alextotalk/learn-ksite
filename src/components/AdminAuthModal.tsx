"use client";

import React, { useState } from "react";

interface AdminAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "alex2026";

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ onClose, onSuccess }) => {
  const [inputPasscode, setInputPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPasscode.trim() === ADMIN_PASSCODE) {
      sessionStorage.setItem("ksite_admin_authenticated", "true");
      onSuccess();
    } else {
      setErrorMsg("❌ Невірний пароль адміністратора! Спробуйте ще раз.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🔒 Вхід для Адміністратора</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="modal-desc">
          Додавати нові уроки та навчальні статті може <strong>лише автор/адміністратор сайту</strong>. Введіть ваш секретний пароль:
        </p>

        <form onSubmit={handleVerify} className="auth-form">
          <input
            type="password"
            className="form-input"
            placeholder="Введіть пароль адміністратора..."
            value={inputPasscode}
            onChange={(e) => {
              setInputPasscode(e.target.value);
              setErrorMsg("");
            }}
            autoFocus
            required
          />

          {errorMsg && <p className="error-text">{errorMsg}</p>}

          <div className="hint-box">
            <span>🔑 За замовчуванням пароль автора: <code>alex2026</code></span>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Скасувати
            </button>
            <button type="submit" className="btn btn-primary">
              🔓 Увійти як Автор
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          padding: 1.5rem;
        }

        .modal-content {
          width: 100%;
          max-width: 460px;
          padding: 2rem;
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
        }

        .modal-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-input {
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(10, 13, 20, 0.8);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.95rem;
          outline: none;
        }

        .form-input:focus {
          border-color: var(--accent-primary);
        }

        .error-text {
          font-size: 0.85rem;
          color: #ef4444;
        }

        .hint-box {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(99, 102, 241, 0.08);
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .hint-box code {
          color: var(--accent-primary);
          font-family: var(--font-code);
          font-weight: 700;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};
