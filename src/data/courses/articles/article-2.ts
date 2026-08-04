import { Lesson } from "../types";

export const article2: Lesson = {
  id: "article-2",
  order: 2,
  category: "article",
  topicGroup: "Практика",
  slug: "yak-vybraty-pershu-movu-prohramuvannya",
  title: "Стаття №2: Порівняння мов програмування: JS vs PHP vs Go vs Python",
  level: "Початковий",
  duration: "12 хв",
  summary: "Аналіз сфер застосування, порогу входження та вакансій для кожної з популярних мов.",
  content: `Вибір першої або другої мови програмування залежить від ваших цілей:

* **JavaScript / TypeScript**: Найкращий вибір для Frontend та Fullstack (Node.js/React/Next.js).
* **PHP 8**: Ідеально для сучасної веб-розробки (Laravel/Symfony), легкий старт та величезний ринок проєктів.
* **Go (Golang)**: Чудово підходить для високозавантажених серверів, мікросервісів, хмарних систем (Docker, K8s).
* **Python**: Лідер у сфері Data Science, штучного інтелекту (AI/ML), автоматизації та швидких API (FastAPI).
* **PostgreSQL**: Базовий навичка для кожного Backend розробника незалежно від мови.`,
  quiz: {
    question: "Яка мова вважається стандартом для розробки інтерфейсів (Frontend) у веб-браузерах?",
    options: ["Python", "JavaScript", "Go", "PHP"],
    answerIndex: 1,
    explanation: "JavaScript (і його надбудова TypeScript) є єдиною мовою, яку підтримують усі сучасні браузери нативним чином."
  }
};
