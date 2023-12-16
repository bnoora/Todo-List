import { upcomingWeek, today, allProjects, tasksByProject } from "./filteringlist";
import Storage from "./storage";

const storage = new Storage();
// storage.deleteStorage();
storage.loadStorage();
const container = document.getElementById("container");
var currProjectId = 0;

// Render the project on the side bar
const renderProjects = () => {
    const projects = allProjects(storage);
    console.log(1);
    console.log(projects);
    console.log(3);
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";


    renderTodayAndUpcomingWeekButtons(projectsContainer);

    if (projects.length === 0) {
        console.log(1);
        const noProjects = document.createElement("p");
        noProjects.setAttribute("class", "no-projects");
        noProjects.textContent = "No Projects";
        projectsContainer.appendChild(noProjects);
    }
    else {
        projects.forEach(project => {
            const projectButton = document.createElement("button");
            projectButton.setAttribute("class", "project-button");
            projectButton.setAttribute("id", project.getProjectId());
            projectButton.textContent = project.getProjectName();
            projectsContainer.appendChild(projectButton);
        });

        const projectButtons = document.querySelectorAll(".project-button");

        projectButtons.forEach(projectButton => {
            projectButton.addEventListener("click", () => {
                const tasks = tasksByProject(projectButton.id, storage);
                projectButtons.forEach(btn => btn.classList.remove("project-button-selected"));
                projectButton.classList.add("project-button-selected");
                currProjectId = projectButton.id;
                renderTasks(tasks);
            });
        });
    }

    const newProjectButton = document.createElement("button");
    newProjectButton.setAttribute("class", "new-project-button");
    newProjectButton.textContent = "+ New Project";
    projectsContainer.appendChild(newProjectButton);

    newProjectButton.addEventListener("click", (e) => {
        renderNewProjectPopup();
    });
}

// Render the tasks on the main page from the selected project
const renderTasks = (tasks) => {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = "";
    if (tasks.length === 0) {
        const noTasks = document.createElement("p");
        noTasks.setAttribute("class", "no-tasks");
        noTasks.textContent = "No Tasks";
        taskContainer.appendChild(noTasks);
    }
    else {
        console.log(tasks);
        tasks.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.setAttribute("class", "task-div");
            taskDiv.setAttribute("id", task.getTaskId());
            console.log(task.getTaskId());

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

            taskContainer.appendChild(taskDiv);
        });
    }    

    const taskDivs = document.querySelectorAll(".task-div");

    taskDivs.forEach(taskDiv => {
        taskDiv.addEventListener("click", (e) => {
            const task = storage.tasks[taskDiv.id];
            renderTaskPopup(task);
        });
    });

    const taskDeletes = document.querySelectorAll(".task-delete");

    taskDeletes.forEach(taskDelete => {
        taskDelete.addEventListener("click", (e) => {
            console.log(taskDelete.parentNode.id);
            storage.deleteTask(currProjectId, taskDelete.parentNode.id);
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

// Render the new project popup for creating a new project
const renderNewProjectPopup = () => {
    const newProjectPopup = document.createElement("div");
    newProjectPopup.setAttribute("class", "popup");
    newProjectPopup.setAttribute("id", "new-project-popup");

    const newProjectPopupContent = document.createElement("div");
    newProjectPopupContent.setAttribute("class", "popup-content");
    newProjectPopupContent.setAttribute("id", "new-project-popup-content");
    newProjectPopup.appendChild(newProjectPopupContent);

    const newProjectPopupHeader = document.createElement("h2");
    newProjectPopupHeader.setAttribute("class", "popup-header");
    newProjectPopupHeader.textContent = "New Project";
    newProjectPopupContent.appendChild(newProjectPopupHeader);

    const newProjectPopupForm = document.createElement("form");
    newProjectPopupForm.setAttribute("class", "popup-form");
    newProjectPopupForm.setAttribute("id", "new-project-popup-form");
    newProjectPopupContent.appendChild(newProjectPopupForm);

    const newProjectPopupFormLabel = document.createElement("label");
    newProjectPopupFormLabel.setAttribute("class", "popup-form-label");
    newProjectPopupFormLabel.setAttribute("for", "new-project-popup-form-input");
    newProjectPopupFormLabel.textContent = "Project Name";
    newProjectPopupForm.appendChild(newProjectPopupFormLabel);

    const newProjectPopupFormInput = document.createElement("input");
    newProjectPopupFormInput.setAttribute("class", "popup-form-input");
    newProjectPopupFormInput.setAttribute("id", "new-project-popup-form-input");
    newProjectPopupFormInput.setAttribute("type", "text");
    newProjectPopupFormInput.setAttribute("placeholder", "Project Name");
    newProjectPopupForm.appendChild(newProjectPopupFormInput);

    const newProjectPopupFormSubmit = document.createElement("input");
    newProjectPopupFormSubmit.setAttribute("class", "popup-form-submit");
    newProjectPopupFormSubmit.setAttribute("id", "new-project-popup-form-submit");
    newProjectPopupFormSubmit.setAttribute("type", "submit");
    newProjectPopupFormSubmit.setAttribute("value", "Create Project");
    newProjectPopupForm.appendChild(newProjectPopupFormSubmit);

    container.appendChild(newProjectPopup);

    newProjectPopupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newProjectName = document.getElementById("new-project-popup-form-input").value;
        storage.newProject(newProjectName);
        renderProjects();
        newProjectPopup.remove();
    });
}


// Render the new task popup for creating a new task
const renderNewTaskPopup = () => {
    const newTaskPopup = document.createElement("div");
    newTaskPopup.setAttribute("class", "popup");
    newTaskPopup.setAttribute("id", "new-task-popup");

    const newTaskPopupContent = document.createElement("div");
    newTaskPopupContent.setAttribute("class", "popup-content");
    newTaskPopupContent.setAttribute("id", "new-task-popup-content");
    newTaskPopup.appendChild(newTaskPopupContent);
    
    const newTaskPopupHeader = document.createElement("h2");
    newTaskPopupHeader.setAttribute("class", "popup-header");
    newTaskPopupHeader.textContent = "New Task";
    newTaskPopupContent.appendChild(newTaskPopupHeader);

    const newTaskPopupForm = document.createElement("form");
    newTaskPopupForm.setAttribute("class", "popup-form");
    newTaskPopupForm.setAttribute("id", "new-task-popup-form");
    newTaskPopupContent.appendChild(newTaskPopupForm);

    const newTaskPopupFormLabel = document.createElement("label");
    newTaskPopupFormLabel.setAttribute("class", "popup-form-label");
    newTaskPopupFormLabel.setAttribute("for", "new-task-popup-form-input");
    newTaskPopupFormLabel.textContent = "Task Name";
    newTaskPopupForm.appendChild(newTaskPopupFormLabel);

    const newTaskPopupFormInput = document.createElement("input");
    newTaskPopupFormInput.setAttribute("class", "popup-form-input");
    newTaskPopupFormInput.setAttribute("id", "new-task-popup-form-input");
    newTaskPopupFormInput.setAttribute("type", "text");
    newTaskPopupFormInput.setAttribute("placeholder", "Task Title");
    newTaskPopupForm.appendChild(newTaskPopupFormInput);

    const newTaskPopupFormDesc = document.createElement("input");
    newTaskPopupFormDesc.setAttribute("class", "popup-form-input");
    newTaskPopupFormDesc.setAttribute("id", "new-task-popup-form-desc");    
    newTaskPopupFormDesc.setAttribute("type", "text");
    newTaskPopupFormDesc.setAttribute("placeholder", "Task Description");
    newTaskPopupForm.appendChild(newTaskPopupFormDesc);

    const newTaskPopupFormDueDate = document.createElement("input");
    newTaskPopupFormDueDate.setAttribute("class", "popup-form-input");
    newTaskPopupFormDueDate.setAttribute("id", "new-task-popup-form-due-date");
    newTaskPopupFormDueDate.setAttribute("type", "date");
    newTaskPopupFormDueDate.setAttribute("placeholder", "xx/xx/xxxx");
    newTaskPopupForm.appendChild(newTaskPopupFormDueDate);

    const newTaskPopupFormPriority = document.createElement("select");
    newTaskPopupFormPriority.setAttribute("class", "popup-form-input");
    newTaskPopupFormPriority.setAttribute("id", "new-task-popup-form-priority");
    newTaskPopupForm.appendChild(newTaskPopupFormPriority);

    const newTaskPopupFormPriorityOptionHigh = document.createElement("option");
    newTaskPopupFormPriorityOptionHigh.setAttribute("value", "High");
    newTaskPopupFormPriorityOptionHigh.textContent = "High";
    newTaskPopupFormPriority.appendChild(newTaskPopupFormPriorityOptionHigh);

    const newTaskPopupFormPriorityOptionMedium = document.createElement("option");
    newTaskPopupFormPriorityOptionMedium.setAttribute("value", "Medium");
    newTaskPopupFormPriorityOptionMedium.textContent = "Medium";
    newTaskPopupFormPriority.appendChild(newTaskPopupFormPriorityOptionMedium);

    const newTaskPopupFormPriorityOptionLow = document.createElement("option");
    newTaskPopupFormPriorityOptionLow.setAttribute("value", "Low");
    newTaskPopupFormPriorityOptionLow.textContent = "Low";
    newTaskPopupFormPriority.appendChild(newTaskPopupFormPriorityOptionLow);

    const newTaskPopupFormSubmit = document.createElement("input");
    newTaskPopupFormSubmit.setAttribute("class", "popup-form-submit");
    newTaskPopupFormSubmit.setAttribute("id", "new-task-popup-form-submit");
    newTaskPopupFormSubmit.setAttribute("type", "submit");
    newTaskPopupFormSubmit.setAttribute("value", "Create Task");
    newTaskPopupForm.appendChild(newTaskPopupFormSubmit);

    container.appendChild(newTaskPopup);

    newTaskPopupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTaskTitle = document.getElementById("new-task-popup-form-input").value;
        const newTaskDesc = document.getElementById("new-task-popup-form-desc").value;
        const newTaskDueDate = document.getElementById("new-task-popup-form-due-date").value;
        const newTaskPriority = document.getElementById("new-task-popup-form-priority").value;
        storage.newTask(currProjectId, newTaskTitle, newTaskDesc, newTaskDueDate, newTaskPriority);
        renderTasks(tasksByProject(0, storage));
        newTaskPopup.remove();
    });
}

// Render the task popup for viewing a task
const renderTaskPopup = (task) => {
    const taskPopup = document.createElement("div");
    taskPopup.setAttribute("class", "popup");
    taskPopup.setAttribute("id", "task-popup");

    const taskPopupContent = document.createElement("div");
    taskPopupContent.setAttribute("class", "popup-content");
    taskPopupContent.setAttribute("id", "task-popup-content");
    taskPopup.appendChild(taskPopupContent);

    const taskPopupHeader = document.createElement("h2");
    taskPopupHeader.setAttribute("class", "popup-header");
    taskPopupHeader.textContent = "Task";
    taskPopupContent.appendChild(taskPopupHeader);

    const taskTitle = document.createElement("h3");
    taskTitle.setAttribute("class", "task-title");
    taskTitle.textContent = task.getTaskTitle();
    taskPopupContent.appendChild(taskTitle);

    const taskDesc = document.createElement("p");
    taskDesc.setAttribute("class", "task-desc");
    taskDesc.textContent = task.getTaskDescription();
    taskPopupContent.appendChild(taskDesc);

    const taskDueDate = document.createElement("p");
    taskDueDate.setAttribute("class", "task-due-date");
    taskDueDate.textContent = task.getTaskDueDate();
    taskPopupContent.appendChild(taskDueDate);
    
    const taskPriority = document.createElement("p");
    taskPriority.setAttribute("class", "task-priority");
    taskPriority.textContent = task.getTaskPriority();
    taskPopupContent.appendChild(taskPriority);

    const taskCompleted = document.createElement("button");
    taskCompleted.setAttribute("class", "task-completed");
    taskCompleted.setAttribute("id", "task-completed");
    if (task.getTaskCompleted() === true) {
        taskCompleted.setAttribute("class", "completed-task");
        taskCompleted.textContent = "Completed";
    }
    else {
        taskCompleted.textContent = "Mark as Completed";
    }
    taskPopupContent.appendChild(taskCompleted);

    const taskDelete = document.createElement("button");
    taskDelete.setAttribute("class", "task-delete");
    taskDelete.setAttribute("id", "task-delete");
    taskDelete.textContent = "Delete";
    taskPopupContent.appendChild(taskDelete);

    const editTaskButton = document.createElement("button");
    editTaskButton.setAttribute("class", "edit-task-button");
    editTaskButton.setAttribute("id", "edit-task-button");
    editTaskButton.textContent = "Edit";
    taskPopupContent.appendChild(editTaskButton);


    container.appendChild(taskPopup);
    
    taskCompleted.addEventListener("click", (e) => {
        task.setTaskCompleted(!task.getTaskCompleted());
        renderTaskPopup(task);
    });

    taskDelete.addEventListener("click", (e) => {
        storage.deleteTask(task.getTaskId());
        renderTasks(tasksByProject(currProjectId, storage));
        taskPopup.remove();
    });

    editTaskButton.addEventListener("click", (e) => {
        renderEditTaskPopup(task);
    });
}

// Render the edit task popup for editing a task
const renderEditTaskPopup = (task) => {
    const editTaskPopup = document.createElement("div");
    editTaskPopup.setAttribute("class", "popup");
    editTaskPopup.setAttribute("id", "edit-task-popup");

    const editTaskPopupContent = document.createElement("div");
    editTaskPopupContent.setAttribute("class", "popup-content");
    editTaskPopupContent.setAttribute("id", "edit-task-popup-content");
    editTaskPopup.appendChild(editTaskPopupContent);

    const editTaskPopupHeader = document.createElement("h2");
    editTaskPopupHeader.setAttribute("class", "popup-header");
    editTaskPopupHeader.textContent = "Edit Task";
    editTaskPopupContent.appendChild(editTaskPopupHeader);

    const editTaskPopupForm = document.createElement("form");
    editTaskPopupForm.setAttribute("class", "popup-form");
    editTaskPopupForm.setAttribute("id", "edit-task-popup-form");
    editTaskPopupContent.appendChild(editTaskPopupForm);

    const editTaskPopupFormLabel = document.createElement("label");
    editTaskPopupFormLabel.setAttribute("class", "popup-form-label");
    editTaskPopupFormLabel.setAttribute("for", "edit-task-popup-form-input");
    editTaskPopupFormLabel.textContent = "Task Name";
    editTaskPopupForm.appendChild(editTaskPopupFormLabel);

    const editTaskPopupFormInput = document.createElement("input");
    editTaskPopupFormInput.setAttribute("class", "popup-form-input");
    editTaskPopupFormInput.setAttribute("id", "edit-task-popup-form-input");
    editTaskPopupFormInput.setAttribute("type", "text");
    editTaskPopupFormInput.setAttribute("placeholder", "Task Title");
    editTaskPopupFormInput.setAttribute("value", task.getTaskTitle());
    editTaskPopupForm.appendChild(editTaskPopupFormInput);

    const editTaskPopupFormDesc = document.createElement("input");
    editTaskPopupFormDesc.setAttribute("class", "popup-form-input");
    editTaskPopupFormDesc.setAttribute("id", "edit-task-popup-form-desc");    
    editTaskPopupFormDesc.setAttribute("type", "text");
    editTaskPopupFormDesc.setAttribute("placeholder", "Task Description");
    editTaskPopupFormDesc.setAttribute("value", task.getTaskDescription());
    editTaskPopupForm.appendChild(editTaskPopupFormDesc);

    const editTaskPopupFormDueDate = document.createElement("input");
    editTaskPopupFormDueDate.setAttribute("class", "popup-form-input");
    editTaskPopupFormDueDate.setAttribute("id", "edit-task-popup-form-due-date");
    editTaskPopupFormDueDate.setAttribute("type", "date");
    editTaskPopupFormDueDate.setAttribute("placeholder", "xx/xx/xxxx");
    editTaskPopupFormDueDate.setAttribute("value", task.getTaskDueDate());
    editTaskPopupForm.appendChild(editTaskPopupFormDueDate);

    const editTaskPopupFormPriority = document.createElement("select");
    editTaskPopupFormPriority.setAttribute("class", "popup-form-input");
    editTaskPopupFormPriority.setAttribute("id", "edit-task-popup-form-priority");
    editTaskPopupForm.appendChild(editTaskPopupFormPriority);

    const editTaskPopupFormPriorityOptionHigh = document.createElement("option");
    editTaskPopupFormPriorityOptionHigh.setAttribute("value", "High");
    editTaskPopupFormPriorityOptionHigh.textContent = "High";
    editTaskPopupFormPriority.appendChild(editTaskPopupFormPriorityOptionHigh);
    
    const editTaskPopupFormPriorityOptionMedium = document.createElement("option");
    editTaskPopupFormPriorityOptionMedium.setAttribute("value", "Medium");
    editTaskPopupFormPriorityOptionMedium.textContent = "Medium";
    editTaskPopupFormPriority.appendChild(editTaskPopupFormPriorityOptionMedium);

    const editTaskPopupFormPriorityOptionLow = document.createElement("option");
    editTaskPopupFormPriorityOptionLow.setAttribute("value", "Low");
    editTaskPopupFormPriorityOptionLow.textContent = "Low";
    editTaskPopupFormPriority.appendChild(editTaskPopupFormPriorityOptionLow);

    const editTaskPopupFormSubmit = document.createElement("input");
    editTaskPopupFormSubmit.setAttribute("class", "popup-form-submit");
    editTaskPopupFormSubmit.setAttribute("id", "edit-task-popup-form-submit");
    editTaskPopupFormSubmit.setAttribute("type", "submit");

    editTaskPopupFormSubmit.setAttribute("value", "Edit Task");
    editTaskPopupForm.appendChild(editTaskPopupFormSubmit);

    container.appendChild(editTaskPopup);

    editTaskPopupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const editTaskTitle = document.getElementById("edit-task-popup-form-input").value;
        const editTaskDesc = document.getElementById("edit-task-popup-form-desc").value;
        const editTaskDueDate = document.getElementById("edit-task-popup-form-due-date").value;
        const editTaskPriority = document.getElementById("edit-task-popup-form-priority").value;
        task.setTaskTitle(editTaskTitle);
        task.setTaskDescription(editTaskDesc);
        task.setTaskDueDate(editTaskDueDate);
        task.setTaskPriority(editTaskPriority);
        renderTaskPopup(task);
        editTaskPopup.remove();
    });
};

// Render the today and upcoming week buttons on the side bar
const renderTodayAndUpcomingWeekButtons = (projectsContainer) => {
    const todayButton = document.createElement("button");
    todayButton.setAttribute("class", "sproject-button");
    todayButton.setAttribute("id", "today-button");
    todayButton.textContent = "Today";
    projectsContainer.appendChild(todayButton);

    const upcomingWeekButton = document.createElement("button");
    upcomingWeekButton.setAttribute("class", "sproject-button");
    upcomingWeekButton.setAttribute("id", "upcoming-week-button");
    upcomingWeekButton.textContent = "Upcoming Week";
    projectsContainer.appendChild(upcomingWeekButton);

    todayButton.addEventListener("click", (e) => {
        const tasks = today(storage);
        renderTasks(tasks);
    });

    upcomingWeekButton.addEventListener("click", (e) => {
        const tasks = upcomingWeek(storage);
        renderTasks(tasks);
    });
}


export { renderProjects, renderTasks};
