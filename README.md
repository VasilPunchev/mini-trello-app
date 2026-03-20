# 🧩 Mini Trello App

A modern and interactive task management app inspired by Trello.

## 🚀 Features

- ✅ Add tasks
- ✏️ Inline edit (no prompt, real UI editing)
- 🗑️ Delete tasks with confirmation
- 🔍 Live search / filter tasks
- 📊 Task counters per column
- 📦 Local storage persistence
- 🧲 Drag & drop between columns
- 🔀 Drag & reorder tasks within columns
- 🎯 Clean modular architecture (ES Modules)
- 🎨 Custom favicon

---

## 🖥️ Live Demo

👉 https://vasilpunchev.github.io/mini-trello-app/

*(Activate GitHub Pages to enable this link)*

---

## 🛠️ Tech Stack

- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript (ES6 Modules)
- LocalStorage API

---

## 📂 Project Structure


src/
├── app.js # Main logic & orchestration
├── dom.js # DOM creation & UI handling
├── drag.js # Drag & drop + reorder logic
├── storage.js # LocalStorage handling
├── tasks.js # Task CRUD logic


---

## 🧠 How It Works

Each task contains:

- `id` – unique identifier
- `text` – task content
- `status` – (todo / in-progress / done)
- `order` – controls position in column

### Flow:
1. User creates or edits a task
2. State updates
3. Data is saved in `localStorage`
4. UI re-renders automatically

---

## 🎯 Key Highlights

- Replaced `prompt()` with **inline editing UI**
- Implemented **drag & reorder system**
- Added **real-time search filtering**
- Clean separation of logic into modules

---

## 📸 Screenshot

*(Recommended: add screenshot here later)*

---

## 📌 Future Improvements

- 🌓 Dark mode
- 📅 Due dates
- 🏷️ Labels / priorities
- 🌐 Backend (API + database)

---

## 👨‍💻 Author

- GitHub: https://github.com/VasilPunchev
