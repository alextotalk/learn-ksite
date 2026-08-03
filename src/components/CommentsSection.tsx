"use client";

import React, { useState, useEffect } from "react";
import { CommentItem, fetchComments, postComment } from "@/lib/firebase";

interface CommentsSectionProps {
  lessonId: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ lessonId }) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchComments(lessonId).then((res) => {
      if (isMounted) {
        setComments(res);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [lessonId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmitting(true);
    const newComm = await postComment(lessonId, authorName, commentText);
    setComments((prev) => [newComm, ...prev]);

    setCommentText("");
    setSubmitting(false);
  };

  return (
    <div className="comments-section-container">
      <h3 className="comments-title">💬 Обговорення та коментарі ({comments.length})</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="comment-form">
        <div className="form-row">
          <input
            type="text"
            className="form-input"
            placeholder="Ваше ім'я або нікнейм..."
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>

        <textarea
          className="form-textarea"
          rows={3}
          placeholder="Напишіть ваші враження, запитання чи доповнення до цього уроку..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
          {submitting ? "Надсилання..." : "💬 Опублікувати коментар"}
        </button>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {loading ? (
          <div className="loading-state">Завантаження коментарів...</div>
        ) : comments.length > 0 ? (
          comments.map((comm) => (
            <div key={comm.id} className="comment-card">
              <div className="comment-header">
                <div className="author-info">
                  <div className="avatar">{comm.author[0].toUpperCase()}</div>
                  <span className="author-name">{comm.author}</span>
                </div>
                <span className="comment-time">{comm.createdAt}</span>
              </div>
              <p className="comment-body">{comm.content}</p>
            </div>
          ))
        ) : (
          <div className="empty-comments">
            <span>💡 Поки що немає коментарів. Будьте першим, хто залишить думку!</span>
          </div>
        )}
      </div>

      <style jsx>{`
        .comments-section-container {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .comments-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .comment-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: rgba(10, 13, 20, 0.5);
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .form-row {
          max-width: 300px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.65rem 0.9rem;
          background: rgba(18, 24, 36, 0.8);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.88rem;
          outline: none;
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: var(--accent-primary);
        }

        .submit-btn {
          align-self: flex-start;
          padding: 0.55rem 1.2rem;
          font-size: 0.85rem;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .loading-state,
        .empty-comments {
          font-size: 0.85rem;
          color: var(--text-muted);
          padding: 1rem 0;
        }

        .comment-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-md);
          padding: 0.85rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .comment-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: #fff;
        }

        .author-name {
          font-weight: 700;
          font-size: 0.88rem;
          color: var(--text-primary);
        }

        .comment-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .comment-body {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};
