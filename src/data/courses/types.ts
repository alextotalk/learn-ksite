export type CategoryId = "js" | "php" | "go" | "python" | "postgresql" | "article";

export type TopicGroup = "Вступ" | "Типи даних" | "Функції & ООП" | "Бази даних" | "Практика";

export interface Lesson {
  id: string;
  slug: string;
  order: number;
  category: CategoryId;
  topicGroup: TopicGroup;
  title: string;
  level: "Початковий" | "Середній" | "Просунутий";
  duration: string;
  summary: string;
  content: string;
  codeExample?: {
    language: string;
    code: string;
  };
  quiz?: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  badgeBg: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "js",
    name: "JavaScript & TS",
    icon: "🟨",
    color: "#f7df1e",
    badgeBg: "rgba(247, 223, 30, 0.15)",
    description: "Сучасний JS/TS, асинхронність, Node.js та React"
  },
  {
    id: "php",
    name: "PHP",
    icon: "🐘",
    color: "#777bb4",
    badgeBg: "rgba(119, 123, 180, 0.15)",
    description: "PHP 8+, ООП, Laravel та розробка веб-бекенду"
  },
  {
    id: "go",
    name: "Go (Golang)",
    icon: "🐹",
    color: "#00add8",
    badgeBg: "rgba(0, 173, 216, 0.15)",
    description: "Компільована мова від Google для високонавантажених систем"
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    color: "#3776ab",
    badgeBg: "rgba(55, 118, 171, 0.15)",
    description: "Універсальна мова для скриптів, FastAPI, AI та Data Science"
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: "🐬",
    color: "#336791",
    badgeBg: "rgba(51, 103, 145, 0.15)",
    description: "Потужна реляційна база даних: SQL, індекси, оптимізація"
  },
  {
    id: "article",
    name: "Статті та Гайди",
    icon: "📚",
    color: "#a855f7",
    badgeBg: "rgba(168, 85, 247, 0.15)",
    description: "Корисні поради, методології навчання та архітектурні підходи"
  }
];

export const TOPIC_GROUPS: TopicGroup[] = [
  "Вступ",
  "Типи даних",
  "Функції & ООП",
  "Бази даних",
  "Практика"
];
