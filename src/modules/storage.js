import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";


class Storage {
    constructor() {
        this.storage = {projects: []};
    }

    deleteStorage() {
        localStorage.removeItem('todostorage');
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
        if (localStorage.getItem('todostorage') === null) {
            this.saveStorage();
        }
        this.storage = JSON.parse(localStorage.getItem('todostorage'));
        for (let i = 0; i < this.storage.projects.length; i++) {
            this.storage.projects[i] = Object.assign(new Project(), this.storage.projects[i]);
            for (let j = 0; j < this.storage.projects[i].tasks.length; j++) {
                this.storage.projects[i].tasks[j] = Object.assign(new Task(), this.storage.projects[i].tasks[j]);
            }
        }
    }

    newProject(projectName, projectId) {
        const project = new Project();
        project.setProjectName(projectName);
        project.setProjectId(this.storage.projects.length);
        this.storage.projects.push(project);
        this.saveStorage();
    }

    newTask(projectId, taskTitle, taskDescription, taskDueDate, taskPriority) {
        const task = new Task();
        task.setTaskId(this.storage.projects[projectId].tasks.length);
        task.setTaskTitle(taskTitle);
        task.setTaskDescription(taskDescription);
        task.setTaskDueDate(taskDueDate);
        task.setTaskPriority(taskPriority);
        this.storage.projects[projectId].appendTask(task);
        this.saveStorage();
    }

    deleteProject(projectId) {
        this.storage.projects.splice(projectId, 1);
        this.saveStorage();
    }

    deleteTask(projectId, taskId) {
        this.storage.projects[projectId].tasks.splice(taskId, 1);
        this.saveStorage();
    }

    editProject(projectId, projectName) {
        this.storage.projects[projectId].setProjectName(projectName);
        this.saveStorage();
    }

    editTask(projectId, taskId, taskTitle, taskDescription, taskDueDate, taskPriority) {
        this.storage.projects[projectId].tasks[taskId].setTaskTitle(taskTitle);
        this.storage.projects[projectId].tasks[taskId].setTaskDescription(taskDescription);
        this.storage.projects[projectId].tasks[taskId].setTaskDueDate(taskDueDate);
        this.storage.projects[projectId].tasks[taskId].setTaskPriority(taskPriority);
        this.saveStorage();
    }

    getProject(projectId) {
        return this.storage.projects.find(project => project.getProjectId() === projectId);
    }

    getProjectTasks(projectId) {
        return this.getProject(projectId).getTasks();
    }

    getProjects() {
        if (this.storage.projects === undefined) {
            this.storage.projects = [];
        }
        return this.storage.projects;
    }

    getStorage() {
        return this.storage;
    }

    setStorage(storage) {
        this.storage = storage;
    }

    getTasks() {
        const tasks = [];
        this.storage.projects.forEach(project => {
            project.getTasks().forEach(task => {
                tasks.push(task);
            });
        });
        return tasks;
    }

    getProjectTasks(projectId) {
        return this.storage.projects[projectId].getTasks();
    }

    addTaskToProject(projectId, task) {
        this.storage.projects[projectId].appendTask(task);
    }
}

export default Storage;