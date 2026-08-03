import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { Lesson } from "@/data/courses";

// Firebase configuration from environment variables or fallback
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Initialize Firebase safely
const app =
  getApps().length > 0
    ? getApp()
    : firebaseConfig.apiKey
    ? initializeApp(firebaseConfig)
    : null;

const db = app ? getFirestore(app) : null;

export interface CommentItem {
  id: string;
  lessonId: string;
  author: string;
  content: string;
  createdAt: string;
}

/**
 * Fetch comments for a specific lesson
 */
export async function fetchComments(lessonId: string): Promise<CommentItem[]> {
  if (db) {
    try {
      const q = query(
        collection(db, "comments"),
        where("lessonId", "==", lessonId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const comments: CommentItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        comments.push({
          id: doc.id,
          lessonId: data.lessonId,
          author: data.author || "Анонім",
          content: data.content || "",
          createdAt: data.createdAt
            ? new Date(data.createdAt.seconds * 1000).toLocaleString("uk-UA")
            : new Date().toLocaleString("uk-UA"),
        });
      });
      return comments;
    } catch (e) {
      console.warn("Firestore error fetching comments, using fallback:", e);
    }
  }

  // Fallback to localStorage comments
  try {
    const saved = localStorage.getItem(`comments_${lessonId}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

/**
 * Add a new comment for a lesson
 */
export async function postComment(
  lessonId: string,
  author: string,
  content: string
): Promise<CommentItem> {
  const newComment: CommentItem = {
    id: `comment-${Date.now()}`,
    lessonId,
    author: author.trim() || "Студент",
    content: content.trim(),
    createdAt: new Date().toLocaleString("uk-UA"),
  };

  if (db) {
    try {
      await addDoc(collection(db, "comments"), {
        lessonId,
        author: newComment.author,
        content: newComment.content,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Firestore error adding comment, saved locally:", e);
    }
  }

  // Always sync to local storage fallback
  try {
    const saved = localStorage.getItem(`comments_${lessonId}`);
    const existing: CommentItem[] = saved ? JSON.parse(saved) : [];
    const updated = [newComment, ...existing];
    localStorage.setItem(`comments_${lessonId}`, JSON.stringify(updated));
  } catch (e) {
    console.error("LocalStorage error:", e);
  }

  return newComment;
}

/**
 * Fetch cloud lessons added by Admin
 */
export async function fetchCloudLessons(): Promise<Lesson[]> {
  if (db) {
    try {
      const querySnapshot = await getDocs(collection(db, "lessons"));
      const cloudLessons: Lesson[] = [];
      querySnapshot.forEach((doc) => {
        cloudLessons.push(doc.data() as Lesson);
      });
      return cloudLessons;
    } catch (e) {
      console.warn("Firestore error fetching lessons, using fallback:", e);
    }
  }
  return [];
}

/**
 * Save new lesson to cloud (Admin only)
 */
export async function saveCloudLesson(lesson: Lesson): Promise<void> {
  if (db) {
    try {
      await addDoc(collection(db, "lessons"), {
        ...lesson,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Firestore error saving lesson:", e);
    }
  }
}
