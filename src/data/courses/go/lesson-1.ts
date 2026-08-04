import { Lesson } from "../types";

export const goLesson1: Lesson = {
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
};
