// input filed for todo
const taskInput = document.querySelector(".task-input input");
// body for show task list
const taskBody = document.querySelector(".task-box");
// filters
const filters = document.querySelectorAll(".filters span");
// clear button
const clearAll = document.querySelector(".clear");

const errorMsg = document.getElementById("error-msg");

// todo array & variables declaring
let todos = JSON.parse(localStorage.getItem("todo-list"));
let isTaskUpdate = false,
  taskUpdateId,
  trackStatus = "all";
// calling the todos for render when screen loading
showTodos(trackStatus);

function isExceed(wordCount) {
  const isExceeded = wordCount > 20;
  return isExceeded;
}

taskInput.addEventListener("input", () => {
  const text = taskInput.value;
  if (isExceed(text.length)) {
    // taskInput.classList.add("error");
    errorMsg.textContent = "More than 20 words";
  } else {
    errorMsg.textContent = "";
  }
});

// event for iput value storing in todo
taskInput.addEventListener("keyup", (e) => {
  let task = taskInput.value.trim();
  if (e.key == "Enter" && task && !isExceed(task.length)) {
    if (!todos) {
      todos = [];
    }
    taskInput.value = "";
    let taskInfo = {
      task: task,
      status: "pending",
    };
    if (!isTaskUpdate) {
      todos.push(taskInfo);
    } else {
      isTaskUpdate = false;
      todos[taskUpdateId] = taskInfo;
    }

    localStorage.setItem("todo-list", JSON.stringify(todos));

    if (trackStatus == "completed") {
      document.querySelector("span.active").classList.remove("active");
      document.querySelector("#all").classList.add("active");
      trackStatus = "all";
    } else {
      document.querySelector("span.active").classList.remove("active");
      document.querySelector(`#${trackStatus}`).classList.add("active");
    }

    showTodos(trackStatus);
  }
});

function showTodos(filterId) {
  let taskCard = "";
  document.querySelectorAll(".task").forEach((task) => {
    task.remove();
  });
  if (todos) {
    todos.forEach((todo, index) => {
      let isComplted = todo.status == "completed" ? "checked" : "";
      if (filterId == todo.status || filterId == "all") {
        taskCard += `<li class="task">
                        <div class="task-left">
                            <label for="${index}">
                                <input onclick="updateStat(this)" type="checkbox" id="${index}" ${isComplted}/>
                                <p class=${isComplted}>${todo.task}</p>
                            </label>
                        </div>
                        <div class="settings-todo">
                                <i onclick="editTask(${index},'${todo.task}','${todo.status}','${filterId}')" class="fas fa-pen"></i>
                                <i onclick="deleteTask(${index},'${filterId}')" class="fas fa-trash-alt"></i>
                        </div>
                    </li>`;
      }
    });
  }
  taskBody.innerHTML =
    taskCard || "<span class='empty'>You have no task here</span>";
}

// function to update status in todo
function updateStat(selectedTask) {
  let taskElement = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskElement.classList.add("checked");
    todos[selectedTask.id].status = "completed";
    // showTodos("pending");
  } else {
    taskElement.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
    // showTodos("completed");
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

// function to show settings menu
function showTodoMenu(selectedTask) {
  selectedTask.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      selectedTask.parentElement.classList.remove("show");
    }
  });
}

// function to delete task
function deleteTask(id, btnId) {
  todos.splice(id, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodos(btnId);
}

// function to edit task
function editTask(id, taskname, status, btnId) {
  isTaskUpdate = true;
  taskUpdateId = id;
  taskInput.value = taskname;
  taskInput.focus();
  switch (btnId) {
    case "all":
      if (status !== "pending" || status !== "completed") {
        trackStatus = "all";
      }
      break;
    case "pending":
      trackStatus = status;
      break;
    case "completed":
      trackStatus = status;
      break;
  }
}

// event for choosing filter option
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodos(btn.id);
  });
});

// clear all button functionality
clearAll.addEventListener("click", () => {
  errorMsg.textContent = "";
  todos.splice(0, todos.length);
  taskInput.value = "";
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodos("all");
});
