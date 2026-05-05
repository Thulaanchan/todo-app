let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

/* Add Task */
function addTask() {
  let task = {
    id: Date.now(),
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    text: document.getElementById("taskInput").value,
    location: document.getElementById("location").value,
    category: document.getElementById("category").value,
    completed: false
  };

  if (!task.text || !task.date || !task.time) {
    alert("Please fill required fields!");
    return;
  }

  tasks.push(task);
  renderTasks();

  // Clear inputs after add
  document.getElementById("taskInput").value = "";
  document.getElementById("location").value = "";
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
}

/* When Checkbox is Clicked */
function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  renderTasks();
}

/* Delete task */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

/* Filter */
function setFilter(type, e) {
  filter = type;
  document.querySelectorAll(".filters button")
    .forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  renderTasks();
}

/* Render */
function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks.filter(t => {
    if (filter === "all") return true;
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
  });

  if (filtered.length === 0) {
    list.innerHTML = "<p style='text-align:center;'>No tasks found</p>";
  }

  filtered.forEach(t => {
    let div = document.createElement("div");
    div.className = "task " + (t.completed ? "completed" : "");

    div.innerHTML = `
      <div class="task-top">
        <input type="checkbox" ${t.completed ? "checked" : ""}
        onclick="toggleTask(${t.id})">
        <button class="delete-btn" onclick="deleteTask(${t.id})">❌</button>
      </div>
      <p>📝 ${t.text}</p>
      <p>📍 ${t.location}</p>
      <p>⏰ ${t.time}</p>
      <p>📅 ${t.date}</p>
      <p>❓ ${t.category}</p>
    `;

    list.appendChild(div);
  });

  updateProgress();

  // Save to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Progress */
function updateProgress() {
  let total = tasks.length;
  let done = tasks.filter(t => t.completed).length;
  document.getElementById("progress").innerText =
    `Progress: ${done} / ${total}`;
}

/* Dark Mode */
document.getElementById("modeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  document.getElementById("modeToggle").textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
};

/* Initial render */
renderTasks();