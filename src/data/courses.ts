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

export const INITIAL_LESSONS: Lesson[] = [
  // ===================== JAVASCRIPT / TYPESCRIPT =====================
  {
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
  },
  {
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
  },

  // ===================== PHP =====================
  {
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
  },
  {
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
  },

  // ===================== GO (GOLANG) =====================
  {
    id: "go-lesson-1",
    order: 1,
    category: "go",
    topicGroup: "Вступ",
    slug: "vstup-do-golang",
    title: "Go №1: Вступ до Go (Golang)",
    level: "Початковий",
    duration: "20 хв",
    summary: "Простота, швидкодія та вбудована конкурентність за допомогою Goroutines.",
    content: `Мова **Go** була розроблена в Google для створення надійних, простих та надшвидких мікросервісів.

### Ключові особливості Go:
1. **Простий синтаксис**: Всього 25 ключових слів (просто засвоїти).
2. **Швидка компіляція**: Компілюється безпосередньо у бінарний файл під цільову ОС.
3. **Goroutines**: Легковагі потоки, які споживають лише кілька кілобайт пам'яті.`,
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
    id: "go-lesson-2",
    order: 2,
    category: "go",
    topicGroup: "Типи даних",
    slug: "typy-danykh-v-go",
    title: "Go №2: Типи даних у Go, Zero Values, Slices, Maps та Structs",
    level: "Початковий",
    duration: "22 хв",
    summary: "Статична типізація Go: int, float64, string, bool, масиви, динамічні Slices, хеш-карти Maps та структури Structs.",
    content: `Go — це строго типізована мова зі статичною перевіркою типів. Кожен тип має своє "нульове значення" (Zero Value) за замовчуванням.

### 1. Базові типи та Zero Values:
* \`int\` / \`int64\` (нульове значення: \`0\`)
* \`float64\` (нульове значення: \`0.0\`)
* \`string\` (нульове значення: \`""\`)
* \`bool\` (нульове значення: \`false\`)

### 2. Слайси (Slices):
Динамічна обгортка над масивами, яка може автоматично змінювати розмір при додаванні елементів через \`append()\`.

### 3. Структури (Structs) та Карти (Maps):
Структури описують власні типи даних, а \`map[K]V\` зберігає пари ключ-значення.`,
    codeExample: {
      language: "go",
      code: `package main

import "fmt"

// Оголошення структури
type ServerConfig struct {
	Host string
	Port int
	SSL  bool
}

func main() {
	// Slices (динамічний масив)
	ports := []int{8080, 9090, 3000}
	ports = append(ports, 5000)

	// Map (хеш-карта)
	statusCodes := map[string]int{
		"OK":       200,
		"NotFound": 404,
	}

	// Struct
	config := ServerConfig{
		Host: "localhost",
		Port: statusCodes["OK"],
		SSL:  true,
	}

	fmt.Printf("Конфігурація сервера: %+v\nСлайс портів: %v\n", config, ports)
}`
    },
    quiz: {
      question: "Яке 'нульове значення' (Zero Value) має змінна типу int у мові Go при її оголошенні без ініціалізації?",
      options: ["nil", "null", "0", "undefined"],
      answerIndex: 2,
      explanation: "У Go неініціалізована цілочисельна змінна за замовчуванням завжди дорівнює 0."
    }
  },

  // ===================== PYTHON =====================
  {
    id: "python-lesson-1",
    order: 1,
    category: "python",
    topicGroup: "Вступ",
    slug: "vstup-do-python",
    title: "Python №1: Вступ до Python та основи синтаксису",
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
  },

  // ===================== POSTGRESQL =====================
  {
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
  },
  {
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
  },

  // ===================== ARTICLES =====================
  {
    id: "article-1",
    order: 1,
    category: "article",
    topicGroup: "Вступ",
    slug: "yak-efektyvno-vychaty-prohramuvannya",
    title: "Стаття №1: Як ефективно вивчати програмування та не вигоряти",
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
  },
  {
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
  }
];
