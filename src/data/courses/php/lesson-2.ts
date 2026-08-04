import { Lesson } from "../types";

export const phpLesson2: Lesson = {
  id: "php-lesson-2",
  order: 2,
  category: "php",
  topicGroup: "Типи даних",
  slug: "typy-danykh-v-php",
  title: "PHP №2: Типи даних у PHP 8, Scalar, Compound та Special Types",
  level: "Початковий",
  duration: "18 хв",
  summary: "Скалярні типи (int, float, string, bool), складені (array, object, callable), спеціальні (null, resource) та Union/Intersection types.",
  content: `У PHP 8 система типів є надзвичайно гнучкою. Мова підтримує як динамічне приведення типів, так і строго типізований режим.

### Скалярні типи (Scalar Types):
* \`int\` — цілі числа (\`42\`, \`-100\`)
* \`float\` — числа з плаваючою крапкою (\`3.14\`)
* \`string\` — тексті рядки (\`"Hello World"\`)
* \`bool\` — логічний тип (\`true\`, \`false\`)

### Складені типи (Compound Types):
* \`array\` — універсальний асоціативний масив та список.
* \`object\` — екземпляри класів.
* \`callable\` — функції чи методи, які можна викликати.

### Union Types у PHP 8:
PHP 8 підтримує об'єднання типів (наприклад \`int|string\`), що дозволяє явно вказувати декілька допустимих типів.`,
  codeExample: {
    language: "php",
    code: `<?php

declare(strict_types=1);

// Використання Union Types (int|float) та nullable типів (?string)
function calculateDiscount(int|float $price, float $percent): float {
    return $price - ($price * ($percent / 100));
}

$originalPrice = 1500; // int
$discounted = calculateDiscount($originalPrice, 15.5);

// Асоціативний масив (Array)
$product = [
    "title" => "MacBook Pro",
    "price" => $discounted,
    "in_stock" => true,
];

var_dump($product);`
  },
  quiz: {
    question: "Який тип даних у PHP є універсальним і використовується і як звичайний список, і як асоціативний словник?",
    options: ["List", "Dictionary", "array", "Collection"],
    answerIndex: 2,
    explanation: "У PHP тип array поєднує в собі функціонал впорядкованих списків та хеш-таблиць (асоціативних масивів)."
  }
};
