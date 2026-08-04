import { Lesson } from "../types";

export const jsLesson2: Lesson = {
  id: "js-lesson-2",
  order: 2,
  category: "js",
  topicGroup: "Типи даних",
  slug: "typy-danykh-v-js-ts",
  title: "JS / TS №2: Типи даних (Primitive vs Reference) та TypeScript Types",
  level: "Початковий",
  duration: "20 хв",
  summary: "Примітивні типи (number, string, boolean, null, undefined, symbol, bigint) та посилальні типи (Object, Array, Function). Оголошення interface та type.",
  content: `У JavaScript існує 8 основних типів даних, які поділяються на примітивні (передаються за значенням) та посилальні (передаються за посиланням в пам'яті).

### 1. Примітивні типи (Primitives):
* \`number\` — числа (цілі та з рухомою крапкою)
* \`string\` — текстові рядки
* \`boolean\` — \`true\` або \`false\`
* \`undefined\` — значення за замовчуванням для неініціалізованих змінних
* \`null\` — явна відсутність значення
* \`bigint\` — для дуже великих цілих чисел
* \`symbol\` — унікальні ідентифікатори

### 2. Посилальні типи (Reference Types):
Об'єкти, масиви та функції зберігаються в пам'яті (Heap), а змінна тримає лише посилання на них.

### 3. Типізація у TypeScript:
TypeScript дозволяє явно описувати форми об'єктів за допомогою \`interface\` або \`type\`.`,
  codeExample: {
    language: "typescript",
    code: `// Примітивні типи
const count: number = 42;
const title: string = "TypeScript Data Types";
const isActive: boolean = true;

// Custom Types & Interfaces
type UserRole = "admin" | "user" | "guest"; // Union Type

interface UserProfile {
  readonly id: number;
  name: string;
  role: UserRole;
  tags?: string[]; // Опціональне поле
}

const user: UserProfile = {
  id: 101,
  name: "Анна",
  role: "admin",
};`
  },
  quiz: {
    question: "Яка головна відмінність між примітивними та посилальними типами даних у JS?",
    options: [
      "Примітиви передаються за значенням, а посилальні (об'єкти) — за посиланням у пам'яті",
      "Примітиви не можуть містити числа",
      "Посилальні типи автоматично видаляються з коду",
      "Відмінностей немає"
    ],
    answerIndex: 0,
    explanation: "При присвоєнні об'єкта іншій змінній копіюється лише посилання на адресу в пам'яті, а не сам об'єкт."
  }
};
