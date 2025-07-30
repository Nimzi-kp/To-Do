# 🗂️ Task Flow - Drag & Drop To-Do App

A simple and intuitive **To-Do List** web application with **drag-and-drop functionality**, built using **HTML**, **Vanilla JavaScript**, and **Tailwind CSS**. Tasks move through stages: New ➡️ Working ➡️ Completed ➕ Deleted section for removed tasks.

## 📸 Demo

[Task Flow Screenshot](https://drive.google.com/file/d/1JYtl1qu2YU05yifLpJ4fLn_yrl15Md4k/view?usp=drive_link)

## ✨ Features

- 📝 Add, edit, and delete tasks.
- 📦 Tasks can be dragged between stages.
- ♻️ Task data is **persisted** using `localStorage`.
- 🧹 Deleted tasks are shown in a separate section.
- 🔁 Dynamic task counters for all stages.

## 📁 Folder Structure

```

project-root/
├── index.html       # Main HTML layout
├── script.js        # Core JavaScript logic
├── LICENSE          # MIT LICENSE
└── README.md        # Project documentation

````

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-flow.git
cd task-flow
````

### 2. Open in Browser

You can simply open the `index.html` file in any modern browser:

```bash
open index.html
```

Or just double-click it from your file explorer.

## 🔧 Tech Stack

* **HTML5** – Semantic structure
* **Tailwind CSS** – For utility-first styling
* **Vanilla JavaScript** – Functional logic & drag-and-drop handling
* **LocalStorage** – Data persistence

## ✅ To-Do Workflow

1. **New Tasks**: Add tasks via the input field.
2. **Working**: Drag tasks here when in progress.
3. **Completed**: Mark tasks as finished by dragging.
4. **Deleted**: Remove tasks with the ❌ button, and they’ll show in this section.

## 📦 LocalStorage Keys

* `new`: Array of tasks in New stage
* `working`: Array of tasks in Working stage
* `completed`: Array of tasks in Completed stage
* `deleted`: Array of `{ text, origin }` objects representing deleted tasks

## 🛠️ Future Improvements

* Add dark mode 🌙
* Support for due dates & reminders 📅
* Reordering with keyboard navigation
* Export/Import task lists

## 🙌 Contributing

Pull requests are welcome! Feel free to fork the repo and submit your improvements.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

### 🔗 Connect

* GitHub: [@Nimzi-kp](https://github.com/Nimzi-kp)

## Thank You ❤️
