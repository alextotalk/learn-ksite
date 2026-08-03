"use client";

import React, { useState } from "react";
import { Lesson, CATEGORIES, TOPIC_GROUPS, TopicGroup, CategoryId } from "@/data/courses";

interface AddLessonModalProps {
  onClose: () => void;
  onAddLesson: (lesson: Lesson) => void;
}

export const AddLessonModal: React.FC<AddLessonModalProps> = ({ onClose, onAddLesson }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryId>("js");
  const [topicGroup, setTopicGroup] = useState<TopicGroup>("Вступ");
  const [order, setOrder] = useState<number>(3);
  const [level, setLevel] = useState<Lesson["level"]>("Початковий");
  const [duration, setDuration] = useState("15 хв");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [codeLang, setCodeLang] = useState("typescript");
  const [codeContent, setCodeContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !summary.trim() || !content.trim()) {
      alert("Будь ласка, заповніть всі обов'язкові поля.");
      return;
    }

    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      order: Number(order) || 1,
      category,
      topicGroup,
      title,
      level,
      duration,
      summary,
      content,
      codeExample: codeContent.trim()
        ? {
            language: codeLang,
            code: codeContent,
          }
        : undefined,
    };

    onAddLesson(newLesson);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ Додати новий урок / статтю</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-group">
            <label>Назва уроку / статті *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Наприклад: JS №3: Асинхронність та Promises"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Мова / Модуль *</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Тематичний блок *</label>
              <select
                className="form-select"
                value={topicGroup}
                onChange={(e) => setTopicGroup(e.target.value as TopicGroup)}
              >
                {TOPIC_GROUPS.map((tg) => (
                  <option key={tg} value={tg}>
                    {tg}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Порядок уроку (#)</label>
              <input
                type="number"
                min={1}
                className="form-input"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Рівень складності *</label>
              <select
                className="form-select"
                value={level}
                onChange={(e) => setLevel(e.target.value as Lesson["level"])}
              >
                <option value="Початковий">Початковий</option>
                <option value="Середній">Середній</option>
                <option value="Просунутий">Просунутий</option>
              </select>
            </div>

            <div className="form-group">
              <label>Час читання</label>
              <input
                type="text"
                className="form-input"
                placeholder="15 хв"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Короткий опис (Summary) *</label>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="Короткий анонс теми..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Повний зміст (Markdown) *</label>
            <textarea
              className="form-textarea"
              rows={5}
              placeholder="Основний матеріалу (підтримує ### заголовки, списки 1. та *)..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Мова підсвічування коду</label>
              <input
                type="text"
                className="form-input"
                placeholder="typescript, php, go, python, sql..."
                value={codeLang}
                onChange={(e) => setCodeLang(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Приклад коду (опціонально)</label>
            <textarea
              className="form-textarea code-font"
              rows={4}
              placeholder="// Ваш приклад коду тут..."
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Скасувати
            </button>
            <button type="submit" className="btn btn-primary">
              💾 Зберегти новий урок
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
          z-index: 1000;
          padding: 1.5rem;
        }

        .modal-content {
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          background: var(--bg-secondary);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
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

        .form-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 1rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(10, 13, 20, 0.8);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.9rem;
          outline: none;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: var(--accent-primary);
        }

        .code-font {
          font-family: var(--font-code);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};
