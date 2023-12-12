import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";


class Storage {
    constructor() {
        this.storage = {};
    }

    getStorage() {
        return this.storage;
    }

    setStorage(storage) {
        this.storage = storage;
    }

    saveStorage() {
        localStorage.setItem('todostorage', JSON.stringify(this.storage));
    }

    loadStorage() {
        this.storage = JSON.parse(localStorage.getItem('todostorage'));
    }

    newProject(projectName) {
        const project = new Project();
        project.setProjectName(projectName);
        project.setProjectId(this.storage.projects.length);
        this.storage.projects.push(project);
    }

    newTask(projectId, taskTitle, taskDescription, taskDueDate, taskPriority) {
        const task = new Task();
        task.setTaskId(this.storage.projects[projectId].tasks.length);
        task.setTaskTitle(taskTitle);
        task.setTaskDescription(taskDescription);
        task.setTaskDueDate(taskDueDate);
        task.setTaskPriority(taskPriority);
        this.storage.projects[projectId].tasks.push(task);
    }

    deleteProject(projectId) {
        this.storage.projects.splice(projectId, 1);
    }

    deleteTask(projectId, taskId) {
        this.storage.projects[projectId].tasks.splice(taskId, 1);
    }

    editProject(projectId, projectName) {
        this.storage.projects[projectId].setProjectName(projectName);
    }

    editTask(projectId, taskId, taskTitle, taskDescription, taskDueDate, taskPriority) {
        this.storage.projects[projectId].tasks[taskId].setTaskTitle(taskTitle);
        this.storage.projects[projectId].tasks[taskId].setTaskDescription(taskDescription);
        this.storage.projects[projectId].tasks[taskId].setTaskDueDate(taskDueDate);
        this.storage.projects[projectId].tasks[taskId].setTaskPriority(taskPriority);
    }

    getProject(projectId) {
        return this.storage.projects.find(project => project.getProjectId() === projectId);
    }

    getProjectTasks(projectId) {
        return this.getProject(projectId).getTasks();
    }

    getProjects() {
        return this.storage.projects;
    }

    getStorage() {
        return this.storage;
    }

    setStorage(storage) {
        this.storage = storage;
    }
}
