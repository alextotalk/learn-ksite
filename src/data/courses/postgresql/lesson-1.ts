import { Lesson } from "../types";

export const postgresqlLesson1: Lesson = {
  id: "postgresql-lesson-1",
  order: 1,
  category: "postgresql",
  topicGroup: "Вступ",
  slug: "vstup-do-postgresql",
  title: "PostgreSQL №1: Вступ до PostgreSQL та основні SQL-запити",
  level: "Початковий",
  duration: "18 хв",
  summary: "Реляційні бази даних, проектування схем, первинні ключі та оператори SELECT/INSERT.",
  content: `**PostgreSQL** — це найпотужніша відкрита реляційна база даних з підтримкою складних запитів, індексів, транзакцій (ACID) та JSONB.

### Основні поняття:
* **Таблиці (Tables)**: Зберігають дані у вигляді рядків та стовпчиків.
* **Primary Key (Первинний ключ)**: Унікальний ідентифікатор кожного запису.
* **Foreign Key (Зовнішній ключ)**: Зв'язок між таблицями.`,
  codeExample: {
    language: "sql",
    code: `CREATE TABLE IF NOT EXISTS developers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    primary_language VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO developers (name, primary_language) 
VALUES ('Олексій', 'TypeScript'), ('Марія', 'Python');

SELECT id, name, primary_language 
FROM developers 
WHERE primary_language = 'TypeScript';`
  },
  quiz: {
    question: "Який SQL оператор використовується для вибірки даних з таблиці?",
    options: ["FETCH", "SELECT", "GET", "EXTRACT"],
    answerIndex: 1,
    explanation: "Оператор SELECT використовується в SQL для запиту та читання даних з однієї або кількох таблиць."
  }
};
