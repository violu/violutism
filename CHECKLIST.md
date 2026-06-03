# ✅ Чек-лист перед деплоем

## Файловая структура

- [ ] `index.html`, `styles.css`, `script.js` — основные файлы
- [ ] `config.js` — **БЕЗ** `apiKey` в lastfm
- [ ] `functions/lastfm.js` — API proxy (Cloudflare Function)
- [ ] `public/_routes.json` — маршрутизация
- [ ] `.gitignore` — защищает секреты
- [ ] **НЕ ДОЛЖНО БЫТЬ:** `wrangler.toml`, папка `api/`

---

## GitHub

- [ ] Репозиторий на GitHub (PUBLIC)
- [ ] Git инициализирован: `git init`
- [ ] Remote добавлен: `git remote add origin https://...`
- [ ] Всё закоммичено: `git commit -m "..."`
- [ ] Запушено на main: `git push -u origin main`

---

## Cloudflare Pages

- [ ] Проект создан через **Connect to Git**
- [ ] Репозиторий выбран и авторизирован
- [ ] Build command: (пусто)
- [ ] Build output: `.` (точка)
- [ ] Первый деплой успешен (Deployments → зелёная галочка)

---

## Environment переменные

- [ ] **LASTFM_API_KEY** = `60cf45d46c063e605a38d9260c86eed0`
- [ ] Environment: **Production**
- [ ] Saved ✓

---

## Тестирование

- [ ] Откроешь `https://game-menu-site.pages.dev`
- [ ] Сайт загружается
- [ ] Last.fm блок показывает треки
- [ ] F12 → Network → `/api/lastfm` запрос есть
- [ ] F12 → Console → нет красных ошибок
- [ ] API ключ **НЕ видно** нигде в браузере

---

## Домен (опционально)

- [ ] Домен подключен в **Custom domain** или CNAME добавлен
- [ ] `https://violu.eu.cc` работает (если подключал)

---

Если всё зелёно — готово! 🎉
