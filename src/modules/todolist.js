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

    newProject(projectName) {
        const project = new Project();
        project.setProjectName(projectName);
        project.setProjectId(this.projects.length);
        this.addProject(project);
    }

    newTask(projectId, taskTitle, taskDescription, taskDueDate, taskPriority) {
        const task = new Task();
        task.setTaskId(this.getProjectTasks(projectId).length);
        task.setTaskTitle(taskTitle);
        task.setTaskDescription(taskDescription);
        task.setTaskDueDate(taskDueDate);
        task.setTaskPriority(taskPriority);
        this.addTaskToProject(projectId, task);
    }
}

export default TodoList;
