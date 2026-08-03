"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lesson, CATEGORIES } from "@/data/courses";
import { CommentsSection } from "@/components/CommentsSection";
import { Navbar } from "@/components/Navbar";

interface LessonDetailClientProps {
  initialLesson: Lesson;
  allLessons: Lesson[];
}

export const LessonDetailClient: React.FC<LessonDetailClientProps> = ({
  initialLesson,
  allLessons,
}) => {
  const [lesson, setLesson] = useState<Lesson>(initialLesson);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Load custom lessons and completion status from localStorage
  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem("ksite_completed_lessons");
      if (savedCompleted) {
        setCompletedLessonIds(JSON.parse(savedCompleted));
      }

      const savedCustom = localStorage.getItem("ksite_custom_lessons");
      if (savedCustom) {
        const parsedCustom: Lesson[] = JSON.parse(savedCustom);
        const match = parsedCustom.find((l) => l.slug === initialLesson.slug);
        if (match) {
          setLesson(match);
        }
      }
    } catch (e) {
      console.error("Error loading localStorage data", e);
    }
  }, [initialLesson.slug]);

  const isCompleted = completedLessonIds.includes(lesson.id);

  const handleToggleComplete = () => {
    let updated: string[];
    if (isCompleted) {
      updated = completedLessonIds.filter((item) => item !== lesson.id);
    } else {
      updated = [...completedLessonIds, lesson.id];
    }
    setCompletedLessonIds(updated);
    localStorage.setItem("ksite_completed_lessons", JSON.stringify(updated));
  };

  const categoryInfo = CATEGORIES.find((c) => c.id === lesson.category) || CATEGORIES[0];

  // Find prev/next lessons in the same category
  const categoryLessons = allLessons
    .filter((l) => l.category === lesson.category)
    .sort((a, b) => a.order - b.order);

  const currentIndex = categoryLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? categoryLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < categoryLessons.length - 1 ? categoryLessons[currentIndex + 1] : null;

  const handleCopyCode = () => {
    if (lesson.codeExample) {
      navigator.clipboard.writeText(lesson.codeExample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="main-wrapper">
      {/* Background Orbs */}
      <div className="bg-decorations">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Header */}
      <Navbar
        activeCategory={lesson.category}
        onSelectCategory={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
        onOpenAddModal={() => {}}
      />

      <div className="container lesson-container">
        {/* Navigation Breadcrumbs & Back link */}
        <div className="top-nav-bar">
          <Link href="/" className="back-link btn btn-secondary">
            ← Назад до всіх уроків
          </Link>

          <div className="badge-group">
            <div
              className="category-badge"
              style={{ backgroundColor: categoryInfo.badgeBg, color: categoryInfo.color }}
            >
              <span>{categoryInfo.icon}</span>
              <span>{categoryInfo.name}</span>
            </div>
            <span className="topic-tag">Модуль: {lesson.topicGroup}</span>
          </div>
        </div>

        {/* Lesson Main Content Card */}
        <article className="glass-panel lesson-card-full">
          <h1 className="lesson-main-title">{lesson.title}</h1>

          <div className="lesson-meta-bar">
            <span>Порядок: <strong>#{lesson.order}</strong></span>
            <span>Рівень: <strong>{lesson.level}</strong></span>
            <span>Час читання: <strong>{lesson.duration}</strong></span>
            <button
              className={`complete-btn ${isCompleted ? "checked" : ""}`}
              onClick={handleToggleComplete}
            >
              {isCompleted ? "✓ Пройдено" : "○ Позначити пройденим"}
            </button>
          </div>

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

          {/* Interactive Quiz */}
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
                <div
                  className={`quiz-explanation ${
                    selectedOption === lesson.quiz.answerIndex ? "success" : "warning"
                  }`}
                >
                  <p>
                    <strong>
                      {selectedOption === lesson.quiz.answerIndex
                        ? "🎉 Правильно!"
                        : "❌ Незовсім вірно."}
                    </strong>{" "}
                    {lesson.quiz.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Sequential Lesson Navigation */}
          <div className="page-nav-footer">
            {prevLesson ? (
              <Link href={`/lessons/${prevLesson.slug}`} className="btn btn-secondary nav-btn">
                ← {prevLesson.title}
              </Link>
            ) : <div />}

            {nextLesson && (
              <Link href={`/lessons/${nextLesson.slug}`} className="btn btn-primary nav-btn">
                {nextLesson.title} →
              </Link>
            )}
          </div>

          {/* Live Comments */}
          <CommentsSection lessonId={lesson.id} />
        </article>
      </div>

      <style jsx>{`
        .main-wrapper {
          min-height: 100vh;
          padding-bottom: 4rem;
        }

        .lesson-container {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 900px;
        }

        .top-nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .back-link {
          font-size: 0.9rem;
        }

        .badge-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
        }

        .topic-tag {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-sm);
        }

        .lesson-card-full {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: var(--bg-secondary);
        }

        .lesson-main-title {
          font-size: 2.1rem;
          font-weight: 800;
          line-height: 1.3;
          color: var(--text-primary);
        }

        .lesson-meta-bar {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.88rem;
          color: var(--text-muted);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1rem;
          flex-wrap: wrap;
        }

        .complete-btn {
          margin-left: auto;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .complete-btn.checked {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          color: #10b981;
        }

        .markdown-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .content-h3 {
          font-size: 1.35rem;
          color: var(--text-primary);
          margin-top: 1rem;
        }

        .content-list {
          padding-left: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
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
          padding: 0.75rem 1.2rem;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .copy-btn {
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-secondary);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.8rem;
        }

        .code-pre {
          padding: 1.25rem;
          overflow-x: auto;
          font-family: var(--font-code);
          font-size: 0.92rem;
          color: #e2e8f0;
          line-height: 1.6;
        }

        .quiz-container {
          background: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quiz-title {
          font-size: 1.15rem;
          color: var(--accent-primary);
        }

        .quiz-question {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .quiz-option-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.2rem;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.95rem;
          text-align: left;
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
          padding: 0.85rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
        }

        .quiz-explanation.success {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .quiz-explanation.warning {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
        }

        .page-nav-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 1rem;
          flex-wrap: wrap;
        }

        .nav-btn {
          font-size: 0.9rem;
          max-width: 320px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </main>
  );
};
