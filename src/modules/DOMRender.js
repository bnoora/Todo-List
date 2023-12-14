import { upcomingWeek, today, allProjects, tasksByProject } from "./filteringlist";
import Storage from "./storage";

const storage = new Storage();

const renderProjects = () => {
    const projects = allProjects(storage);
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";
    projects.forEach(project => {
        const projectButton = document.createElement("button");
        projectButton.setAttribute("class", "project-button");
        projectButton.setAttribute("id", project.getProjectId());
        projectButton.textContent = project.getProjectName();
        projectsContainer.appendChild(projectButton);
    });

    const projectButtons = document.querySelectorAll(".project-button");

    projectButtons.forEach(projectButton => {
        projectButton.addEventListener("click", (e) => {
            const tasks = tasksByProject(projectButton.id, storage);
            renderTasks(tasks);
        });
    });

    const newProjectButton = document.createElement("button");
    newProjectButton.setAttribute("class", "new-project-button");
    newProjectButton.textContent = "+ New Project";
    projectsContainer.appendChild(newProjectButton);

    newProjectButton.addEventListener("click", (e) => {
        renderNewProjectPopup();
    });
}

const renderTasks = (tasks) => {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";
    tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "task-div");
        taskDiv.setAttribute("id", task.getTaskId());

        const taskTitle = document.createElement("h3");
        taskTitle.setAttribute("class", "task-title");
        taskTitle.textContent = task.getTaskTitle();
        taskDiv.appendChild(taskTitle);

        const taskDueDate = document.createElement("p");
        taskDueDate.setAttribute("class", "task-due-date");
        taskDueDate.textContent = task.getTaskDueDate();
        taskDiv.appendChild(taskDueDate);

        const taskDelete = document.createElement("button");
        taskDelete.setAttribute("class", "task-delete");
        taskDelete.textContent = "Delete";
        taskDiv.appendChild(taskDelete);

        if (task.getTaskPriority() === "High") {
            taskDiv.setAttribute("class", "task-high");
        }
        if (task.getTaskPriority() === "Medium") {
            taskDiv.setAttribute("class", "task-medium");
        }
        if (task.getTaskPriority() === "Low") {
            taskDiv.setAttribute("class", "task-low");
        }
    });    

    const taskDivs = document.querySelectorAll(".task-div");

    taskDivs.forEach(taskDiv => {
        taskDiv.addEventListener("click", (e) => {
            const task = storage.getProjectTasks(taskDiv.id);
            renderTaskPopup(task);
        });
    });

    const taskDeletes = document.querySelectorAll(".task-delete");

    taskDeletes.forEach(taskDelete => {
        taskDelete.addEventListener("click", (e) => {
            const task = storage.getProjectTasks(taskDelete.parentNode.id);
            storage.deleteTask(task[0].getTaskId());
            renderTasks(tasks);
        });
    });

    const newTaskdiv = document.createElement("div");
    newTaskdiv.setAttribute("class", "new-task-div");
    newTaskdiv.textContent = "+ New Task";
    taskContainer.appendChild(newTaskdiv);

    newTaskdiv.addEventListener("click", (e) => {
        renderNewTaskPopup();
    });
}






