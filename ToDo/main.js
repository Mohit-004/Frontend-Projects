/* =========================
   STATE MANAGEMENT
========================= */
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* =========================
   DOM CACHE
========================= */
const DOM = {
    taskInput: document.getElementById("taskInput"),
    dueDate: document.getElementById("dueDate"),
    priority: document.getElementById("priority"),
    taskList: document.getElementById("taskList"),
    search: document.getElementById("search"),
    progressBar: document.getElementById("progressBar"),
    themeBtn: document.getElementById("themeBtn")
};

/* =========================
   UTIL FUNCTIONS
========================= */
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const updateState = (newTasks) => {
    tasks = newTasks;
    saveTasks();
    renderTasks();
};

/* =========================
   ADD TASK
========================= */
function addTask() {
    const text = DOM.taskInput.value.trim();
    const date = DOM.dueDate.value;
    const priority = DOM.priority.value;

    if (!text) {
        alert("Enter task!");
        return;
    }

    const task = {
        id: Date.now(),
        text,
        date,
        priority,
        completed: false
    };

    updateState([...tasks, task]);

    DOM.taskInput.value = "";
}

/* =========================
   RENDER TASKS
========================= */
function renderTasks() {
    const searchText = DOM.search.value.toLowerCase();

    const filteredTasks = tasks.filter(t =>
        t.text.toLowerCase().includes(searchText)
    );

    DOM.taskList.innerHTML = filteredTasks.map(task => `
        <li class="list-group-item d-flex justify-content-between align-items-center ${task.priority.toLowerCase()}">
            <div data-id="${task.id}" class="task-text" style="cursor:pointer;">
                <span class="${task.completed ? 'completed' : ''}">
                    ${task.text} (${task.date || "No date"})
                </span>
            </div>
            <div>
                <button class="btn btn-sm btn-warning edit-btn" data-id="${task.id}">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${task.id}">Delete</button>
            </div>
        </li>
    `).join("");

    updateProgress();
}

/* =========================
   EVENT DELEGATION
========================= */
DOM.taskList.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);

    if (e.target.classList.contains("delete-btn")) {
        deleteTask(id);
    }

    if (e.target.classList.contains("edit-btn")) {
        editTask(id);
    }

    if (e.target.closest(".task-text")) {
        toggleTask(id);
    }
});

/* =========================
   TASK OPERATIONS
========================= */
function toggleTask(id) {
    updateState(
        tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        )
    );
}

function deleteTask(id) {
    if (!confirm("Delete this task?")) return;

    updateState(tasks.filter(t => t.id !== id));
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt("Edit task:", task.text);
    if (!newText || !newText.trim()) return;

    updateState(
        tasks.map(t =>
            t.id === id ? { ...t, text: newText.trim() } : t
        )
    );
}

/* =========================
   PROGRESS BAR
========================= */
function updateProgress() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    const percent = total ? (completed / total) * 100 : 0;

    DOM.progressBar.style.width = percent + "%";
    DOM.progressBar.innerText = `${Math.round(percent)}%`;
}

/* =========================
   DARK MODE
========================= */
function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", isDark);

    DOM.themeBtn.innerText = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
}

function loadTheme() {
    const isDark = localStorage.getItem("darkMode") === "true";

    document.body.classList.toggle("dark-mode", isDark);

    DOM.themeBtn.innerText = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
}

/* =========================
   INIT
========================= */
function init() {
    loadTheme();
    renderTasks();

    DOM.search.addEventListener("input", renderTasks);
}

init();