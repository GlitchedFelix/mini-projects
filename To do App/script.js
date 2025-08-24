// Elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const logoutBtn = document.getElementById("logoutBtn");

// Check logged-in user
const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser) window.location.href = "login.html";

// Load users
let users = JSON.parse(localStorage.getItem("users")) || {};
if (!users[loggedInUser]) users[loggedInUser] = { password: "", tasks: [] };

// Ensure tasks array exists
if (!users[loggedInUser].tasks) users[loggedInUser].tasks = [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  // Sort tasks: incomplete first, completed last
  const sortedTasks = users[loggedInUser].tasks.slice().sort((a, b) => a.completed - b.completed);

  sortedTasks.forEach((taskObj) => {
    const card = document.createElement("div");
    card.className = "task-card";

    // Task text
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = taskObj.text;
    if (taskObj.completed) taskText.classList.add("completed");

    // Buttons container
    const btnContainer = document.createElement("div");
    btnContainer.className = "task-buttons";

    // Complete/Undo button
    const completeBtn = document.createElement("button");
    completeBtn.className = "completeBtn";
    completeBtn.textContent = taskObj.completed ? "↺" : "✓";
    completeBtn.addEventListener("click", () => {
      taskObj.completed = !taskObj.completed;
      localStorage.setItem("users", JSON.stringify(users));
      renderTasks();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "completeBtn";
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => {
      const taskIndex = users[loggedInUser].tasks.indexOf(taskObj);
      users[loggedInUser].tasks.splice(taskIndex, 1);
      localStorage.setItem("users", JSON.stringify(users));
      renderTasks();
    });

    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(deleteBtn);
    card.appendChild(taskText);
    card.appendChild(btnContainer);
    taskList.appendChild(card);
  });
}

// Add task
function addTask() {
  const task = taskInput.value.trim();
  if (task.length > 0) {
    // No capitalizing first letter or adding period
    users[loggedInUser].tasks.push({ text: task, completed: false });
    localStorage.setItem("users", JSON.stringify(users));
    renderTasks();
    taskInput.value = "";
  }
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => { if (e.key === "Enter") addTask(); });
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

// Initial render
renderTasks();
