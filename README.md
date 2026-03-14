# Mini Trello Task Manager

A small Kanban-style task manager built with Vanilla JavaScript.
The app allows users to create, manage, and organize tasks across multiple columns using a drag-and-drop interface.

## Features

* Add tasks
* Edit tasks
* Delete tasks
* Drag & drop tasks between columns
* Search tasks
* Task counters per column
* Empty state when no tasks are present
* LocalStorage persistence (tasks remain after page refresh)
* Responsive layout

## Tech Stack

* HTML
* CSS
* Vanilla JavaScript (ES Modules)

## Project Structure

```
mini-trello-app
│
├── index.html
├── styles.css
└── src
    ├── app.js        # Main application logic
    ├── dom.js        # DOM rendering and UI elements
    ├── tasks.js      # Task creation and modification logic
    ├── storage.js    # LocalStorage management
    └── drag.js       # Drag and drop functionality
```

## How to Run the Project

1. Clone the repository

```
git clone https://github.com/VasilPunchev/mini-trello-app.git
```

2. Open the project folder

```
cd mini-trello-app
```

3. Open `index.html` in your browser.

## Functionality Overview

The application is structured using modular JavaScript:

* **app.js** handles the main application logic and state.
* **dom.js** creates and manages task UI elements.
* **tasks.js** manages task creation, editing, and deletion.
* **storage.js** handles saving and loading tasks from LocalStorage.
* **drag.js** implements drag-and-drop behavior between columns.

## Future Improvements

Possible enhancements for the project:

* Task priority levels
* Due dates for tasks
* Dark mode
* Modal window for editing tasks instead of prompt()
* Live deployment with GitHub Pages
