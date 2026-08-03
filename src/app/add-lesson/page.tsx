"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { AdminAuthModal } from "@/components/AdminAuthModal";
import { Lesson, CATEGORIES, TOPIC_GROUPS, TopicGroup, CategoryId } from "@/data/courses";
import { saveCloudLesson } from "@/lib/firebase";

export default function AddLessonPage() {
  const router = useRouter();
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("ksite_admin_authenticated") === "true";
    }
    return false;
  });

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

    // Save to localStorage & Cloud
    saveCloudLesson(newLesson);
    try {
      const savedCustom = localStorage.getItem("ksite_custom_lessons");
      const existing: Lesson[] = savedCustom ? JSON.parse(savedCustom) : [];
      localStorage.setItem("ksite_custom_lessons", JSON.stringify([newLesson, ...existing]));
    } catch (err) {
      console.error(err);
    }

    alert("🎉 Новий урок успішно опубліковано!");
    router.push("/");
  };

  if (!isAdminAuth) {
    return (
      <AdminAuthModal
        onClose={() => router.push("/")}
        onSuccess={() => setIsAdminAuth(true)}
      />
    );
  }

  return (
    <main className="main-wrapper">
      {/* Background Glow */}
      <div className="bg-decorations">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Navbar
        activeCategory="all"
        onSelectCategory={() => {}}
        searchQuery=""
        onSearchChange={() => {}}
        onOpenAddModal={() => {}}
      />

      <div className="container form-container">
        <div className="top-nav-bar">
          <Link href="/" className="back-link btn btn-secondary">
            ← Назад до списку уроків
          </Link>
        </div>

        <div className="glass-panel form-card">
          <h1 className="page-title">➕ Додати новий урок або статтю</h1>
          <p className="page-subtitle">Форма для публікації нових матеріалів у навчальну базу знань.</p>

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
                <label>Мова / Розділ *</label>
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
                <label>Тематичний модуль *</label>
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
                placeholder="Короткий анонс матеріалу..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Повний зміст (Markdown) *</label>
              <textarea
                className="form-textarea"
                rows={6}
                placeholder="Основний зміст уроку (підтримує заголовки ### та списки)..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Мова коду</label>
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

            <div className="form-footer">
              <Link href="/" className="btn btn-secondary">
                Скасувати
              </Link>
              <button type="submit" className="btn btn-primary">
                💾 Опублікувати новий урок
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .main-wrapper {
          min-height: 100vh;
          padding-bottom: 4rem;
        }

        .form-container {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 800px;
        }

        .form-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: var(--bg-secondary);
        }

        .page-title {
          font-size: 1.8rem;
          font-weight: 800;
        }

        .page-subtitle {
          font-size: 0.95rem;
          color: var(--text-secondary);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1rem;
        }

        .form-body {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 1rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(10, 13, 20, 0.8);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.92rem;
          outline: none;
        }

        .code-font {
          font-family: var(--font-code);
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </main>
  );
}
