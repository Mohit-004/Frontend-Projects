let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
function addTask() {
    let text = document.getElementById("taskInput").value;
    let date = document.getElementById("dueDate").value;
    let priority = document.getElementById("priority").value;

    if (text === "") return alert("Enter task!");

    let task = {
        id: Date.now(),
        text,
        date,
        priority,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks
function renderTasks() {
    let list = document.getElementById("taskList");
    let search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    let filtered = tasks.filter(t => t.text.toLowerCase().includes(search));

    filtered.forEach(task => {
        let li = document.createElement("li");
        li.className = `list-group-item d-flex justify-content-between align-items-center ${task.priority.toLowerCase()}`;

        li.innerHTML = `
            <div onclick="toggleTask(${task.id})" style="cursor:pointer;">
                <span class="${task.completed ? 'completed' : ''}">
                    ${task.text} (${task.date})
                </span>
            </div>
            <div>
                <button class="btn btn-sm btn-warning" onclick="editTask(${task.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateProgress();
}

// Toggle Complete
function toggleTask(id) {
    tasks = tasks.map(t => {
        if (t.id === id) t.completed = !t.completed;
        return t;
    });
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

// Edit Task
function editTask(id) {
    let newText = prompt("Edit task:");
    tasks = tasks.map(t => {
        if (t.id === id) t.text = newText;
        return t;
    });
    saveTasks();
    renderTasks();
}

// Progress Bar
function updateProgress() {
    let completed = tasks.filter(t => t.completed).length;
    let total = tasks.length;

    let percent = total === 0 ? 0 : (completed / total) * 100;

    let bar = document.getElementById("progressBar");
    bar.style.width = percent + "%";
    bar.innerText = Math.round(percent) + "%";
}

// Initial Load
renderTasks();