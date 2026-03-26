document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-name');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Fetch and display tasks
    const loadTasks = async () => {
        try {
            const response = await fetch('/tasks');
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    // Render tasks to the UI
    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-name">${task.name}</span>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    };

    // Add task
    addTaskBtn.addEventListener('click', async () => {
        const name = taskInput.value.trim();
        if (!name) return;

        try {
            const response = await fetch('/addTask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            if (response.ok) {
                taskInput.value = '';
                loadTasks();
            } else {
                const errorData = await response.json();
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    });

    // Delete task
    window.deleteTask = async (id) => {
        try {
            const response = await fetch(`/task/${id}`, { method: 'DELETE' });
            if (response.ok) {
                loadTasks();
            } else {
                alert('Task delete failed');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    loadTasks();
});
