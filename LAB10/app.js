document.addEventListener('DOMContentLoaded', () => {
    const dateNumber = document.getElementById("dateNumber");
    const dateText = document.getElementById("dateText");
    const dateMonth = document.getElementById("dateMonth");
    const dateYear = document.getElementById("dateYear");
    const ul = document.getElementById("list-container");
    const completado = document.getElementById("completado");
    const pendiente = document.getElementById("pendiente");

    const setDate = () => {
        const date = new Date();
        dateNumber.textContent = date.toLocaleString("en", { day: "numeric" });
        dateText.textContent = date.toLocaleString("en", { weekday: "long" });
        dateMonth.textContent = date.toLocaleString("en", { month: "short" });
        dateYear.textContent = date.toLocaleString("en", { year: "numeric" });
    };
    setDate();

    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        ul.innerHTML = ''; 
        todos.forEach((todo, index) => {
            if (todo.task.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = todo.task;
                li.className = todo.completed ? 'unchecked checked' : 'unchecked';
                li.dataset.index = index;
                li.setAttribute("estado", todo.completed.toString());
                ul.appendChild(li);
            }
        });
        updateCounts();
    };

    const saveTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const updateCounts = () => {
        const liElementsUnchecked = document.getElementsByClassName("unchecked");
        let completedCount = 0;
        let uncompletedCount = 0;
        for (let i = 0; i < liElementsUnchecked.length; i++) {
            if (liElementsUnchecked[i].getAttribute("estado") == "false") {
               uncompletedCount++; 
            }else{
                completedCount++;
            }
        }
        completado.textContent = completedCount;
        pendiente.textContent = uncompletedCount;
    };

    ul.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const li = e.target;
            li.classList.toggle("checked");
            const estadoActual = li.getAttribute("estado");
            li.setAttribute("estado", estadoActual === "false" ? "true" : "false");
            saveTodos(Array.from(ul.children).map((li, index) => ({ task: li.textContent, completed: li.classList.contains('checked')})));
            updateCounts();
        }
    });

    const initializeTodos = () => {
        loadTodos();
    };

    initializeTodos();
});

function redirectToAddTODO() {
    window.location.href = "add.html";
  }
