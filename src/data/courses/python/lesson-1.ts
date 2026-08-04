import { Lesson } from "../types";

export const pythonLesson1: Lesson = {
  id: "python-lesson-1",
  order: 1,
  category: "python",
  topicGroup: "Вступ",
  slug: "vstup-do-python",
  title: "Python №1: Вступ до Python та основи синтаксису",
  level: "Початковий",
  duration: "20 хв",
  summary: "Філософія Zen of Python, модель виконання Bytecode, відступи (indentation), динамічна строга типізація, PEP 8 та базовий синтаксис.",
  content: `**Python** — це високорівнева мова програмування загального призначення з акцентом на читабельність коду та продуктивність розробника. Створена Гвідо ван Россумом (Guido van Rossum) у 1991 році.

### 🌐 Де застосовується Python?
* **Web-розробка**: Бекенд на FastAPI, Django, Flask.
* **Штучний інтелект & Data Science**: PyTorch, TensorFlow, Pandas, NumPy.
* **Автоматизація & Скрипти**: Написання CLI-інструментів, парсинг даних, DevOps-автоматизація.
* **Наукові обчислення**: Астрофізика, біоінформатика, моделювання.

---

### 🧘‍♂️ Філософія «Zen of Python» (PEP 20)
Python має власну офіційну філософію розробки. Ви можете переглянути її прямо в консолі Python, виконавши \`import this\`.

Ключові тези:
1. **Beautiful is better than ugly** (Красиве краще за потворне).
2. **Explicit is better than implicit** (Явне краще за неявне).
3. **Simple is better than complex** (Просте краще за складне).
4. **Readability counts** (Читабельність має вирішальне значення).
5. **There should be one — and preferably only one — obvious way to do it** (Має бути один і, бажано, тільки один очевидний спосіб це зробити).

---

### ⚙️ Модель виконання: Інтерпретатор та Bytecode
Python є **інтерпретованою** мовою, проте процес виконання проходить два етапи:
1. **Компіляція в байт-код**: Вихідний код (\`.py\`) компілюється в проміжний байт-код (\`.pyc\`), який зберігається у директорії \`__pycache__\`.
2. **Виконання у PVM**: Віртуальна машина Python (Python Virtual Machine — PVM) зчитує байт-код та виконує інструкції на конкретній ОС.

---

### 📐 Основи синтаксису та відступи (Indentation)
На відміну від більшості мов (JavaScript, PHP, Go, C++), які використовують фігурні дужки \`{}\` для блоків коду, Python використовує **відступи (indentation)**.

* **4 пробіли** — стандартний відступ для кожного рівня вкладеності (функцій, циклів, умов).
* **Жодних крапок з комою** — новий рядок означає завершення інструкції.
* **Ніколи не змішуйте табуляцію та пробіли** — це призведе до помилки \`IndentationError\`.

---

### 🏷️ Змінні та Система Типізації

1. **Динамічна типізація**: Тип змінної визначається автоматично під час присвоєння значення.
   \`\`\`python
   x = 42        # int
   x = "Привіт" # str (тип змінився на рядок)
   \`\`\`

2. **Строга (сильна) типізація**: Python **не робить** неявних приведень типів для несумісних операцій.
   \`\`\`python
   result = "Ціна: " + 100 # ❌ TypeError! Рядок і число не додаються неявно
   result = "Ціна: " + str(100) # ✅ Явне перетворення типів
   \`\`\`

3. **Підказки типів (Type Hints / PEP 484)**: У сучасному Python (3.5+) рекомендується вказувати анотації типів:
   \`\`\`python
   user_name: str = "Олексій"
   user_age: int = 28
   
   def greet(name: str) -> str:
       return f"Привіт, {name}!"
   \`\`\`

---

### 📏 Стиль оформлення коду: PEP 8
**PEP 8** — офіційне керівництво зі стилю написання коду на Python:
* **Змінні та функції**: \`snake_case\` (наприклад, \`total_sum\`, \`fetch_user_data\`).
* **Класи**: \`PascalCase\` (наприклад, \`UserProfile\`, \`DatabaseClient\`).
* **Константи**: \`UPPER_SNAKE_CASE\` (наприклад, \`MAX_RETRIES = 3\`, \`API_BASE_URL\`).
* **Максимальна довжина рядка**: До 79-88 символів.

---

### 💬 Введення та виведення даних (\`print\` & \`input\`)
* **Виведення**:
  \`\`\`python
  name = "Python"
  print(f"Ласкаво просимо до {name}!", sep=" ", end="\\n")
  \`\`\`
* **Зчитування**:
  \`\`\`python
  user_input = input("Введіть ваш вік: ") # Повертає завжди тип str!
  age = int(user_input) # Явно конвертуємо в int
  \`\`\``,
  codeExample: {
    language: "python",
    code: `from typing import List, Dict

def calculate_discount(price: float, discount_percent: float = 10.0) -> float:
    """Обчислює підсумкову ціну товару зі знижкою."""
    if price <= 0:
        raise ValueError("Ціна повинна бути більшою за нуль")
    
    discount_amount = price * (discount_percent / 100)
    return round(price - discount_amount, 2)

# Базові змінні з Type Hints (PEP 484)
product_name: str = "Ноутбук Apple MacBook Air"
base_price: float = 1200.00
is_in_stock: bool = True

if is_in_stock:
    final_price = calculate_discount(base_price, discount_percent=15.0)
    print(f"📦 Товар: {product_name}")
    print(f"💵 Початкова ціна: \\\${base_price}")
    print(f"🏷️ Ціна зі знижкою 15%: \\\${final_price}")
else:
    print(f"❌ Товар {product_name} тимчасово відсутній.")`
  },
  quiz: {
    question: "Яка комбінація характеристик найточніше описує систему типізації у Python?",
    options: [
      "Статична та слабка (нестрога)",
      "Динамічна та строга (сильна)",
      "Динамічна та слабка (нестрога)",
      "Статична та строга (сильна)"
    ],
    answerIndex: 1,
    explanation: "Python має динамічну типізацію (тип змінної визначається під час виконання) та строгу/сильну типізацію (мова не здійснює неявного приведення типів при несумісних операціях, таких як додавання рядка до числа)."
  }
};
