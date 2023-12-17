class Project {
    constructor() {
        this.name = 'Project';
        this.id = 0;
        this.tasks = {};
        this.taskCount = 0;
    }

    setProjectName(name) {
        this.name = name;
    }

    setProjectId(id) {
        this.id = id;
    }

    appendTask(task) {
        this.tasks[task.id] = task;
    }

    getProjectName() {
        return this.name;
    }

    getProjectId() {
        return this.id;
    }

    getTasks() {
        return this.tasks;
    }

    removeTask(taskId) {
        delete this.tasks[taskId];
    }
}

export default Project;