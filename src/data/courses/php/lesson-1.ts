import { Lesson } from "../types";

export const phpLesson1: Lesson = {
  id: "php-lesson-1",
  order: 1,
  category: "php",
  topicGroup: "Вступ",
  slug: "vstup-do-php-8",
  title: "PHP №1: Вступ до сучасного PHP 8+",
  level: "Початковий",
  duration: "15 хв",
  summary: "Сучасний PHP 8 — це швидка мова із суворою типізацією, JIT-компілятором та потужним ООП.",
  content: `Забудьте стереотипи про старий PHP. Сучасний **PHP 8.2+** — це одна з найпопулярніших та найефективніших мов для веб-бекенду.

### Чому PHP 8 потужний:
* **Строга типізація** параметрів та повертаємих значень.
* **Promoted Properties** у конструкторах для зменшення boilerplate-коду.
* **Match Expression** замість застарілого switch.
* **Attributes** для конфігурації моделей та маршрутів.`,
  codeExample: {
    language: "php",
    code: `<?php

declare(strict_types=1);

readonly class User {
    public function __construct(
        public int $id,
        public string $email,
        public string $role = 'developer'
    ) {}
}

$user = new User(id: 1, email: "alex@example.com");
echo "Створено користувача: {$user->email} з роллю: {$user->role}";`
  },
  quiz: {
    question: "Що дає оголошення declare(strict_types=1) у файлі PHP?",
    options: [
      "Автоматично оптимізує SQL-запити",
      "Вмикає сувору перевірку типів аргументів та повертаємих значень",
      "Приховує помилки виключень",
      "Забороняє використання ООП"
    ],
    answerIndex: 1,
    explanation: "strict_types=1 змушує PHP викидати TypeError при невідповідності типів аргументів."
  }
};
