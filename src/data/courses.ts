export interface Lesson {
  id: string;
  slug: string;
  title: string;
  category: "js" | "php" | "go" | "python" | "postgresql" | "article";
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
  id: "js" | "php" | "go" | "python" | "postgresql" | "article";
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

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: "js-lesson-1",
    slug: "vstup-do-javascript-ts",
    category: "js",
    title: "Урок 1: Вступ до сучасного JavaScript & TypeScript",
    level: "Початковий",
    duration: "15 хв",
    summary: "Основи сучасного синтаксису ES6+, змінні (const/let), стрілкові функції та чому TypeScript став стандартом індустрії.",
    content: `JavaScript є основною мовою веб-розробки. З появою стандарта ES6 (2015) та TypeScript розробка стала набагато безпечнішою та структурованою.

### Основні концепції:
1. **Змінні**: Забудьте про \`var\`. Використовуйте \`const\` за замовчуванням та \`let\`, якщо значення змінюється.
2. **Стрілкові функції**: Лаконічний синтаксис та лексичне зв'язування \`this\`.
3. **Строга типізація TypeScript**: Запобігає помилкам під час написання коду замість виконання у продакшні.`,
    codeExample: {
      language: "typescript",
      code: `// Приклад сучасного TypeScript
interface Developer {
  id: number;
  name: string;
  skills: string[];
}

const createDeveloper = (name: string, skills: string[]): Developer => {
  return {
    id: Date.now(),
    name,
    skills,
  };
};

const dev = createDeveloper("Олексій", ["React", "TypeScript", "Node.js"]);
console.log(\`Розробник \${dev.name} володіє: \${dev.skills.join(", ")}\`);`
    },
    quiz: {
      question: "Яке ключове слово слід використовувати за замовчуванням для оголошення змінних у сучасному JS?",
      options: ["var", "const", "let", "global"],
      answerIndex: 1,
      explanation: "Ключове слово const забезпечує неможливість повторного присвоєння значення змінній, що зменшує кількість багів."
    }
  },
  {
    id: "php-lesson-1",
    slug: "vstup-do-php-8",
    category: "php",
    title: "Урок 1: Вступ до сучасного PHP 8+",
    level: "Початковий",
    duration: "15 хв",
    summary: "Сучасний PHP 8 — це швидка мова із суворою типізацією, JIT-компілятором та потужним ООП.",
    content: `Забудьте стереотипи про старий PHP 5. Сучасний **PHP 8.2+** — це одна з найпопулярніших та найефективніших мов для веб-бекаенду.

### Чому PHP 8 потужний:
* **Строга типізація** параметрів та повертаємих значень.
* **Promoted Properties** у конструкторах для зменшення boilerplate-коду.
* **Match Expression** замість застарілого switch.
* **Attributes (Анотації)** для конфігурації роутів та моделей.`,
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
  },
  {
    id: "go-lesson-1",
    slug: "vstup-do-golang",
    category: "go",
    title: "Урок 1: Вступ до Go (Golang)",
    level: "Початковий",
    duration: "20 хв",
    summary: "Простота, швидкодія та вбудована конкурентність за допомогою Goroutines.",
    content: `Мова **Go** була розроблена в Google для створення надійних, простих та надшвидких мікросервісів.

### Ключові особливості Go:
1. **Простий синтаксис**: Всього 25 ключових слів (просто засвоїти).
2. **Швидка компіляція**: Компілюється безпосередньо у бінарний файл під цільову ОС.
3. **Goroutines**: Легковагі потоки, які споживають лише кілька кілобайт оперативної пам'яті.`,
    codeExample: {
      language: "go",
      code: `package main

import (
	"fmt"
	"time"
)

func sayHello(name string) {
	fmt.Printf("Привіт, %s з Goroutine!\n", name)
}

func main() {
	// Запуск у паралельному легковагому потоці
	go sayHello("Go Developer")
	
	fmt.Println("Головний потік виконується...")
	time.Sleep(100 * time.Millisecond)
}`
    },
    quiz: {
      question: "Чим Goroutine у Go відрізняється від звичайного потоку ОС?",
      options: [
        "Goroutine потребує окремого графічного процесора",
        "Goroutine значно легша і управляється рантаймом Go, а не ОС",
        "Goroutine не може виконувати асинхронний код",
        "Нічим не відрізняється"
      ],
      answerIndex: 1,
      explanation: "Goroutine споживає лише 2-4 КБ пам'яті і перемикається планувальником Go у користувацькому просторі."
    }
  },
  {
    id: "python-lesson-1",
    slug: "vstup-do-python",
    category: "python",
    title: "Урок 1: Вступ до Python та основи синтаксису",
    level: "Початковий",
    duration: "12 хв",
    summary: "Чистий синтаксис, висока читабельність коду та багата екосистема бібліотек.",
    content: `**Python** — одна з найпопулярніших мов у світі завдяки легкості вивчення та універсальності (веб-розробка, автоматизація, штучний інтелект).

### Основні концепції:
* **Читабельність**: Відступи (indentation) є частиною синтаксису.
* **Динамічна типізація з Type Hints**: Сучасний Python підтримує підказки типів для IDE.
* **Багата стандартна бібліотека**: "Batteries included".`,
    codeExample: {
      language: "python",
      code: `from typing import List

def get_active_users(users: List[dict]) -> List[str]:
    """Фільтрує активних користувачів та повертає їхні імена."""
    return [user["name"] for user in users if user.get("is_active", False)]

users_db = [
    {"name": "Олексій", "is_active": True},
    {"name": "Марія", "is_active": False},
    {"name": "Іван", "is_active": True},
]

print("Активні розробники:", get_active_users(users_db))`
    },
    quiz: {
      question: "Що визначає блоки коду (функцій, циклів) у мові Python?",
      options: ["Фігурні дужки {}", "Ключові слова begin/end", "Відступи (indentation)", "Крапка з комою ;"],
      answerIndex: 2,
      explanation: "У Python синтаксична структура блоків визначається саме відступами (зазвичай 4 пробіли)."
    }
  },
  {
    id: "postgresql-lesson-1",
    slug: "vstup-do-postgresql",
    category: "postgresql",
    title: "Урок 1: Вступ до PostgreSQL та основні SQL-запити",
    level: "Початковий",
    duration: "18 хв",
    summary: "Реляційні бази даних, проектування схем, первинні ключі та оператори SELECT/INSERT.",
    content: `**PostgreSQL** — це найпотужніша відкрита реляційна база даних з підтримкою складних запитів, індексів, транзакцій (ACID) та JSONB.

### Основні поняття:
* **Таблиці (Tables)**: Зберігають дані у вигляді рядків та стовпчиків.
* **Primary Key (Первинний ключ)**: Унікальний ідентифікатор кожного запису.
* **Foreign Key (Зовнішній ключ)**: Зв'язок між таблицями (One-to-Many, Many-to-Many).`,
    codeExample: {
      language: "sql",
      code: `-- Створення таблиці студентів
CREATE TABLE IF NOT EXISTS developers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    primary_language VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка даних
INSERT INTO developers (name, primary_language) 
VALUES ('Олексій', 'TypeScript'), ('Марія', 'Python');

-- Вибірка даних з фільтрацією
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
  },
  {
    id: "article-1",
    slug: "yak-efektyvno-vychaty-prohramuvannya",
    category: "article",
    title: "Стаття: Як ефективно вивчати програмування та не вигоряти",
    level: "Початковий",
    duration: "10 хв",
    summary: "Практичні поради від досвідчених розробників: від теорії до кодингу, пет-проєкти та режим відпочинку.",
    content: `Вивчення програмування — це марафон, а не спринт. Головна помилка початківців — намагання вивчити все й одразу без практики.

### 🔥 5 правил ефективного навчання:

1. **Правило 80/20**: 20% часу на читання/перегляд уроків, 80% — на безпосереднє написання коду руками.
2. **Пишіть пет-проєкти**: Теорія засвоюється лише тоді, коли ви вирішуєте реальну задачу (наприклад, цей сайт знань!).
3. **Не бійтеся помилок**: Помилка в терміналі — це не фіаско, а підказка комп'ютера, що саме потрібно виправити.
4. **Вчіться читати документацію**: Офіційна документація завжди актуальніша за застарілі відеоуроки.
5. **Дисципліна > Інтенсивність**: Краще кодити по 45 хвилин щодня, ніж 10 годин поспіль у неділю.`,
    quiz: {
      question: "Яке співвідношення теорії та практики є найбільш ефективним при вивченні програмування?",
      options: ["90% теорії, 10% практики", "20% теорії, 80% практики", "50% теорії, 50% практики", "Тільки теорія"],
      answerIndex: 1,
      explanation: "Практичне застосування знань дає найглибше розуміння та формує м'язову пам'ять розробника."
    }
  }
];
