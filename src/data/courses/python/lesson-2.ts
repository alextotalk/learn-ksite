import { Lesson } from "../types";

export const pythonLesson2: Lesson = {
  id: "python-lesson-2",
  order: 2,
  category: "python",
  topicGroup: "Типи даних",
  slug: "typy-danykh-v-python",
  title: "Python №2: Змінювані та Незмінювані типи (Mutable vs Immutable)",
  level: "Початковий",
  duration: "16 хв",
  summary: "Незмінювані типи (int, float, str, tuple) проти змінюваних типів (list, dict, set). Особливості роботи з пам'яттю.",
  content: `У Python всі типи даних є об'єктами. Фундаментальний поділ типів у Python — це поділ на **Mutable** (змінювані) та **Immutable** (незмінювані).

### 1. Незмінювані типи (Immutable):
Після створення об'єкта його значення в пам'яті не можна змінити:
* \`int\`, \`float\`, \`bool\`
* \`str\` (рядки)
* \`tuple\` (кортежі)

### 2. Змінювані типи (Mutable):
Об'єкти можна модифікувати без зміни їхньої адреси у пам'яті:
* \`list\` (списки)
* \`dict\` (словники)
* \`set\` (множини)

### Чому це важливо:
Незмінювані типи (наприклад, \`tuple\` або \`str\`) можна використовувати як ключі у словниках (\`dict\`), а змінювані (\`list\`) — ні.`,
  codeExample: {
    language: "python",
    code: `# Приклад Immutable (Кортеж) vs Mutable (Список)

# Tuple - незмінюваний
coordinates: tuple[float, float] = (50.4501, 30.5234)

# List - змінюваний список
skills: list[str] = ["Python", "FastAPI"]
skills.append("PostgreSQL") # Модифікуємо список

# Dict - словник (ключ-значення)
developer_profile: dict[str, any] = {
    "name": "Олексій",
    "skills": skills,
    "location": coordinates
}

print(f"Профіль: {developer_profile}")`
  },
  quiz: {
    question: "Який з наведених типів даних у Python є НЕЗМІНЮВАНИМ (Immutable)?",
    options: ["list", "dict", "tuple", "set"],
    answerIndex: 2,
    explanation: "tuple (кортеж) є незмінюваною послідовністю. Після створення елементи кортежу не можна додавати, видаляти або змінювати."
  }
};
