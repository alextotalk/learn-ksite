"use client";

import React, { useState } from "react";
import { Lesson, CATEGORIES } from "@/data/courses";

interface LessonModalProps {
  lesson: Lesson;
  isCompleted: boolean;
  onClose: () => void;
  onToggleComplete: (id: string) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  lesson,
  isCompleted,
  onClose,
  onToggleComplete,
}) => {
  const categoryInfo = CATEGORIES.find((c) => c.id === lesson.category) || CATEGORIES[0];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (lesson.codeExample) {
      navigator.clipboard.writeText(lesson.codeExample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="category-badge" style={{ backgroundColor: categoryInfo.badgeBg, color: categoryInfo.color }}>
            <span>{categoryInfo.icon}</span>
            <span>{categoryInfo.name}</span>
          </div>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Title */}
        <h2 className="modal-title">{lesson.title}</h2>
        <div className="modal-meta">
          <span>Рівень: <strong>{lesson.level}</strong></span>
          <span>Час читання: <strong>{lesson.duration}</strong></span>
        </div>

        {/* Formatted Content */}
        <div className="markdown-body">
          {lesson.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("### ")) {
              return <h3 key={idx} className="content-h3">{paragraph.replace("### ", "")}</h3>;
            }
            if (paragraph.startsWith("1. ") || paragraph.startsWith("* ")) {
              const items = paragraph.split("\n");
              return (
                <ul key={idx} className="content-list">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace(/^(\d+\. |\* )/, "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx} className="content-p">{paragraph}</p>;
          })}
        </div>

        {/* Code Example Section */}
        {lesson.codeExample && (
          <div className="code-block-wrapper">
            <div className="code-header">
              <span className="code-lang">
                💻 Приклад коду ({lesson.codeExample.language})
              </span>
              <button className="copy-btn" onClick={handleCopyCode}>
                {copied ? "✓ Скопійовано!" : "📋 Копіювати"}
              </button>
            </div>
            <pre className="code-pre">
              <code>{lesson.codeExample.code}</code>
            </pre>
          </div>
        )}

        {/* Interactive Quiz Section */}
        {lesson.quiz && (
          <div className="quiz-container">
            <h4 className="quiz-title">🧠 Інтерактивне тестування</h4>
            <p className="quiz-question">{lesson.quiz.question}</p>

            <div className="quiz-options">
              {lesson.quiz.options.map((opt, oIdx) => {
                let statusClass = "";
                if (selectedOption !== null) {
                  if (oIdx === lesson.quiz?.answerIndex) {
                    statusClass = "correct";
                  } else if (oIdx === selectedOption) {
                    statusClass = "wrong";
                  }
                }

                return (
                  <button
                    key={oIdx}
                    className={`quiz-option-btn ${statusClass}`}
                    onClick={() => setSelectedOption(oIdx)}
                  >
                    <span>{["A", "B", "C", "D"][oIdx]}.</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className={`quiz-explanation ${selectedOption === lesson.quiz.answerIndex ? "success" : "warning"}`}>
                <p>
                  <strong>
                    {selectedOption === lesson.quiz.answerIndex ? "🎉 Правильно!" : "❌ Незовсім вірно."}
                  </strong>{" "}
                  {lesson.quiz.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <button
            className={`btn ${isCompleted ? "btn-secondary" : "btn-primary"}`}
            onClick={() => onToggleComplete(lesson.id)}
          >
            {isCompleted ? "✓ Пройдено (Скасувати)" : "✅ Позначити урок як пройдений"}
          </button>
          
          <button className="btn btn-secondary" onClick={onClose}>
            Закрити
          </button>
        </div>
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
          z-index: 1000;
          padding: 1.5rem;
        }

        .modal-content {
          width: 100%;
          max-width: 750px;
          max-height: 85vh;
          overflow-y: auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-glow);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.8rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .modal-meta {
          display: flex;
          gap: 1.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 0.75rem;
        }

        .markdown-body {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .content-h3 {
          font-size: 1.2rem;
          color: var(--text-primary);
          margin-top: 0.5rem;
        }

        .content-list {
          padding-left: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .code-block-wrapper {
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #080b11;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .code-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .copy-btn {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-secondary);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.75rem;
        }

        .copy-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .code-pre {
          padding: 1rem;
          overflow-x: auto;
          font-family: var(--font-code);
          font-size: 0.88rem;
          color: #e2e8f0;
          line-height: 1.5;
        }

        .quiz-container {
          background: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .quiz-title {
          font-size: 1.05rem;
          color: var(--accent-primary);
        }

        .quiz-question {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quiz-option-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          text-align: left;
          transition: all 0.2s ease;
        }

        .quiz-option-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }

        .quiz-option-btn.correct {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #10b981;
          font-weight: 600;
        }

        .quiz-option-btn.wrong {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          color: #ef4444;
        }

        .quiz-explanation {
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }

        .quiz-explanation.success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .quiz-explanation.warning {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
};
