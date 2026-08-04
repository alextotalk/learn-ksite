import { Lesson } from "../types";

export const postgresqlLesson2: Lesson = {
  id: "postgresql-lesson-2",
  order: 2,
  category: "postgresql",
  topicGroup: "Типи даних",
  slug: "typy-danykh-v-postgresql",
  title: "PostgreSQL №2: Типи даних у PostgreSQL (Integer, Text, JSONB, Array)",
  level: "Початковий",
  duration: "20 хв",
  summary: "Числові типи, символьні типи, дати/час, масиви та JSONB для роботи з неструктурованими даними.",
  content: `PostgreSQL вирізняється надзвичайно багатим набором вбудованих типів даних, включаючи вбудовану підтримку JSON/JSONB та масивів.

### 1. Числові та Символьні типи:
* \`INT\` / \`BIGINT\` — цілі числа.
* \`NUMERIC(10, 2)\` — точні числа для фінансових розрахунків.
* \`VARCHAR(n)\` / \`TEXT\` — текстові поля будь-якої довжини.

### 2. Типи дати та часу:
* \`TIMESTAMP WITH TIME ZONE\` (TIMESTAMPTZ) — зберігає час із врахуванням часового поясу.

### 3. JSONB та Масиви (Arrays):
* \`JSONB\` — бінарне зберігання JSON з можливістю створення індексів GIN для миттєвого пошуку.
* \`TEXT[]\` — масиви рядків у стовпчику.`,
  codeExample: {
    language: "sql",
    code: `-- Таблиця з розширеними типами даних у PostgreSQL
CREATE TABLE user_settings (
    user_id INT PRIMARY KEY,
    preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
    tags TEXT[] NOT NULL DEFAULT '{}',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Вставка JSONB та масиву
INSERT INTO user_settings (user_id, preferences, tags)
VALUES (
    1, 
    '{"theme": "dark", "notifications": true}'::jsonb, 
    ARRAY['developer', 'backend']
);

-- Запит до JSONB поля
SELECT user_id, preferences->>'theme' AS theme
FROM user_settings
WHERE preferences @> '{"notifications": true}';`
  },
  quiz: {
    question: "У чому головна перевага типу JSONB перед звичайним типом JSON у PostgreSQL?",
    options: [
      "JSONB підтримує індексацію GIN і обробляється швидше при запитах",
      "JSONB не займає місця на диску",
      "JSONB підтримує лише числа",
      "Ніяких переваг немає"
    ],
    answerIndex: 0,
    explanation: "JSONB зберігає дані у розпарсеному бінарному форматі та дозволяє будувати індекси GIN для швидкого пошуку по ключах та значеннях."
  }
};
