# 🌐 Сайт знань (Knowledge Site - Next.js)

Підпроєкт для вебсайту / бази знань на фреймворку Next.js (App Router, TypeScript).

## 🚀 Команди розробки (Yarn)

```bash
yarn dev       # Запуск локального сервера розробки (http://localhost:3000)
yarn build     # Статична збірка (генерація папки out/)
yarn start     # Просмотр продакшн збірки
```

## 🌐 Деплой на GitHub Pages
Цей проєкт налаштований для автоматичного деплою через **GitHub Actions** у репозиторій [alextotalk/learn-ksite](https://github.com/alextotalk/learn-ksite).

При push у гілку `main`, GitHub Actions автоматично збирає статичний сайт (`output: 'export'`) та публікує його на GitHub Pages:
👉 `https://alextotalk.github.io/learn-ksite/`
