import Task from "./task";
import Project from "./project";
import TodoList from "./todolist";


class Storage {
    constructor() {
        this.storage = {projects: {}};
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
        for (let projectId in this.storage.projects) {
            this.storage.projects[projectId] = Object.assign(new Project(), this.storage.projects[projectId]);
            for (let taskId in this.storage.projects[projectId].tasks) {
                this.storage.projects[projectId].tasks[taskId] = Object.assign(new Task(), this.storage.projects[projectId].tasks[taskId]);
            }
        }
    }
    
    newProject(projectName, projectId) {
        const project = new Project();
        project.setProjectName(projectName);
        projectId = this.generateUniqueId();
        project.setProjectId(projectId);
        this.storage.projects[projectId] = project;
        this.saveStorage();
    }

    newTask(projectId, taskTitle, taskDescription, taskDueDate, taskPriority) {
        const task = new Task();
        const taskId = this.generateUniqueId();
        task.setTaskId(taskId);
        task.setTaskTitle(taskTitle);
        task.setTaskDescription(taskDescription);
        task.setTaskDueDate(taskDueDate);
        task.setTaskPriority(taskPriority);
        this.storage.projects[projectId].tasks[taskId] = task;
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
        return this.storage.projects[projectId];
    }

    getProjectTasks(projectId) {
        return this.storage.projects[projectId].getTasks();
    }

    getProjects() {
        if (this.storage.projects === undefined) {
            this.storage.projects = {};
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
        const tasks = {};
        for (let projectId in this.storage.projects) {
            for (let taskId in this.storage.projects[projectId].tasks) {
                tasks[taskId] = this.storage.projects[projectId].tasks[taskId];
            }
        }
        return tasks;
    }

    addTaskToProject(projectId, task) {
        this.storage.projects[projectId].appendTask(task);
    }

    setTaskCompleted(projectId, taskId, completed) {
        this.storage.projects[projectId].tasks[taskId].setTaskCompleted(completed);
        this.saveStorage();
    }

    getTaskCompleted(projectId, taskId) {
        return this.storage.projects[projectId].tasks[taskId].getTaskCompleted();
    }

    generateUniqueId() {
        return Date.now().toString() + Math.random().toString(36)
    }
}



export default Storage;