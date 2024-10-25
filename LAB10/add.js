document.addEventListener('DOMContentLoaded', () => {
  const dateNumber = document.getElementById("dateNumber");
  const dateText = document.getElementById("dateText");
  const dateMonth = document.getElementById("dateMonth");
  const dateYear = document.getElementById("dateYear");
  const inputBox = document.getElementById("input-box");
  const addButton = document.getElementById("add-button");
  const message = document.getElementById("message");

  const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString("en", { day: "numeric" });
    dateText.textContent = date.toLocaleString("en", { weekday: "long" });
    dateMonth.textContent = date.toLocaleString("en", { month: "short" });
    dateYear.textContent = date.toLocaleString("en", { year: "numeric" });
  };
  setDate();
  
  const addTask = () => {
    const task = inputBox.value.trim();
    if (task) {
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.push({ task, completed: false });
      localStorage.setItem('todos', JSON.stringify(todos));
      message.textContent = "Task saved successfully";
      message.style.display = "block";
      inputBox.value = '';
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    } else {
      message.textContent = "Please, enter a task.";
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
      }, 3000);
    }
  };

  addButton.addEventListener('click', addTask);
  
  inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });
});

function redirectToToDoList() {
  window.location.href = "index.html";
}