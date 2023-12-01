import Task from "./task";
import Project from "./project";

class TodoList {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectId) {
        return this.projects.find(project => project.getProjectId() === projectId);
    }

    getProjectTasks(projectId) {
        return this.getProject(projectId).getTasks();
    }

    addTaskToProject(projectId, task) {
        this.getProject(projectId).appendTask(task);
    }



}

export default TodoList;
