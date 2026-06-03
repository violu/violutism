# Развертывание на Cloudflare Pages + Last.fm API

## Структура проекта

```
game-menu-site/
├── index.html
├── styles.css
├── script.js
├── config.js
├── functions/
│   └── lastfm.js          ← API proxy (Cloudflare Function)
├── public/
│   └── _routes.json       ← маршрутизация
├── assets/
│   └── (видео, звуки)
└── .gitignore
```

## Что здесь происходит

- **`functions/lastfm.js`** — это Cloudflare Function (как serverless function)
- **`public/_routes.json`** — говорит Cloudflare как маршрутизировать запросы
- Все остальное — статические файлы

---

## Шаг 1: Git → GitHub

```bash
cd c:\Users\vio\Desktop\game-menu-site
git init
git config user.name "Your Name"
git config user.email "your@email.com"
git add .
git commit -m "Initial: game menu site with secure lastfm api"
```

Создай репо на https://github.com/new (Public)

```bash
git remote add origin https://github.com/YOUR_USERNAME/game-menu-site.git
git branch -M main
git push -u origin main
```

---

## Шаг 2: Cloudflare Pages

1. https://dash.cloudflare.com/ → **Workers & Pages**
2. **Pages** → **Connect to Git**
3. Авторизируй GitHub, выбери `game-menu-site`
4. **Deployment settings:**
   - **Production branch:** main
   - **Build command:** (оставь пусто)
   - **Build output directory:** . (точка)
5. **Save and Deploy**

Cloudflare начнет деплой на `game-menu-site.pages.dev`

---

## Шаг 3: Environment переменные

1. Cloudflare Dashboard → твой проект → **Settings** → **Environment variables**
2. Нажми **Add variable** → **Production**
   - **Variable name:** `LASTFM_API_KEY`
   - **Value:** `60cf45d46c063e605a38d9260c86eed0`
3. **Save** ✓

Cloudflare автоматически редеплоит (~1-2 мин)

---

## Шаг 4: Собственный домен

1. Проект → **Custom domain**
2. **Set up domain** → `violu.eu.cc`
3. Cloudflare даст CNAME инструкции

Обычно это:
```
violu.eu.cc CNAME game-menu-site.pages.dev
```

Добавь это в DNSинст панели eu.cc

---

## Проверить что работает

1. https://violu.eu.cc (или `game-menu-site.pages.dev` временно)
2. Last.fm блок показывает твои треки
3. F12 → Network → `/api/lastfm` запрос есть
4. API ключ **не видно** в исходном коде/браузере

---

## Если что-то не работает

**Build ошибка в Cloudflare?**
- Deployments → последний → логи
- Обычно помогает: Settings → Redeploy

**Last.fm блок пуст?**
- F12 → Console → ищи красные ошибки
- Проверь Environment переменные добавлены
- Retry deployment в Cloudflare

**Домен не работает?**
- Жди 5-10 минут (DNS распространяется)
- Проверь CNAME запись в eu.cc панели

---

## Автоматические обновления

После коммита в GitHub, Cloudflare **автоматически** редеплоит:

```bash
git add .
git commit -m "Update"
git push
```

Через 1-2 минуты изменения на сайте ✓

