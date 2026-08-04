import { Lesson } from "../types";

export const jsLesson1: Lesson = {
  id: "js-lesson-1",
  order: 1,
  category: "js",
  topicGroup: "Вступ",
  slug: "vstup-do-javascript-ts",
  title: "JS / TS №1: Вступ до сучасного JavaScript & TypeScript",
  level: "Початковий",
  duration: "15 хв",
  summary: "Основи сучасного синтаксису ES6+, змінні (const/let), стрілкові функції та переваги TypeScript.",
  content: `JavaScript є основною мовою веб-розробки. З появою стандарта ES6 та TypeScript розробка стала набагато безпечнішою та структурованою.

### Основні концепції:
1. **Змінні**: Забудьте про \`var\`. Використовуйте \`const\` за замовчуванням та \`let\`, якщо значення змінюється.
2. **Стрілкові функції**: Лаконічний синтаксис та лексичне зв'язування \`this\`.
3. **Строга типізація TypeScript**: Запобігає помилкам під час написання коду замість виконання у продакшні.`,
  codeExample: {
    language: "typescript",
    code: `interface Developer {
  id: number;
  name: string;
  skills: string[];
}

const createDeveloper = (name: string, skills: string[]): Developer => ({
  id: Date.now(),
  name,
  skills,
});

const dev = createDeveloper("Олексій", ["React", "TypeScript", "Node.js"]);
console.log(\`Розробник \${dev.name} володіє: \${dev.skills.join(", ")}\`);`
  },
  quiz: {
    question: "Яке ключове слово слід використовувати за замовчуванням для оголошення змінних у сучасному JS?",
    options: ["var", "const", "let", "global"],
    answerIndex: 1,
    explanation: "Ключове слово const забезпечує неможливість повторного присвоєння значення змінній, що зменшує кількість багів."
  }
};
