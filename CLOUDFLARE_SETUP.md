# Cloudflare Pages — Быстрый старт

Ты уже подключил репо к Cloudflare, но build ошибка. Это потому что был неправильный конфиг.

## ✅ Уже исправлено:

- ❌ Удалён `wrangler.toml` (вызывал ошибку)
- ✅ Создан `functions/lastfm.js` (правильный формат для Pages)
- ✅ Создан `public/_routes.json` (маршрутизация запросов)
- ✅ Удалена папка `api/`

---

## 🚀 Что делать сейчас

### 1. Загрузи обновления в GitHub

```bash
cd c:\Users\vio\Desktop\game-menu-site

# Проверь что изменилось
git status

# Загрузи
git add .
git commit -m "Fix: cloudflare pages configuration"
git push
```

### 2. В Cloudflare Dashboard

1. **Workers & Pages** → твой проект `game-menu-site`
2. **Deployments**
3. Нажми на последний деплой
4. **Redeploy** (кнопка вверху справа)

Жди 1-2 минуты — должен успешно задеплоиться ✓

### 3. Проверить что работает

Откроешь `https://game-menu-site.pages.dev`
- Страница должна загрузиться
- Last.fm блок покажет твои треки

### 4. Добавить API ключ (если не добавил)

**Settings** → **Environment variables** → **Add** (Production)
- Name: `LASTFM_API_KEY`
- Value: `60cf45d46c063e605a38d9260c86eed0`

Нажми **Save** → автоматический редеплой

### 5. Подключить домен (если нужно)

**Custom domain** → `violu.eu.cc`

Cloudflare даст инструкции по CNAME

---

## ✨ Готово!
