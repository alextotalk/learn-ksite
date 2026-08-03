"use client";

import React from "react";
import { Lesson, CATEGORIES } from "@/data/courses";

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onSelect: (lesson: Lesson) => void;
  onToggleComplete: (id: string, e: React.MouseEvent) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isCompleted,
  onSelect,
  onToggleComplete,
}) => {
  const categoryInfo = CATEGORIES.find((c) => c.id === lesson.category) || CATEGORIES[0];

  return (
    <div className={`glass-panel card-container ${isCompleted ? "completed" : ""}`} onClick={() => onSelect(lesson)}>
      <div className="card-header">
        <div className="category-badge" style={{ backgroundColor: categoryInfo.badgeBg, color: categoryInfo.color }}>
          <span>{categoryInfo.icon}</span>
          <span>{categoryInfo.name}</span>
        </div>
        
        <div className="meta-badges">
          <span className="level-tag">{lesson.level}</span>
          <span className="duration-tag">⏱️ {lesson.duration}</span>
        </div>
      </div>

      <h3 className="card-title">{lesson.title}</h3>
      <p className="card-summary">{lesson.summary}</p>

      <div className="card-footer">
        <button
          className={`complete-toggle-btn ${isCompleted ? "checked" : ""}`}
          onClick={(e) => onToggleComplete(lesson.id, e)}
          title={isCompleted ? "Позначено як пройдено" : "Позначити як пройдено"}
        >
          {isCompleted ? "✓ Пройдено" : "○ Позначити пройденим"}
        </button>

        <span className="read-more">Читати урок →</span>
      </div>

      <style jsx>{`
        .card-container {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: pointer;
          position: relative;
        }

        .card-container.completed {
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.05);
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .meta-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .level-tag {
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        .card-container:hover .card-title {
          color: var(--accent-primary);
        }

        .card-summary {
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.5;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .complete-toggle-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .complete-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }

        .complete-toggle-btn.checked {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.5);
          color: #10b981;
        }

        .read-more {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-primary);
          transition: transform 0.2s ease;
        }

        .card-container:hover .read-more {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};
