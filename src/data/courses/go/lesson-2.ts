import { Lesson } from "../types";

export const goLesson2: Lesson = {
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
};
