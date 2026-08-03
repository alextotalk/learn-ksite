"use client";

import React from "react";
import { CATEGORIES } from "@/data/courses";

interface NavbarProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenAddModal,
}) => {
  return (
    <header className="sticky-header">
      <div className="container nav-content">
        {/* Brand Logo */}
        <div className="brand" onClick={() => onSelectCategory("all")}>
          <div className="logo-icon">✨</div>
          <div className="brand-text">
            <span className="brand-title">LearnHub</span>
            <span className="brand-subtitle">База знань & Уроки</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Шукати урок, мову або тему..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => onSearchChange("")}>
              ✕
            </button>
          )}
        </div>

        {/* Action Button */}
        <div className="nav-actions">
          <button className="btn btn-primary" onClick={onOpenAddModal}>
            <span className="btn-icon">+</span>
            <span>Додати урок / статтю</span>
          </button>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="category-bar">
        <div className="container category-pills">
          <button
            className={`pill-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => onSelectCategory("all")}
          >
            🔥 Всі теми
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`pill-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 13, 20, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          padding-bottom: 1rem;
          gap: 1.5rem;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .search-wrapper {
          position: relative;
          flex: 1;
          max-width: 450px;
        }

        .search-icon {
          position: absolute;
          left: 0.9rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.9rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .clear-btn {
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 0.85rem;
        }

        .category-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          background: rgba(18, 24, 36, 0.4);
          overflow-x: auto;
        }

        .category-pills {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-top: 0.6rem;
          padding-bottom: 0.6rem;
          white-space: nowrap;
        }

        .pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pill-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .pill-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
          border-color: var(--accent-primary);
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
        }

        @media (max-width: 768px) {
          .nav-content {
            flex-wrap: wrap;
          }
          .search-wrapper {
            order: 3;
            max-width: 100%;
          }
        }
      `}</style>
    </header>
  );
};
