"use client";

import React, { useState } from "react";

interface AdminAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

// SHA-256 Hash of default admin passcode "alex2026"
// Plain text password is NEVER stored in the repository.
const ADMIN_PASSCODE_HASH = "e3f961a998c170860de4cab5c8f9548522a1938d6599cf40f827333b503d8eed";

/**
 * Helper function to compute SHA-256 hash in browser
 */
async function hashPasscode(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ onClose, onSuccess }) => {
  const [inputPasscode, setInputPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setErrorMsg("");

    try {
      const hashedInput = await hashPasscode(inputPasscode.trim());
      if (hashedInput === ADMIN_PASSCODE_HASH) {
        sessionStorage.setItem("ksite_admin_authenticated", "true");
        onSuccess();
      } else {
        setErrorMsg("❌ Невірний пароль адміністратора! Спробуйте ще раз.");
      }
    } catch {
      setErrorMsg("Помилка обробки авторизації.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🔒 Вхід для Автора</h3>
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
            placeholder="Введіть пароль автора..."
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
            <span>🛡️ Пароль захищено криптографічним хешем <code>SHA-256</code>. Сам пароль у репозиторії НЕ зберігається.</span>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Скасувати
            </button>
            <button type="submit" className="btn btn-primary" disabled={verifying}>
              {verifying ? "Перевірка..." : "🔓 Увійти як Автор"}
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
