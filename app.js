// Get tasks from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = () => {
  renderTasks();
};

// Add new task
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
}

// Edit a task
function editTask(index) {
  const newTaskText = prompt("Edit Task:", tasks[index].text);
  if (newTaskText) {
    tasks[index].text = newTaskText.trim();
    saveTasks();
    renderTasks();
  }
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Mark task as completed or pending
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Filter tasks
function filterTasks(status) {
  renderTasks(status);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks based on filter
function renderTasks(filter = 'all') {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    if (filter === 'completed' && !task.completed) return;
    if (filter === 'pending' && task.completed) return;

    const taskItem = document.createElement('li');
    taskItem.className = `list-group-item ${task.completed ? 'completed' : 'pending'}`;
    
    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const completeButton = document.createElement('button');
    completeButton.className = task.completed ? 'btn btn-sm btn-outline-secondary' : 'btn btn-sm btn-outline-success';
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.onclick = () => toggleComplete(index);

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-sm btn-warning edit';
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(index);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-danger delete';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(index);

    taskItem.appendChild(taskText);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}
