"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { LessonCard } from "@/components/LessonCard";
import { LessonModal } from "@/components/LessonModal";
import { AddLessonModal } from "@/components/AddLessonModal";
import { INITIAL_LESSONS, Lesson, CATEGORIES, TOPIC_GROUPS } from "@/data/courses";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTopicGroup, setActiveTopicGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load user data from localStorage on client side
  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem("ksite_completed_lessons");
      if (savedCompleted) {
        setCompletedLessonIds(JSON.parse(savedCompleted));
      }

      const savedCustom = localStorage.getItem("ksite_custom_lessons");
      if (savedCustom) {
        const parsedCustom: Lesson[] = JSON.parse(savedCustom);
        setLessons([...INITIAL_LESSONS, ...parsedCustom]);
      }
    } catch (e) {
      console.error("Error loading localStorage data", e);
    }
  }, []);

  const handleToggleComplete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    let updated: string[];
    if (completedLessonIds.includes(id)) {
      updated = completedLessonIds.filter((item) => item !== id);
    } else {
      updated = [...completedLessonIds, id];
    }

    setCompletedLessonIds(updated);
    localStorage.setItem("ksite_completed_lessons", JSON.stringify(updated));
  };

  const handleAddLesson = (newLesson: Lesson) => {
    const updatedLessons = [newLesson, ...lessons];
    setLessons(updatedLessons);

    const customOnly = updatedLessons.filter(
      (l) => !INITIAL_LESSONS.some((init) => init.id === l.id)
    );
    localStorage.setItem("ksite_custom_lessons", JSON.stringify(customOnly));
  };

  // Filter and sort lessons
  const filteredLessons = lessons
    .filter((lesson) => {
      const matchesCategory =
        activeCategory === "all" || lesson.category === activeCategory;
      const matchesTopicGroup =
        activeTopicGroup === "all" || lesson.topicGroup === activeTopicGroup;
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.content.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesTopicGroup && matchesSearch;
    })
    .sort((a, b) => a.order - b.order);

  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100) || 0;

  return (
    <main className="main-wrapper">
      {/* Background Glow Orbs */}
      <div className="bg-decorations">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Top Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      <div className="container main-content">
        {/* Hero Section */}
        <section className="hero-section glass-panel">
          <div className="hero-badge">
            <span>🚀 Інтерактивна База Знань</span>
          </div>
          <h1 className="hero-title">
            Структуровані <span className="gradient-text">Курси та Уроки</span> з Програмування
          </h1>
          <p className="hero-subtitle">
            Покроковий шлях від вступних концепцій до типів даних, ООП та роботи з Postgres для JS/TS, PHP, Go та Python.
          </p>

          {/* Progress Tracker */}
          <div className="progress-card">
            <div className="progress-header">
              <span>Ваш прогрес навчання: <strong>{completedCount} з {lessons.length} уроків</strong></span>
              <span className="percent-text">{progressPercent}%</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </section>

        {/* Topic Module Filter Bar */}
        <div className="topic-filter-bar">
          <span className="filter-label">🎯 Модуль матеріалу:</span>
          <button
            className={`topic-btn ${activeTopicGroup === "all" ? "active" : ""}`}
            onClick={() => setActiveTopicGroup("all")}
          >
            Всі модулі
          </button>
          {TOPIC_GROUPS.map((tg) => (
            <button
              key={tg}
              className={`topic-btn ${activeTopicGroup === tg ? "active" : ""}`}
              onClick={() => setActiveTopicGroup(tg)}
            >
              {tg}
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div className="section-bar">
          <h2 className="section-title">
            {activeCategory === "all" ? (
              <>🔥 Всі матеріали ({filteredLessons.length})</>
            ) : (
              <>
                {CATEGORIES.find((c) => c.id === activeCategory)?.icon}{" "}
                {CATEGORIES.find((c) => c.id === activeCategory)?.name} ({filteredLessons.length})
              </>
            )}
          </h2>

          {searchQuery && (
            <span className="search-result-tag">
              Результати для: &quot;{searchQuery}&quot;
            </span>
          )}
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length > 0 ? (
          <div className="lessons-grid">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isCompleted={completedLessonIds.includes(lesson.id)}
                onSelect={setSelectedLesson}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state glass-panel">
            <div className="empty-icon">🔍</div>
            <h3>Уроків у даному розділі не знайдено</h3>
            <p>Спробуйте обрати інший модуль або додайте власний новий урок!</p>
            <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
              + Додати новий урок
            </button>
          </div>
        )}
      </div>

      {/* Lesson View Modal */}
      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          allLessons={lessons}
          isCompleted={completedLessonIds.includes(selectedLesson.id)}
          onClose={() => setSelectedLesson(null)}
          onToggleComplete={(id) => handleToggleComplete(id)}
          onSelectLesson={setSelectedLesson}
        />
      )}

      {/* Add Lesson Modal */}
      {isAddModalOpen && (
        <AddLessonModal
          onClose={() => setIsAddModalOpen(false)}
          onAddLesson={handleAddLesson}
        />
      )}

      <style jsx>{`
        .main-wrapper {
          min-height: 100vh;
          padding-bottom: 4rem;
        }

        .main-content {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .hero-section {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.2rem;
          background: linear-gradient(135deg, rgba(22, 30, 46, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #818cf8;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .hero-title {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          max-width: 800px;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 700px;
          line-height: 1.6;
        }

        .progress-card {
          width: 100%;
          max-width: 500px;
          margin-top: 0.5rem;
          padding: 1rem;
          background: rgba(10, 13, 20, 0.5);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .percent-text {
          font-weight: 700;
          color: var(--accent-emerald);
        }

        .progress-bar-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-emerald) 100%);
          border-radius: var(--radius-full);
          transition: width 0.4s ease;
        }

        .topic-filter-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
          background: rgba(18, 24, 36, 0.6);
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .filter-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          margin-right: 0.5rem;
        }

        .topic-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .topic-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }

        .topic-btn.active {
          background: var(--accent-secondary);
          color: #ffffff;
          border-color: var(--accent-secondary);
        }

        .section-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .section-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .search-result-tag {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .lessons-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }

        .empty-state {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .empty-icon {
          font-size: 3rem;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 1.8rem;
          }
          .lessons-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
